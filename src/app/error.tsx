"use client";

import ErrorState from "@/components/SheareUI/ErrorState";

/**
 * Root error boundary — kono page/route error hole ei screen ta dekhai.
 * `retry` (Next 16) safe re-render kore, `reset` purono fallback hisebe rakha.
 */
export default function RootError({
  error,
  retry,
  reset,
}: {
  error: Error & { digest?: string };
  retry?: () => void;
  reset?: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <ErrorState error={error} retry={retry} reset={reset} variant="public" />
    </div>
  );
}
