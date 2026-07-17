"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const CosmicScene = dynamic(
  () => import("@/components3d/CosmicScene").then((mod) => ({ default: mod.CosmicScene })),
  { ssr: false, loading: () => <div className="fixed inset-0 -z-10 bg-black" /> }
);

const QuickCheckPage = dynamic(
  () => import("@/components/QuickCheck/QuickCheckPage").then((mod) => ({ default: mod.QuickCheckPage })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function QuickCheckRoute() {
  return (
    <>
      <ErrorBoundary>
        <CosmicScene />
      </ErrorBoundary>
      <QuickCheckPage />
    </>
  );
}
