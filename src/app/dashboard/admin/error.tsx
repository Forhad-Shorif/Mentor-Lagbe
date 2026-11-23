"use client";

import ErrorState from "@/components/SheareUI/ErrorState";

export default function AdminDashboardError({
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
      title="Admin dashboard hit a problem"
      description="We could not load this admin section. Retry, or return to the admin overview to continue."
      homeHref="/dashboard/admin"
      homeLabel="Admin overview"
    />
  );
}
