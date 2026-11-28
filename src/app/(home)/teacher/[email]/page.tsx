import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  MessageSquarePlus,
  Monitor,
  UserRound,
} from "lucide-react";
import TeacherProfileCard from "@/components/SheareForm/ProfileForm/TeacherProfile";
import UserProfileCard from "@/components/SheareForm/ProfileForm/UserProfile";
import {
  getTeacherProfile,
  getUserProfile,
} from "@/components/SheareForm/ProfileForm/ActionProfile";
import TutorReviewDialog from "@/components/SheareDashboard/SheareTeacher/TutorReviewDialog";

interface PageProps {
  params: Promise<{ email: string }>;
}

interface TeacherTuitionSummary {
  _id?: string;
  id?: string | number;
  name?: string;
  title?: string;
  subject?: string;
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

async function fetchTeacherTuitions(
  email: string
): Promise<TeacherTuitionSummary[]> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";
  if (!backendUrl || !email) return [];

  try {
    const res = await fetch(
      `${backendUrl}/TeacherTeutionsGet/${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function TeacherPublicProfilePage({ params }: PageProps) {
  const { email: rawEmail } = await params;
  const email = decodeURIComponent(rawEmail);

  const [teacherProfile, userProfile, tuitionList] = await Promise.all([
    getTeacherProfile(email),
    getUserProfile(email),
    fetchTeacherTuitions(email),
  ]);

  const displayName =
    userProfile?.name ||
    tuitionList.find((item) => item?.name)?.name ||
    prettifyEmail(email);

  const teacherProfileRecord = teacherProfile as
    | { _id?: string; id?: string; email?: string; userId?: string }
    | null;

  const teacherId = String(
    teacherProfileRecord?._id ||
      teacherProfileRecord?.id ||
      teacherProfileRecord?.userId ||
      ""
  );
  const teacherEmail = String(teacherProfileRecord?.email || email);

  const initial = displayName.charAt(0).toUpperCase();
  const hasAnyProfile = Boolean(teacherProfile || userProfile);
  const allTuitionsHref = `/teacherstutions/${encodeURIComponent(teacherEmail)}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/45 via-slate-50 to-cyan-50/35 px-4 py-7 text-slate-900 transition-colors dark:from-[#09121a] dark:via-slate-950 dark:to-[#060e16] dark:text-slate-100 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/browsetuitions"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-amber-400/60 hover:text-amber-800 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-amber-300/40 dark:hover:text-amber-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Tuitions</span>
          </Link>

          <Link
            href={allTuitionsHref}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-300/80 bg-gradient-to-r from-amber-50 via-white to-cyan-50 px-4 py-2 text-xs font-extrabold text-amber-900 shadow-2xs transition hover:-translate-y-0.5 hover:border-amber-400 dark:border-amber-300/25 dark:from-[#18150e] dark:via-slate-900 dark:to-[#081b22] dark:text-amber-200"
          >
            <Layers className="h-4 w-4 text-amber-600 dark:text-amber-300" />
            <span>View All Tuitions ({tuitionList.length})</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-300/80 bg-gradient-to-r from-amber-500/12 via-cyan-500/10 to-slate-50/70 p-5 shadow-sm dark:border-amber-300/25 dark:from-amber-400/10 dark:via-cyan-500/10 dark:to-slate-900 sm:p-7">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-teal-500 to-cyan-500 text-2xl font-black text-white shadow-lg shadow-amber-500/20 dark:text-slate-950 sm:h-20 sm:w-20 sm:text-3xl">
              {initial}
            </div>

            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/45 bg-white/85 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:border-amber-300/30 dark:bg-slate-950/70 dark:text-amber-200">
                <Award className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
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
                    <Monitor className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                    <span>{teacherProfile.teachingMode}</span>
                  </span>
                )}

                {teacherProfile?.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
                    <span>{teacherProfile.location}</span>
                  </span>
                )}

                {teacherEmail && (
                  <a
                    href={`mailto:${teacherEmail}`}
                    className="inline-flex items-center gap-1.5 transition hover:text-amber-700 dark:hover:text-amber-300"
                  >
                    <Mail className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                    <span className="truncate">{teacherEmail}</span>
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
                <BookOpen className="mx-auto h-8 w-8 text-amber-600 dark:text-amber-300" />
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
                <UserRound className="mx-auto h-8 w-8 text-cyan-600 dark:text-cyan-300" />
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
            <GraduationCap className="mx-auto h-9 w-9 text-amber-600 dark:text-amber-300" />
            <h2 className="mt-3 text-base font-bold">
              Profile not available yet
            </h2>
            <p className="mx-auto mt-1 max-w-md text-xs text-slate-500 dark:text-slate-400">
              This mentor has not completed their profile. You can still contact
              them at{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {teacherEmail || "their email"}
              </span>
              .
            </p>
            <Link
              href="/browsetuitions"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Browse active tuitions</span>
            </Link>
          </section>
        )}

        {/* Link to Teacher's All Tuitions */}
        <section className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-amber-300/80 bg-gradient-to-r from-amber-50/85 via-white to-cyan-50/75 p-5 shadow-sm dark:border-amber-300/25 dark:from-[#18150e] dark:via-slate-900 dark:to-[#081b22] sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              All Tuitions by {displayName}
            </p>
            <h2 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
              Explore every tuition posted by this teacher
            </h2>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              Currently {tuitionList.length} tuition post
              {tuitionList.length === 1 ? "" : "s"} found for {teacherEmail}.
            </p>
          </div>

          <Link
            href={allTuitionsHref}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950 sm:text-sm"
          >
            <span>See All Tuitions</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Review Section for This Tutor */}
        <section
          aria-label="Tutor Reviews"
          className="rounded-3xl border border-slate-300/90 bg-gradient-to-br from-slate-100/75 via-white to-amber-50/60 p-5 shadow-sm dark:border-white/15 dark:from-slate-900/90 dark:via-slate-900/75 dark:to-[#17140d] sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-400/25 to-cyan-400/20 text-amber-700 ring-1 ring-amber-400/40 dark:text-amber-300">
                <MessageSquarePlus className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Reviews for {displayName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Leave feedback for this tutor
                </p>
              </div>
            </div>

            <TutorReviewDialog
              teacherId={teacherId}
              teacherEmail={teacherEmail}
            />
          </div>
        </section>
      </div>
    </main>
  );
}