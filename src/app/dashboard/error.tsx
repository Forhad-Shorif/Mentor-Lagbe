"use client";

import ErrorState from "@/components/SheareUI/ErrorState";

/**
 * Dashboard error boundary — sidebar + topbar thake, shudhu content area
 * error screen dekhai. Tai ek page fail korleo pura dashboard crash kore na.
 */
export default function DashboardError({
  error,
  retry,
  reset,
}: {
  error: Error & { digest?: string };
  retry?: () => void;
  reset?: () => void;
}) {
  return (
    <ErrorState
      error={error}
      retry={retry}
      reset={reset}
      variant="dashboard"
      title="This dashboard section failed to load"
      description="Your account and data are safe. Retry the section, or open your dashboard home to continue working."
      homeHref="/dashboard"
      homeLabel="Dashboard home"
    />
  );
}
