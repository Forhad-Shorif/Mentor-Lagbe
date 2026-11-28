import React from "react";
import { ShieldAlert } from "lucide-react";
import BackButton from "@/components/SheareUI/BackButton";

interface UnauthorizedPageProps {
  backHref?: string;
}

// হিন্ট: Server Component হিসেবে Unauthorized পেজ রেন্ডার করা হচ্ছে।
// হিন্ট: ক্লায়েন্ট স্টেট/ইভেন্ট ছাড়াই দ্রুত সার্ভার থেকে পরিষ্কার বার্তা ও ফেরার বাটন দেখাতে।
// হিন্ট: "use client" বাদ দিয়ে Next.js <Link> ব্যবহার করা হয়েছে।
export default function UnauthorizedPage({
  backHref = "/",
}: UnauthorizedPageProps) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-8 text-center shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-[0_20px_60px_rgba(2,6,23,0.65)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <ShieldAlert className="h-7 w-7" />
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
          403 • Unauthorized
        </p>

        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Access Denied
        </h1>

        <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          You do not have permission to view this page. Click below to go back.
        </p>

        <Link
          href={backHref}
          className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 text-sm font-bold text-white shadow-md shadow-cyan-500/20 transition hover:brightness-105 active:scale-[0.99] dark:from-cyan-400 dark:to-blue-500 dark:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Link>
      </div>
    </main>
  );
}