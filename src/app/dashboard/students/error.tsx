"use client";

import ErrorState from "@/components/SheareUI/ErrorState";

export default function StudentDashboardError({
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
      title="Student dashboard hit a problem"
      description="We could not load this student section. Retry, or return to your overview to keep browsing tuitions."
      homeHref="/dashboard/students"
      homeLabel="Student overview"
    />
  );
}
