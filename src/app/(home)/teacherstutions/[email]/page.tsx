import Link from "next/link";
import {
    ArrowUpRight,
    Award,
    BookOpen,
    Layers,
    Mail,
    MapPin,
    Monitor,
    RefreshCw,
    UserRound,
} from "lucide-react";
import TeacherTuitionsList, {
    TeacherTuitionPost,
} from "@/components/SheareDashboard/SheareTeacher/TeacherTuitionsList";
import BackButton from "@/components/SheareUI/BackButton";
import {
    getTeacherProfile,
    getUserProfile,
} from "@/components/SheareForm/ProfileForm/ActionProfile";

interface PageProps {
    params: Promise<{ email: string }>;
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000")
    .replace(/\/+$/, "");

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

// Teacher-এর সব tuition আনি (active + closed দুটোই, যাতে মালিক/ভিজিটর
// পুরো হিসাব দেখতে পারে)। closed গুলো কার্ডে "Closed" ব্যাজ পায়।
async function loadTeacherTuitions(email: string): Promise<{
    tuitions: TeacherTuitionPost[];
    error: string | null;
}> {
    if (!email) {
        return { tuitions: [], error: "Teacher email is missing." };
    }

    try {
        const res = await fetch(
            `${API_BASE}/TeacherTeutionsGet/${encodeURIComponent(email)}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            return {
                tuitions: [],
                error: `Could not load this teacher's tuitions (status ${res.status}).`,
            };
        }

        const data = await res.json().catch(() => null);

        const list = Array.isArray(data)
            ? data
            : Array.isArray(data?.tuitions)
                ? data.tuitions
                : Array.isArray(data?.data)
                    ? data.data
                    : [];

        return { tuitions: list as TeacherTuitionPost[], error: null };
    } catch (error) {
        console.error("Failed to fetch teacher tuitions:", error);
        return {
            tuitions: [],
            error:
                "The tuition server is not reachable right now. Please try again in a moment.",
        };
    }
}

export default async function TeacherAllTuitionsPage({ params }: PageProps) {
    const { email: rawEmail } = await params;

    let email = rawEmail;
    try {
        email = decodeURIComponent(rawEmail);
    } catch {
        email = rawEmail;
    }

    const [userProfile, teacherProfile, tuitionResult] = await Promise.all([
        getUserProfile(email),
        getTeacherProfile(email),
        loadTeacherTuitions(email),
    ]);

    const { tuitions, error } = tuitionResult;

    const teacherRecord = teacherProfile as
        | {
            image?: string;
            headline?: string;
            teachingMode?: string;
            skillsAndSubjects?: string[];
        }
        | null;

    const displayName =
        userProfile?.name ||
        tuitions.find((item) => item?.name)?.name ||
        prettifyEmail(email);

    const avatar =
        userProfile?.photoURL || teacherRecord?.image || "";
    const headline =
        teacherRecord?.headline || userProfile?.tag || "Teacher at MentorLagbe";
    const location = userProfile?.location || "";

    const activeCount = tuitions.filter(
        (item) => String(item?.status || "active").toLowerCase() !== "closed"
    ).length;
    const closedCount = tuitions.length - activeCount;
    const subjects = Array.isArray(teacherRecord?.skillsAndSubjects)
        ? teacherRecord.skillsAndSubjects.filter(Boolean)
        : [];

    const initial = displayName.charAt(0).toUpperCase();
    const profileHref = `/teacher/${encodeURIComponent(email)}`;

    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50/50 via-slate-50 to-cyan-50/40 px-4 py-8 text-slate-900 transition-colors dark:from-[#09121a] dark:via-slate-950 dark:to-[#060e16] dark:text-slate-100 md:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Top navigation */}
                <div className="flex flex-wrap items-center justify-end gap-3">
                    <Link
                        href="/browsetuitions"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white/85 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan-400 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200"
                    >
                        <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                        <span>Browse All Tuitions</span>
                    </Link>
                </div>

                {/* Teacher header */}
                <header className="rounded-3xl border border-amber-300/80 bg-gradient-to-r from-amber-500/12 via-cyan-500/10 to-slate-50/75 p-6 shadow-sm dark:border-amber-300/25 dark:from-amber-400/10 dark:via-cyan-500/10 dark:to-slate-900 sm:p-8">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <div className="shrink-0">
                            {avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={avatar}
                                    alt={displayName}
                                    className="h-16 w-16 rounded-2xl border border-white/60 object-cover shadow-lg shadow-amber-500/20 ring-4 ring-white/70 sm:h-20 sm:w-20 dark:border-white/10 dark:ring-white/5"
                                />
                             
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-teal-500 to-cyan-500 text-2xl font-black text-white shadow-lg shadow-amber-500/20 sm:h-20 sm:w-20 sm:text-3xl">
                                    {initial}
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/45 bg-white/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:border-amber-300/30 dark:bg-slate-950/75 dark:text-amber-200">
                                <Award className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                                <span>All Posted Tuitions</span>
                            </span>

                            <h1 className="mt-2 truncate text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                                {displayName}
                            </h1>

                            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                                {headline}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                                <span className="inline-flex min-w-0 items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-300" />
                                    <span className="truncate">{email}</span>
                                </span>

                                {location && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
                                        <span>{location}</span>
                                    </span>
                                )}

                                {teacherRecord?.teachingMode && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <Monitor className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
                                        <span>{teacherRecord.teachingMode}</span>
                                    </span>
                                )}
                            </div>
                        </div>

                        <Link
                            href={profileHref}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:brightness-105 sm:w-auto sm:text-sm dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950"
                        >
                            <UserRound className="h-4 w-4" />
                            <span>View Full Profile</span>
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-5 grid grid-cols-3 gap-3 border-t border-amber-500/15 pt-4 dark:border-amber-300/15">
                        <div className="rounded-2xl border border-white/70 bg-white/75 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Total
                            </span>
                            <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                                {tuitions.length}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/70 bg-white/75 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Active
                            </span>
                            <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                                {activeCount}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/70 bg-white/75 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Closed
                            </span>
                            <p className="text-lg font-extrabold text-rose-600 dark:text-rose-400">
                                {closedCount}
                            </p>
                        </div>
                    </div>

                    {subjects.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {subjects.slice(0, 8).map((subject, index) => (
                                <span
                                    key={`${subject}-${index}`}
                                    className="rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300"
                                >
                                    {subject}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* List / error / empty */}
                {error ? (
                    <section className="rounded-3xl border border-rose-300/70 bg-rose-50/80 p-10 text-center dark:border-rose-400/25 dark:bg-rose-500/10">
                        <RefreshCw className="mx-auto h-8 w-8 text-rose-500 dark:text-rose-300" />
                        <h2 className="mt-3 text-base font-extrabold text-slate-900 dark:text-white">
                            Could not load tuitions
                        </h2>
                        <p className="mx-auto mt-1 max-w-md text-xs text-slate-600 dark:text-slate-300">
                            {error}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                            <BackButton fallbackHref={profileHref} label="Back" />
                            <Link
                                href="/browsetuitions"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950"
                            >
                                <Layers className="h-4 w-4" />
                                <span>Browse all tuitions</span>
                            </Link>
                        </div>
                    </section>
                ) : tuitions.length === 0 ? (
                    <section className="rounded-3xl border border-dashed border-amber-400/70 bg-white/90 p-10 text-center dark:border-amber-300/25 dark:bg-white/[0.03]">
                        <BookOpen className="mx-auto h-9 w-9 text-amber-600 dark:text-amber-300" />
                        <h2 className="mt-3 text-base font-extrabold text-slate-900 dark:text-white">
                            No tuitions posted yet
                        </h2>
                        <p className="mx-auto mt-1 max-w-md text-xs text-slate-500 dark:text-slate-400">
                            {displayName} has not published any tuition yet. Check back later
                            or browse other active tuitions.
                        </p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                            <BackButton fallbackHref={profileHref} label="Back" />
                            <Link
                                href="/browsetuitions"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950"
                            >
                                <Layers className="h-4 w-4" />
                                <span>Browse all tuitions</span>
                            </Link>
                        </div>
                    </section>
                ) : (
                    <TeacherTuitionsList
                        tuitions={tuitions}
                        backHref={profileHref}
                        backLabel="Back to Teacher Profile"
                    />
                )}
            </div>
        </main>
    );
}
