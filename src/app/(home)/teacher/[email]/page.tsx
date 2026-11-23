import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  GraduationCap,
  Mail,
  MapPin,
  Monitor,
  UserRound,
} from "lucide-react";
import TeacherProfileCard from "@/components/SheareForm/ProfileForm/TeacherProfile";
import UserProfileCard from "@/components/SheareForm/ProfileForm/UserProfile";
import {
  getTeacherProfile,
  getUserProfile,
} from "@/components/SheareForm/ProfileForm/ActionProfile";

interface PageProps {
  params: Promise<{ email: string }>;
}

interface TeacherTuitionSummary {
  name?: string;
}

const prettifyEmail = (email: string) => {
  const local = email.split("@")[0] || "";
  return (
    local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "Teacher"
  );
};

// `/teacher/<email>` — tuition details page er "View Teacher" button ekhane ashe
export default async function TeacherPublicProfilePage({ params }: PageProps) {
  const { email: rawEmail } = await params;

  let email = rawEmail;
  try {
    email = decodeURIComponent(rawEmail);
  } catch {
    email = rawEmail;
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [teacherProfile, userProfile, tuitions] = await Promise.all([
    getTeacherProfile(email),
    getUserProfile(email),
    fetch(`${backendUrl}/TeacherTeutionsGet/${encodeURIComponent(email)}`, {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => (Array.isArray(data) ? data : []))
      .catch(() => [] as TeacherTuitionSummary[]),
  ]);

  // Name er source: user profile → tuition er mentor name → email theke toiri naam
  const displayName =
    userProfile?.name ||
    (tuitions as TeacherTuitionSummary[]).find((item) => item?.name)?.name ||
    prettifyEmail(email);

  const initial = displayName.charAt(0).toUpperCase();
  const hasAnyProfile = Boolean(teacherProfile || userProfile);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link
          href="/browsetuitions"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Tuitions</span>
        </Link>

        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-teal-600/20 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-transparent p-5 dark:border-cyan-400/25 dark:from-cyan-500/15 dark:via-teal-500/10 dark:to-slate-900 sm:p-7">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-teal-400 text-2xl font-black text-white shadow-lg shadow-cyan-500/25 dark:text-slate-950 sm:h-20 sm:w-20 sm:text-3xl">
              {initial}
            </div>

            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-600/25 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-cyan-400/30 dark:bg-slate-950/70 dark:text-cyan-300">
                <Award className="h-3.5 w-3.5" />
                <span>Tuition Mentor</span>
              </span>

              <h1 className="mt-2 truncate text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                {displayName}
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                {teacherProfile?.headline || "Teacher at MentorLagbe"}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
                {teacherProfile?.teachingMode && (
                  <span className="inline-flex items-center gap-1.5">
                    <Monitor className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>{teacherProfile.teachingMode}</span>
                  </span>
                )}

                {teacherProfile?.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>{teacherProfile.location}</span>
                  </span>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-1.5 transition hover:text-teal-700 dark:hover:text-cyan-300"
                  >
                    <Mail className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span className="truncate">{email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile cards */}
        {hasAnyProfile ? (
          <div className="grid grid-cols-1 items-start sm:gap-2 md:gap-4">
            {teacherProfile ? (
              <TeacherProfileCard profile={teacherProfile} />
            ) : (
              <section className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-8 text-center dark:border-slate-800 dark:bg-slate-900/60">
                <BookOpen className="mx-auto h-8 w-8 text-teal-700 dark:text-cyan-400" />
                <h2 className="mt-3 text-sm font-bold">
                  No teacher overview yet
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  This mentor has not added a teaching overview, experience, or
                  subject list.
                </p>
              </section>
            )}

            {userProfile ? (
              <UserProfileCard profile={userProfile} fallbackName={displayName} />
            ) : (
              <section className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-8 text-center dark:border-slate-800 dark:bg-slate-900/60">
                <UserRound className="mx-auto h-8 w-8 text-teal-700 dark:text-cyan-400" />
                <h2 className="mt-3 text-sm font-bold">
                  No personal profile yet
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  This mentor has not added personal details like education or
                  location.
                </p>
              </section>
            )}
          </div>
        ) : (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center dark:border-slate-800 dark:bg-slate-900/60">
            <GraduationCap className="mx-auto h-9 w-9 text-teal-700 dark:text-cyan-400" />
            <h2 className="mt-3 text-base font-bold">
              Profile not available yet
            </h2>
            <p className="mx-auto mt-1 max-w-md text-xs text-slate-500 dark:text-slate-400">
              This mentor has not completed their profile. You can still contact
              them at{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {email || "their email"}
              </span>
              .
            </p>
            <Link
              href="/browsetuitions"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Browse active tuitions</span>
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
