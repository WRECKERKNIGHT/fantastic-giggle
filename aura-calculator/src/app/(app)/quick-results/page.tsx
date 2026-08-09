"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const CosmicScene = dynamic(
  () => import("@/components3d/CosmicScene").then((mod) => ({ default: mod.CosmicScene })),
  { ssr: false, loading: () => <div className="fixed inset-0 -z-10 bg-[var(--paper)]" /> }
);

const QuickCheckResults = dynamic(
  () => import("@/components/Results/QuickCheckResults").then((mod) => ({ default: mod.QuickCheckResults })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[var(--paper)] paper-grain">
        <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[var(--ink)] border-t-transparent" />
      </div>
    ),
  }
);

export default function QuickResultsRoute() {
  return (
    <>
      <ErrorBoundary>
        <CosmicScene />
      </ErrorBoundary>
      <QuickCheckResults />
    </>
  );
}
