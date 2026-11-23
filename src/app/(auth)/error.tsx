"use client";

import ErrorState from "@/components/SheareUI/ErrorState";

/**
 * (auth) group error boundary — sign-in/sign-up fail korleo app crash korbe na.
 */
export default function AuthError({
  error,
  retry,
  reset,
}: {
  error: Error & { digest?: string };
  retry?: () => void;
  reset?: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#07090e]">
      <ErrorState
        error={error}
        retry={retry}
        reset={reset}
        variant="public"
        title="We could not open the sign-in screen"
        description="The authentication page hit an error. Please retry — if it keeps happening, reload the page and try again."
        homeHref="/"
        homeLabel="Back to homepage"
      />
    </div>
  );
}
