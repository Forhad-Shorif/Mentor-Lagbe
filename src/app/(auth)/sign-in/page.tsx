import SignInPage from "@/components/AuthSheare/Sign-In";
import React, { Suspense } from "react";

// হিন্ট (কী): SignInPage-কে Suspense দিয়ে র‍্যাপ করে রেন্ডার করা হচ্ছে।
// হিন্ট (কেন): SignInPage-এর ভেতরে useSearchParams() থাকায় Next.js build ও hydration ঠিক রাখতে Suspense দরকার।
// হিন্ট (কীভাবে): fallback spinner-সহ <SignInPage /> রেন্ডার করা হয়েছে।
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