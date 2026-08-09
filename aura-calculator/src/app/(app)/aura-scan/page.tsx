"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const AuraScanPage = dynamic(
  () => import("@/components/AuraScan/AuraScanPage").then((mod) => ({ default: mod.AuraScanPage })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[var(--paper)] paper-grain">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[var(--ink)] border-t-transparent" />
          <p className="font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">
            LOADING SCANNER...
          </p>
        </div>
      </div>
    ),
  }
);

export default function AuraScanRoute() {
  return (
    <ErrorBoundary>
      <AuraScanPage />
    </ErrorBoundary>
  );
}
