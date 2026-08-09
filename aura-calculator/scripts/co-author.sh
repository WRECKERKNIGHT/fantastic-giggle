#!/usr/bin/env bash
# co-author.sh — append Co-authored-by trailers to commits or PR descriptions.
#
# Co-authors come from, in priority order:
#   1. --author "Name <email>" flags (repeatable)
#   2. a `.coauthors` file in the repo root (one "Name <email>" per line)
#   3. the COAUTHOR_* environment variables (COAUTHOR_1, COAUTHOR_2, ...)
#
# Usage:
#   scripts/co-author.sh print [--author "Name <email>"]...
#       Print the Co-authored-by trailer block (paste into PR descriptions).
#   scripts/co-author.sh amend [--author "Name <email>"]...
#       Append the trailer block to the last commit (amend, no-op if already present).
#   scripts/co-author.sh install
#       Install a prepare-commit-msg hook that adds trailers to every new commit.
#   scripts/co-author.sh list
#       Show the currently configured co-authors.
#
# Examples:
#   scripts/co-author.sh print --author "opencoe <opencode@anomaly.co>"
#   scripts/co-author.sh amend --author "Jane Doe <jane@example.com>"
#   scripts/co-author.sh install

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo "$SCRIPT_DIR")"
CONFIG_FILE="$REPO_ROOT/.coauthors"

usage() {
  sed -n '2,20p' "${BASH_SOURCE[0]}" | sed 's/^# //' | sed 's/^#$//'
  exit "${1:-0}"
}

# Collect co-authors from flags, config file, then env vars.
collect_authors() {
  local authors=()

  # --author flags first
  local arg
  for arg in "$@"; do
    if [[ "$arg" == "--author" ]]; then
      continue
    fi
    authors+=("$arg")
  done

  # Config file
  if [[ -f "$CONFIG_FILE" ]]; then
    while IFS= read -r line || [[ -n "$line" ]]; do
      line="${line%%#*}"
      line="$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
      if [[ -n "$line" ]]; then
        authors+=("$line")
      fi
    done < "$CONFIG_FILE"
  fi

  # Env vars
  local i=1
  local varname
  while true; do
    varname="COAUTHOR_$i"
    [[ -n "${!varname:-}" ]] || break
    authors+=("${!varname}")
    i=$((i + 1))
  done

  # Dedupe, preserving order
  local seen="" out=()
  local a
  for a in "${authors[@]}"; do
    if [[ "$seen" != *"[$a]"* ]]; then
      seen="$seen[$a]"
      out+=("$a")
    fi
  done
  printf '%s\n' "${out[@]}"
}

# Validate and render trailer lines for the given author strings.
render_trailers() {
  local re='^.+[[:space:]]+<[^>]+>$'
  local a
  while IFS= read -r a || [[ -n "$a" ]]; do
    if [[ ! "$a" =~ $re ]]; then
      echo "warning: skipping invalid co-author (expected 'Name <email>'): $a" >&2
      continue
    fi
    echo "Co-authored-by: $a"
  done
}

cmd_print() {
  local trailers
  trailers="$(collect_authors "$@" | render_trailers)"
  if [[ -z "$trailers" ]]; then
    echo "No co-authors configured. Add --author \"Name <email>\" or create $CONFIG_FILE." >&2
    return 1
  fi
  echo "$trailers"
}

cmd_amend() {
  local trailers msg
  trailers="$(cmd_print "$@")"
  msg="$(git log -1 --pretty=%B)"
  local added=false
  while IFS= read -r line || [[ -n "$line" ]]; do
    if ! printf '%s\n' "$msg" | grep -Fqx "$line"; then
      msg+="
$line"
      added=true
    fi
  done <<< "$trailers"
  if [[ "$added" == false ]]; then
    echo "Last commit already has all co-authors."
    return 0
  fi
  printf '%s\n' "$msg" | git commit --amend -F -
  echo "Amended last commit with co-authors."
}

cmd_install() {
  local hooks
  hooks="$(git rev-parse --git-path hooks)"
  mkdir -p "$hooks"
  local hook="$hooks/prepare-commit-msg"
  if [[ -f "$hook" ]] && ! grep -q "co-author.sh" "$hook"; then
    echo "error: $hook already exists and isn't ours. Merge manually." >&2
    return 1
  fi
  cat > "$hook" <<'EOF'
#!/usr/bin/env bash
# Auto-added by scripts/co-author.sh install
REPO_ROOT="$(git rev-parse --show-toplevel)"
"$REPO_ROOT/scripts/co-author.sh" amend 2>/dev/null || true
EOF
  chmod +x "$hook"
  echo "Installed prepare-commit-msg hook at $hook"
}

cmd_list() {
  local authors
  authors="$(collect_authors "$@")"
  if [[ -z "$authors" ]]; then
    echo "No co-authors configured."
    return 1
  fi
  echo "Configured co-authors:"
  echo "$authors"
}

main() {
  local cmd="${1:-}"
  shift || true

  case "$cmd" in
    print)   cmd_print "$@" ;;
    amend)   cmd_amend "$@" ;;
    install) cmd_install ;;
    list)    cmd_list "$@" ;;
    -h|--help|help) usage 0 ;;
    "") usage 1 ;;
    *) echo "unknown command: $cmd" >&2; usage 1 ;;
  esac
}

main "$@"
