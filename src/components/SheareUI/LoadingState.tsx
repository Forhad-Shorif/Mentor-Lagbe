import React from "react";

export type LoadingVariant =
  | "home"
  | "browse"
  | "detail"
  | "profile"
  | "dashboard-profile"
  | "teacher"
  | "pricing"
  | "students"
  | "applications"
  | "saved"
  | "teacher-overview"
  | "tuitions"
  | "applicants"
  | "admin-overview"
  | "admin-users"
  | "admin-tuitions"
  | "admin-payments"
  | "admin-profile"
  | "form"
  | "auth"
  | "cards"
  | "list";

const BASE = "ml-skeleton bg-slate-200/80 dark:bg-slate-800/70";

function Block({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`${BASE} ${className}`} />;
}

// Auth screens always use the dark shell, so they need a dark-only skeleton.
function DarkBlock({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`ml-skeleton bg-slate-800/80 ${className}`}
    />
  );
}

function Lines({
  count = 3,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const widths = ["w-full", "w-11/12", "w-4/5", "w-2/3", "w-1/2"];
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Block
          key={index}
          className={`h-2.5 rounded-full sm:h-3 ${widths[index % widths.length]}`}
        />
      ))}
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-2xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function Stats({
  count = 4,
  className = "grid grid-cols-2 gap-3 lg:grid-cols-4",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/65"
        >
          <div className="flex items-center justify-between gap-2">
            <Block className="h-3 w-20 rounded-full" />
            <Block className="h-8 w-8 rounded-xl" />
          </div>
          <Block className="mt-3 h-7 w-12 rounded-lg" />
          <Block className="mt-2 h-2.5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function FilterBar() {
  const pillWidths = ["w-16", "w-20", "w-24", "w-20"];
  return (
    <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:flex-row sm:items-center">
      <div className="flex flex-wrap gap-1.5">
        {pillWidths.map((width, index) => (
          <Block key={index} className={`h-8 rounded-xl ${width}`} />
        ))}
      </div>
      <Block className="h-9 w-full rounded-xl sm:w-64" />
    </div>
  );
}

function RowCard({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/65 ${
        wide ? "sm:p-5" : ""
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Block className="h-4 w-2/3 max-w-[240px] rounded-full" />
            <Block className="h-5 w-16 rounded-full" />
          </div>
          <Block className="h-3 w-1/3 max-w-[150px] rounded-full" />
          <div className="flex flex-wrap gap-3 pt-1">
            <Block className="h-3 w-24 rounded-full" />
            <Block className="h-3 w-20 rounded-full" />
            <Block className="h-3 w-16 rounded-full" />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Block className="h-9 w-24 rounded-xl" />
          <Block className="h-9 w-9 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function BrowseCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70">
      <Block className="h-40 w-full rounded-none" />
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <Block className="h-5 w-20 rounded-md" />
          <Block className="h-3 w-16 rounded-full" />
        </div>
        <Block className="h-4 w-4/5 rounded-full" />
        <div className="space-y-1.5 pt-1">
          <Block className="h-3 w-2/3 rounded-full" />
          <Block className="h-3 w-1/2 rounded-full" />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200/70 px-4 py-3 dark:border-slate-800">
        <Block className="h-5 w-20 rounded-md" />
        <Block className="h-8 w-28 rounded-xl" />
      </div>
    </div>
  );
}

function SavedCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-900/70">
      <Block className="h-36 w-full rounded-none sm:h-40" />
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Block className="h-5 w-20 rounded-md" />
          <Block className="h-5 w-24 rounded-md" />
        </div>
        <Block className="h-5 w-4/5 rounded-full" />
        <div className="grid grid-cols-2 gap-2">
          <Block className="h-3 w-full rounded-full" />
          <Block className="h-3 w-3/4 rounded-full" />
          <Block className="h-3 w-2/3 rounded-full" />
          <Block className="h-3 w-1/2 rounded-full" />
        </div>
        <div className="flex items-center justify-between border-t border-slate-200/70 pt-3 dark:border-slate-800">
          <Block className="h-6 w-24 rounded-md" />
          <div className="flex gap-2">
            <Block className="h-9 w-24 rounded-xl" />
            <Block className="h-9 w-9 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ avatar = true }: { avatar?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
      {avatar && (
        <div className="mx-auto -mt-2 mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-800">
          <Block className="h-20 w-20 rounded-full" />
        </div>
      )}
      <div className="space-y-2 text-center">
        <div className="flex justify-center">
          <Block className="h-5 w-40 rounded-full" />
        </div>
        <div className="flex justify-center">
          <Block className="h-3 w-28 rounded-full" />
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {[1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="flex items-center justify-between gap-3 border-b border-slate-200/60 pb-2.5 last:border-0 dark:border-slate-800/60"
          >
            <Block className="h-3 w-24 rounded-full" />
            <Block className="h-3 w-32 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherHeaderCard() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 dark:border-slate-800 dark:bg-slate-900/70 sm:p-7">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Block className="h-16 w-16 shrink-0 rounded-2xl sm:h-20 sm:w-20" />
        <div className="w-full min-w-0 space-y-2.5">
          <Block className="h-6 w-28 rounded-full" />
          <Block className="h-7 w-2/3 max-w-xs rounded-lg" />
          <Block className="h-3 w-1/2 max-w-[220px] rounded-full" />
          <div className="flex flex-wrap gap-3 pt-1">
            <Block className="h-3 w-24 rounded-full" />
            <Block className="h-3 w-28 rounded-full" />
            <Block className="h-3 w-36 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardBanner() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="space-y-2">
          <Block className="h-6 w-32 rounded-full" />
          <Block className="h-8 w-64 max-w-full rounded-lg sm:w-80" />
          <Block className="h-3 w-72 max-w-full rounded-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Block className="h-9 w-28 rounded-xl" />
          <Block className="h-9 w-24 rounded-xl" />
          <Block className="h-9 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function AdminShell({
  children,
  maxWidth = "max-w-7xl",
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="w-full text-slate-900 dark:text-slate-100">
      <div className={`mx-auto ${maxWidth} space-y-5`}>{children}</div>
    </div>
  );
}

function AdminHeader() {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/30 bg-white/75 px-5 py-4 shadow-sm backdrop-blur-md dark:border-amber-400/20 dark:bg-slate-900/65 sm:flex-row sm:items-center">
      <div className="space-y-2">
        <Block className="h-5 w-28 rounded-full" />
        <Block className="h-8 w-56 max-w-full rounded-lg" />
        <Block className="h-3 w-72 max-w-full rounded-full" />
      </div>
      <Block className="h-9 w-32 rounded-xl" />
    </div>
  );
}

function TuitionTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70">
      <div className="hidden grid-cols-6 gap-4 border-b border-slate-200/80 bg-slate-50/90 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-950/70 lg:grid">
        {[1, 2, 3, 4, 5, 6].map((column) => (
          <Block key={column} className="h-3 w-20 rounded-full" />
        ))}
      </div>
      <div className="divide-y divide-slate-200/70 dark:divide-slate-800/80">
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:items-center">
              <div className="flex items-center gap-3 lg:col-span-2">
                <Block className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Block className="h-4 w-4/5 rounded-full" />
                  <Block className="h-3 w-2/3 rounded-full" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 lg:col-span-1">
                <Block className="h-5 w-16 rounded-md" />
                <Block className="h-5 w-20 rounded-md" />
              </div>
              <Block className="h-5 w-20 rounded-md" />
              <Block className="h-6 w-20 rounded-full" />
              <div className="flex justify-start gap-2 lg:justify-end">
                <Block className="h-9 w-9 rounded-lg" />
                <Block className="h-9 w-9 rounded-lg" />
                <Block className="h-9 w-9 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LoadingState({
  variant = "cards",
  className = "",
}: {
  variant?: LoadingVariant;
  className?: string;
}) {
  const content = (() => {
    switch (variant) {
      /* ------------------------------------------------------------ HOME */
      case "home":
        return (
          <div className="w-full">
            <section className="relative isolate overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white dark:from-[#061319] dark:via-[#050b10] dark:to-[#050b10]">
              <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 lg:pt-12">
                <div>
                  <Block className="h-7 w-52 rounded-full" />
                  <div className="mt-5 space-y-3">
                    <Block className="h-11 w-full max-w-lg rounded-2xl sm:h-14" />
                    <Block className="h-11 w-3/4 max-w-md rounded-2xl sm:h-14" />
                  </div>
                  <div className="mt-5 space-y-2">
                    <Block className="h-3.5 w-full max-w-lg rounded-full" />
                    <Block className="h-3.5 w-2/3 max-w-sm rounded-full" />
                  </div>
                  <Block className="mt-7 h-[60px] w-full max-w-xl rounded-[26px]" />
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {[1, 2, 3].map((badge) => (
                      <Block key={badge} className="h-8 w-32 rounded-full" />
                    ))}
                  </div>
                  <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
                    {[1, 2, 3].map((stat) => (
                      <div
                        key={stat}
                        className="rounded-2xl border border-slate-200/80 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/60"
                      >
                        <Block className="h-5 w-12 rounded-md" />
                        <Block className="mt-2 h-2.5 w-16 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-md">
                  <Block className="aspect-[4/3] w-full rounded-[2rem]" />
                  <div className="absolute -left-2 top-6 w-32 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:-left-4">
                    <Block className="h-3 w-20 rounded-full" />
                    <Block className="mt-2 h-2.5 w-14 rounded-full" />
                  </div>
                  <div className="absolute -right-2 bottom-6 w-36 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:-right-4">
                    <Block className="h-3 w-24 rounded-full" />
                    <Block className="mt-2 h-2.5 w-16 rounded-full" />
                  </div>
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-6xl bg-gradient-to-b from-white via-teal-50/40 to-white px-4 py-12 sm:px-6 dark:from-[#050b10] dark:via-[#07161b] dark:to-[#050b10]">
              <div className="mx-auto max-w-2xl space-y-3 text-center">
                <div className="flex justify-center">
                  <Block className="h-6 w-36 rounded-full" />
                </div>
                <div className="flex justify-center">
                  <Block className="h-9 w-full max-w-md rounded-xl" />
                </div>
                <div className="flex justify-center">
                  <Block className="h-3 w-2/3 max-w-sm rounded-full" />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                {[1, 2].map((card) => (
                  <div
                    key={card}
                    className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <Block className="h-48 w-full rounded-none" />
                    <div className="space-y-2 p-5">
                      <Block className="h-5 w-2/3 rounded-full" />
                      <Block className="h-3 w-full rounded-full" />
                      <Block className="h-3 w-4/5 rounded-full" />
                      <Block className="mt-3 h-9 w-32 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[1, 2, 3, 4].map((stat) => (
                  <div
                    key={stat}
                    className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <Block className="mx-auto h-7 w-16 rounded-md" />
                    <Block className="mx-auto mt-2 h-2.5 w-20 rounded-full" />
                  </div>
                ))}
              </div>
            </section>

            <section className="mx-auto max-w-6xl bg-gradient-to-b from-white via-teal-50/40 to-white px-4 py-12 sm:px-6 dark:from-[#050b10] dark:via-[#07161b] dark:to-[#050b10]">
              <div className="mx-auto max-w-2xl space-y-3 text-center">
                <div className="flex justify-center">
                  <Block className="h-6 w-32 rounded-full" />
                </div>
                <div className="flex justify-center">
                  <Block className="h-9 w-4/5 max-w-md rounded-xl" />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((card) => (
                  <div
                    key={card}
                    className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <Block className="h-10 w-10 rounded-xl" />
                    <Block className="mt-4 h-5 w-2/3 rounded-full" />
                    <div className="mt-3 space-y-2">
                      <Block className="h-3 w-full rounded-full" />
                      <Block className="h-3 w-5/6 rounded-full" />
                    </div>
                    <Block className="mt-4 h-3 w-24 rounded-full" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      /* --------------------------------------------------------- BROWSE */
      case "browse":
        return (
          <div className="mx-auto max-w-6xl space-y-7 px-4 py-8">
            <div className="rounded-3xl border border-teal-600/15 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-emerald-500/10 p-6 text-center dark:border-cyan-400/20 dark:from-cyan-500/10 dark:via-slate-900 dark:to-teal-500/10 sm:p-8">
              <div className="flex justify-center">
                <Block className="h-7 w-40 rounded-full" />
              </div>
              <div className="mt-4 flex justify-center">
                <Block className="h-9 w-3/4 max-w-md rounded-xl" />
              </div>
              <div className="mt-3 flex justify-center">
                <Block className="h-3 w-2/3 max-w-sm rounded-full" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Block className="h-11 flex-1 rounded-xl" />
                  <Block className="h-11 w-full rounded-xl sm:w-32" />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-200/70 pt-4 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((field) => (
                    <div key={field} className="space-y-2">
                      <Block className="h-2.5 w-20 rounded-full" />
                      <Block className="h-10 w-full rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex min-h-[62vh] flex-col gap-4">
                <Block className="h-3 w-52 rounded-full" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((card) => (
                    <BrowseCard key={card} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      /* --------------------------------------------------------- DETAIL */
      case "detail":
        return (
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Block className="h-9 w-44 rounded-xl" />
              <div className="flex gap-2">
                <Block className="h-9 w-24 rounded-xl" />
                <Block className="h-9 w-24 rounded-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-8">
                <Block className="h-56 w-full rounded-3xl sm:h-72" />

                <Panel className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Block className="h-6 w-20 rounded-lg" />
                    <Block className="h-6 w-24 rounded-lg" />
                  </div>
                  <Block className="h-8 w-4/5 rounded-xl" />
                  <div className="flex flex-wrap gap-4 border-t border-slate-200/70 pt-4 dark:border-slate-800">
                    <Block className="h-3 w-40 rounded-full" />
                    <Block className="h-3 w-36 rounded-full" />
                    <Block className="h-3 w-32 rounded-full" />
                  </div>
                </Panel>

                <Panel className="space-y-3">
                  <Block className="h-6 w-48 rounded-lg" />
                  <Lines count={4} />
                </Panel>

                <Panel className="space-y-3">
                  <Block className="h-6 w-40 rounded-lg" />
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((item) => (
                      <Block key={item} className="h-10 w-full rounded-xl" />
                    ))}
                  </div>
                </Panel>

                <Panel className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-2">
                      <Block className="h-6 w-56 rounded-lg" />
                      <Block className="h-3 w-44 rounded-full" />
                    </div>
                    <Block className="h-12 w-28 rounded-2xl" />
                  </div>
                  <Block className="h-24 w-full rounded-2xl" />
                </Panel>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-6 lg:col-span-4">
                <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 dark:border-slate-800 dark:bg-slate-900/75">
                  <div className="space-y-2 border-b border-slate-200/70 p-5 dark:border-slate-800">
                    <Block className="h-3 w-32 rounded-full" />
                    <Block className="h-8 w-40 rounded-lg" />
                  </div>
                  <div className="divide-y divide-slate-200/70 px-5 dark:divide-slate-800/80">
                    {[1, 2, 3, 4, 5, 6].map((row) => (
                      <div
                        key={row}
                        className="flex items-center justify-between gap-3 py-3"
                      >
                        <Block className="h-3 w-24 rounded-full" />
                        <Block className="h-3 w-20 rounded-full" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 border-t border-slate-200/70 p-5 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <Block className="h-10 w-10 shrink-0 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Block className="h-2.5 w-20 rounded-full" />
                        <Block className="h-4 w-32 rounded-full" />
                        <Block className="h-2.5 w-40 rounded-full" />
                      </div>
                    </div>
                    <Block className="h-10 w-full rounded-xl" />
                    <div className="grid grid-cols-2 gap-2">
                      <Block className="h-11 w-full rounded-xl" />
                      <Block className="h-11 w-full rounded-xl" />
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        );

      /* -------------------------------------------------------- PROFILE */
      case "profile":
        return (
          <main className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-8">
            <div className="mx-auto max-w-5xl space-y-5">
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 dark:border-slate-800/80 dark:bg-slate-900/70 sm:px-5 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <Block className="h-6 w-36 rounded-lg" />
                  <Block className="h-3 w-56 max-w-full rounded-full" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Block className="h-9 w-32 rounded-xl" />
                  <Block className="h-9 w-32 rounded-xl" />
                  <Block className="h-9 w-28 rounded-xl" />
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800/80 dark:bg-slate-900/70">
                <Block className="h-40 w-full rounded-none sm:h-48" />
                <div className="flex flex-wrap items-end gap-4 px-4 pb-5 sm:px-5">
                  <Block className="-mt-12 h-24 w-24 rounded-full border-4 border-white dark:border-slate-900" />
                  <div className="min-w-0 flex-1 space-y-2 pb-2">
                    <Block className="h-5 w-40 rounded-full" />
                    <Block className="h-3 w-56 max-w-full rounded-full" />
                  </div>
                  <Block className="h-9 w-28 rounded-xl" />
                </div>
              </div>

              <div className="space-y-4 md:space-y-5">
                <ProfileCard />
                <ProfileCard avatar={false} />
              </div>
            </div>
          </main>
        );

      /* --------------------------------------------- DASHBOARD PROFILE */
      case "dashboard-profile":
        return (
          <div className="w-full text-slate-900 dark:text-slate-100">
            <div className="mx-auto max-w-5xl space-y-5">
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 dark:border-slate-800/80 dark:bg-slate-900/70 sm:px-5 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <Block className="h-6 w-36 rounded-lg" />
                  <Block className="h-3 w-56 max-w-full rounded-full" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Block className="h-9 w-32 rounded-xl" />
                  <Block className="h-9 w-32 rounded-xl" />
                  <Block className="h-9 w-28 rounded-xl" />
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800/80 dark:bg-slate-900/70">
                <Block className="h-40 w-full rounded-none sm:h-48" />
                <div className="flex flex-wrap items-end gap-4 px-4 pb-5 sm:px-5">
                  <Block className="-mt-12 h-24 w-24 rounded-full border-4 border-white dark:border-slate-900" />
                  <div className="min-w-0 flex-1 space-y-2 pb-2">
                    <Block className="h-5 w-40 rounded-full" />
                    <Block className="h-3 w-56 max-w-full rounded-full" />
                  </div>
                  <Block className="h-9 w-28 rounded-xl" />
                </div>
              </div>

              <div className="space-y-4 md:space-y-5">
                <ProfileCard />
                <ProfileCard avatar={false} />
              </div>
            </div>
          </div>
        );

      /* -------------------------------------------------------- TEACHER */
      case "teacher":
        return (
          <main className="min-h-screen bg-slate-50 px-4 py-7 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
              <Block className="h-9 w-44 rounded-xl" />
              <TeacherHeaderCard />
              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
                <ProfileCard />
                <ProfileCard />
              </div>
            </div>
          </main>
        );

      /* -------------------------------------------------------- PRICING */
      case "pricing":
        return (
          <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:px-8">
            <div className="mx-auto max-w-6xl space-y-10">
              <div className="rounded-3xl border border-teal-600/15 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-sky-500/5 p-6 dark:border-cyan-400/20 dark:from-cyan-500/10 dark:via-slate-900 dark:to-teal-500/10 sm:p-10">
                <div className="mx-auto max-w-3xl space-y-4 text-center">
                  <div className="flex justify-center">
                    <Block className="h-7 w-40 rounded-full" />
                  </div>
                  <div className="flex justify-center">
                    <Block className="h-10 w-4/5 max-w-lg rounded-xl" />
                  </div>
                  <div className="flex justify-center">
                    <Block className="h-3 w-2/3 max-w-md rounded-full" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    {[1, 2, 3].map((pill) => (
                      <Block key={pill} className="h-9 w-32 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>

              {[1, 2].map((section) => (
                <div key={section} className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <Block className="h-4 w-4 rounded-full" />
                    <Block className="h-4 w-32 rounded-full" />
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {[1, 2].map((card) => (
                      <div
                        key={card}
                        className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 dark:border-slate-800 dark:bg-slate-900/70 sm:p-6"
                      >
                        <Block className="h-5 w-28 rounded-full" />
                        <Block className="mt-4 h-10 w-36 rounded-lg" />
                        <Block className="mt-2 h-3 w-48 rounded-full" />
                        <div className="mt-5 space-y-2.5">
                          {[1, 2, 3, 4, 5].map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <Block className="h-4 w-4 shrink-0 rounded-full" />
                              <Block className="h-3 w-3/4 rounded-full" />
                            </div>
                          ))}
                        </div>
                        <Block className="mt-6 h-11 w-full rounded-xl" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        );

      /* ------------------------------------------------------- STUDENTS */
      case "students":
        return (
          <section className="mx-auto w-full max-w-6xl">
            <div className="space-y-6">
              <DashboardBanner />
              <Stats count={4} />
              <FilterBar />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((row) => (
                  <RowCard key={row} />
                ))}
              </div>
            </div>
          </section>
        );

      /* --------------------------------------------------- APPLICATIONS */
      case "applications":
        return (
          <section className="mx-auto w-full max-w-6xl">
            <div className="space-y-6">
              <DashboardBanner />
              <Stats count={4} />
              <FilterBar />
              <div className="space-y-3">
                {[1, 2, 3].map((row) => (
                  <RowCard key={row} wide />
                ))}
              </div>
            </div>
          </section>
        );

      /* ---------------------------------------------------------- SAVED */
      case "saved":
        return (
          <main className="w-full text-slate-900 dark:text-slate-100">
            <div className="mx-auto max-w-5xl space-y-6">
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-cyan-500/15 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:p-6">
                <div className="space-y-2.5">
                  <Block className="h-6 w-36 rounded-full" />
                  <Block className="h-8 w-52 max-w-full rounded-lg" />
                  <Block className="h-3 w-72 max-w-full rounded-full" />
                </div>
                <Block className="h-9 w-40 self-start rounded-xl sm:self-auto" />
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-3.5 dark:border-slate-800 dark:bg-slate-900/70 sm:p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {[1, 2, 3, 4].map((pill) => (
                        <Block key={pill} className="h-8 w-20 rounded-xl" />
                      ))}
                    </div>
                    <Block className="h-9 w-full rounded-xl md:w-72" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
                  {[1, 2, 3, 4].map((card) => (
                    <SavedCard key={card} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        );

      /* ------------------------------------------------ TEACHER OVERVIEW */
      case "teacher-overview":
        return (
          <section className="mx-auto w-full max-w-6xl text-slate-900 dark:text-slate-100">
            <div className="space-y-5">
              <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <Block className="h-14 w-14 shrink-0 rounded-2xl sm:h-16 sm:w-16" />
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        <Block className="h-5 w-20 rounded-full" />
                        <Block className="h-5 w-24 rounded-full" />
                      </div>
                      <Block className="h-6 w-56 max-w-full rounded-lg" />
                      <Block className="h-3 w-44 max-w-full rounded-full" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Block className="h-9 w-28 rounded-xl" />
                    <Block className="h-9 w-28 rounded-xl" />
                    <Block className="h-9 w-24 rounded-xl" />
                  </div>
                </div>
              </div>

              <Stats count={4} />

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {[1, 2].map((panel) => (
                  <Panel key={panel} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Block className="h-4 w-4 rounded-full" />
                      <Block className="h-4 w-36 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((row) => (
                        <div
                          key={row}
                          className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/70 px-3.5 py-2.5 dark:border-slate-800"
                        >
                          <div className="min-w-0 flex-1 space-y-1.5">
                            <Block className="h-3.5 w-2/3 rounded-full" />
                            <Block className="h-2.5 w-1/2 rounded-full" />
                          </div>
                          <Block className="h-5 w-16 shrink-0 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          </section>
        );

      /* ------------------------------------------------------- TUITIONS */
      case "tuitions":
        return (
          <div className="w-full">
            <div className="mx-auto max-w-6xl space-y-6">
              <div className="rounded-2xl border border-teal-600/15 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-transparent p-5 dark:border-cyan-400/20 dark:from-cyan-500/10 dark:via-teal-500/5 dark:to-slate-900">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="space-y-2">
                    <Block className="h-6 w-32 rounded-full" />
                    <Block className="h-8 w-48 rounded-lg" />
                    <Block className="h-3 w-80 max-w-full rounded-full" />
                  </div>
                  <Block className="h-10 w-40 rounded-xl" />
                </div>
                <div className="mt-4 grid max-w-md grid-cols-3 gap-3 border-t border-slate-200/70 pt-3.5 dark:border-slate-800">
                  {[1, 2, 3].map((stat) => (
                    <div
                      key={stat}
                      className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60"
                    >
                      <Block className="h-2.5 w-12 rounded-full" />
                      <Block className="mt-2 h-5 w-10 rounded-md" />
                    </div>
                  ))}
                </div>
              </div>

              <TuitionTableSkeleton />
            </div>
          </div>
        );

      /* ------------------------------------------------------ APPLICANTS */
      case "applicants":
        return (
          <section className="mx-auto w-full max-w-6xl">
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
                <Block className="h-5 w-36 rounded-full" />
                <Block className="mt-2 h-7 w-56 max-w-full rounded-lg" />
                <Block className="mt-2 h-3 w-80 max-w-full rounded-full" />
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/85 p-3 dark:border-slate-800 dark:bg-slate-900/70 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Block className="h-9 w-36 rounded-xl" />
                  {[1, 2, 3, 4].map((pill) => (
                    <Block key={pill} className="h-8 w-16 rounded-xl" />
                  ))}
                </div>
                <Block className="h-9 w-full rounded-xl sm:w-64" />
              </div>
              <div className="space-y-2.5">
                {[1, 2, 3, 4].map((row) => (
                  <RowCard key={row} wide />
                ))}
              </div>
            </div>
          </section>
        );

      /* ------------------------------------------------- ADMIN OVERVIEW */
      case "admin-overview":
        return (
          <AdminShell>
            <AdminHeader />
            <Stats count={4} className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4" />
            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/25 bg-white/85 p-4 dark:border-amber-400/15 dark:bg-slate-900/70"
                >
                  <div className="space-y-2">
                    <Block className="h-9 w-9 rounded-xl" />
                    <Block className="h-5 w-2/3 rounded-full" />
                    <Block className="h-3 w-full rounded-full" />
                    <Block className="h-3 w-4/5 rounded-full" />
                  </div>
                  <Block className="h-3 w-28 rounded-full" />
                </div>
              ))}
            </div>
          </AdminShell>
        );

      /* ---------------------------------------------------- ADMIN USERS */
      case "admin-users":
        return (
          <AdminShell>
            <AdminHeader />
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/25 bg-white/75 p-3 dark:border-amber-400/15 dark:bg-slate-900/65 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((pill) => (
                  <Block key={pill} className="h-8 w-24 rounded-xl" />
                ))}
              </div>
              <Block className="h-9 w-full rounded-xl sm:w-64" />
            </div>
            <div className="space-y-2.5">
              {[1, 2, 3, 4, 5].map((row) => (
                <div
                  key={row}
                  className="rounded-2xl border border-amber-400/25 bg-white/85 p-4 dark:border-amber-400/15 dark:bg-slate-900/70"
                >
                  <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                    <div className="flex min-w-0 items-center gap-3">
                      <Block className="h-10 w-10 shrink-0 rounded-full" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <Block className="h-4 w-40 max-w-full rounded-full" />
                        <Block className="h-3 w-56 max-w-full rounded-full" />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Block className="h-6 w-20 rounded-full" />
                      <Block className="h-6 w-16 rounded-full" />
                      <Block className="h-9 w-9 rounded-lg" />
                      <Block className="h-9 w-9 rounded-lg" />
                      <Block className="h-9 w-9 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminShell>
        );

      /* ------------------------------------------------ ADMIN TUITIONS */
      case "admin-tuitions":
        return (
          <AdminShell>
            <AdminHeader />
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/25 bg-white/75 p-3 dark:border-amber-400/15 dark:bg-slate-900/65 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((pill) => (
                  <Block key={pill} className="h-8 w-24 rounded-xl" />
                ))}
              </div>
              <Block className="h-9 w-full rounded-xl sm:w-56" />
            </div>
            <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">
              {[1, 2, 3, 4].map((card) => (
                <div
                  key={card}
                  className="rounded-2xl border border-amber-400/25 bg-white/85 p-4 dark:border-amber-400/15 dark:bg-slate-900/70"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-2">
                      <Block className="h-5 w-3/4 rounded-full" />
                      <Block className="h-3 w-1/2 rounded-full" />
                    </div>
                    <Block className="h-6 w-20 shrink-0 rounded-full" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Block className="h-5 w-16 rounded-md" />
                    <Block className="h-5 w-20 rounded-md" />
                    <Block className="h-5 w-24 rounded-md" />
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-amber-400/20 pt-3 dark:border-slate-800">
                    <Block className="h-5 w-24 rounded-md" />
                    <div className="flex gap-2">
                      <Block className="h-8 w-24 rounded-lg" />
                      <Block className="h-8 w-9 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminShell>
        );

      /* ------------------------------------------------ ADMIN PAYMENTS */
      case "admin-payments":
        return (
          <AdminShell>
            <AdminHeader />
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/25 bg-white/75 p-3 dark:border-amber-400/15 dark:bg-slate-900/65 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((pill) => (
                  <Block key={pill} className="h-8 w-24 rounded-xl" />
                ))}
              </div>
              <Block className="h-8 w-36 rounded-xl" />
            </div>
            <div className="space-y-2.5">
              {[1, 2, 3, 4, 5].map((row) => (
                <div
                  key={row}
                  className="rounded-2xl border border-amber-400/25 bg-white/85 p-4 dark:border-amber-400/15 dark:bg-slate-900/70"
                >
                  <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Block className="h-4 w-36 rounded-full" />
                        <Block className="h-5 w-16 rounded-full" />
                      </div>
                      <Block className="h-3 w-56 max-w-full rounded-full" />
                    </div>
                    <Block className="h-8 w-24 rounded-xl" />
                    <div className="flex gap-2">
                      <Block className="h-8 w-28 rounded-xl" />
                      <Block className="h-8 w-20 rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminShell>
        );

      /* -------------------------------------------------- ADMIN PROFILE */
      case "admin-profile":
        return (
          <AdminShell>
            <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-50/90 via-white/85 to-yellow-100/70 p-5 dark:border-amber-300/20 dark:from-amber-950/35 dark:via-slate-900/80 dark:to-yellow-950/25 sm:p-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <Block className="h-14 w-14 shrink-0 rounded-2xl sm:h-16 sm:w-16" />
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Block className="h-5 w-20 rounded-full" />
                      <Block className="h-5 w-20 rounded-full" />
                    </div>
                    <Block className="h-7 w-48 max-w-full rounded-lg" />
                    <Block className="h-3 w-56 max-w-full rounded-full" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Block className="h-9 w-32 rounded-xl" />
                  <Block className="h-9 w-28 rounded-xl" />
                  <Block className="h-9 w-24 rounded-xl" />
                </div>
              </div>
              <Block className="mt-4 h-20 w-full rounded-2xl" />
            </div>

            <div className="space-y-4">
              <Stats count={4} className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4" />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {[1, 2].map((panel) => (
                  <Panel key={panel} className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Block className="h-5 w-40 rounded-full" />
                      <Block className="h-5 w-20 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((row) => (
                        <Block key={row} className="h-10 w-full rounded-xl" />
                      ))}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          </AdminShell>
        );

      /* ----------------------------------------------------------- FORM */
      case "form":
        return (
          <div className="mx-auto max-w-5xl space-y-5">
            <div className="space-y-2">
              <Block className="h-8 w-56 rounded-lg" />
              <Block className="h-3 w-80 max-w-full rounded-full" />
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((field) => (
                  <div key={field} className="space-y-2">
                    <Block className="h-2.5 w-24 rounded-full" />
                    <Block className="h-11 w-full rounded-xl" />
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <Block className="h-2.5 w-28 rounded-full" />
                <Block className="h-28 w-full rounded-xl" />
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Block className="h-10 w-full rounded-xl sm:w-28" />
                <Block className="h-10 w-full rounded-xl sm:w-36" />
              </div>
            </div>
          </div>
        );

      /* ----------------------------------------------------------- AUTH */
      case "auth":
        return (
          <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#07090e] px-4 py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-indigo-600/15 blur-[120px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-600/15 blur-[120px]"
            />

            <div className="relative z-10 mb-8 space-y-3 text-center">
              <div className="flex justify-center">
                <DarkBlock className="h-7 w-40 rounded-full" />
              </div>
              <div className="flex justify-center">
                <DarkBlock className="h-9 w-56 rounded-xl" />
              </div>
              <div className="flex justify-center">
                <DarkBlock className="h-3 w-64 max-w-full rounded-full" />
              </div>
            </div>

            <div className="relative z-10 w-full max-w-md space-y-5 rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-8 backdrop-blur-2xl sm:p-10">
              <div className="grid grid-cols-2 gap-3">
                <DarkBlock className="h-11 w-full rounded-xl" />
                <DarkBlock className="h-11 w-full rounded-xl" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-800" />
                <DarkBlock className="h-3 w-32 rounded-full" />
                <div className="h-px flex-1 bg-slate-800" />
              </div>
              <div className="space-y-2">
                <DarkBlock className="h-2.5 w-16 rounded-full" />
                <DarkBlock className="h-12 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <DarkBlock className="h-2.5 w-20 rounded-full" />
                <DarkBlock className="h-12 w-full rounded-xl" />
              </div>
              <DarkBlock className="h-12 w-full rounded-xl bg-indigo-500/30" />
              <div className="flex justify-center">
                <DarkBlock className="h-3 w-48 rounded-full" />
              </div>
            </div>
          </div>
        );

      /* ---------------------------------------------------------- CARDS */
      case "cards":
        return (
          <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
            <div className="space-y-2">
              <Block className="h-8 w-56 rounded-lg" />
              <Block className="h-3 w-80 max-w-full rounded-full" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <BrowseCard key={card} />
              ))}
            </div>
          </div>
        );

      /* ----------------------------------------------------------- LIST */
      case "list":
      default:
        return (
          <div className="mx-auto max-w-6xl space-y-5 px-4 py-8">
            <div className="space-y-2">
              <Block className="h-8 w-56 rounded-lg" />
              <Block className="h-3 w-80 max-w-full rounded-full" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((row) => (
                <RowCard key={row} />
              ))}
            </div>
          </div>
        );
    }
  })();

  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={`w-full ${className}`}
    >
      <span className="sr-only">Loading…</span>
      {content}
    </div>
  );
}
