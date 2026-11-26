import React from "react";
import { Sparkles } from "lucide-react";
import BrowseTuitionsClient, {
  TuitionItem,
} from "@/components/SheareHome/BrowseTutions/BrowseTuitionsClient";

interface BrowseTuitionsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || ""
).replace(/\/+$/, "");

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

// Server theke tuition list ana hoy — browser backend e direct call kore na,
// tai deploy kora server e "Failed to fetch" ar ashe na.
async function loadActiveTuitions(): Promise<{
  tuitions: TuitionItem[];
  error: string | null;
}> {
  try {
    const res = await fetch(
      `${API_BASE}/TuitionsSearch?status=active&limit=200`,
      { cache: "no-store" }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        tuitions: [],
        error:
          (data as { message?: string } | null)?.message ||
          `Server responded with ${res.status}`,
      };
    }

    const list = Array.isArray(data)
      ? data
      : Array.isArray((data as { tuitions?: unknown })?.tuitions)
        ? (data as { tuitions: TuitionItem[] }).tuitions
        : [];

    return { tuitions: list as TuitionItem[], error: null };
  } catch (err) {
    console.error("Tuition fetch error:", err);
    return {
      tuitions: [],
      error: "Could not load tuitions. Please try again later.",
    };
  }
}

export default async function BrowseTuitionsPage({
  searchParams,
}: BrowseTuitionsPageProps) {
  const params = await searchParams;
  const initialSearch =
    firstValue(params.q) || firstValue(params.search) || "";
  const initialMode = firstValue(params.mode) || "";

  const { tuitions, error } = await loadActiveTuitions();

  return (
    <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-teal-600/20 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-emerald-500/10 p-6 text-center dark:border-cyan-400/25 dark:from-cyan-500/15 dark:via-slate-900 dark:to-teal-500/10 sm:p-8">
      {/* Server Side Heading */}
      <div className="relative overflow-hidden rounded-3xl border border-teal-600/20 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-emerald-500/10 p-7 text-center dark:border-cyan-400/25 dark:from-cyan-500/15 dark:via-slate-900 dark:to-teal-500/10 sm:p-10 lg:p-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-600/25 bg-white/85 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 dark:border-cyan-400/30 dark:bg-slate-950/75 dark:text-cyan-300">
          <Sparkles className="h-4 w-4" />
          <span>Tuition Marketplace</span>
        </span>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          Browse All Tuitions
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-7">
          Explore vetted tuition posts and mentorship batches. Search and filter by subject, class level, or mode.
        </p>
      </div>

      {/* Client Side Fetch + Search + Filter */}
      <BrowseTuitionsClient
        initialSearch={initialSearch}
        initialMode={initialMode}
        initialTuitions={tuitions}
        initialError={error}
      />
    </div>
  );
}