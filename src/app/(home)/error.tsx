"use client";

import ErrorState from "@/components/SheareUI/ErrorState";

/**
 * (home) group error boundary. Navbar + Footer intact thake, shudhu page
 * content er jaygay ei screen ta render hoy.
 */
export default function HomeError({
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
      variant="public"
      title="This page could not load"
      description="Something broke while loading this page. Your data is safe — retry, or continue browsing from the homepage."
      homeHref="/"
      homeLabel="Go to homepage"
    />
  );
}
