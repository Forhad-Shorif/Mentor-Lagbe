import SignInPage from "@/components/AuthSheare/Sign-In";
import React, { Suspense } from "react";

const SignIn = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
          <span className="size-7 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent dark:border-cyan-400" />
        </div>
      }
    >
      <SignInPage />
    </Suspense>
  );
};

export default SignIn;