"use client";

import ErrorState from "@/components/SheareUI/ErrorState";

export default function TeacherDashboardError({
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
      title="Teacher dashboard hit a problem"
      description="We could not load this teacher section. Retry, or return to your overview to manage tuitions."
      homeHref="/dashboard/teachers"
      homeLabel="Teacher overview"
    />
  );
}
