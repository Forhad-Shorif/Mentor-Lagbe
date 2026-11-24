import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import TutionsDetails, {
  TuitionDetailData,
} from "@/components/SheareDashboard/DetailsTutions/TutionsDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface BackendTuition {
  _id?: string;
  title?: string;
  subject?: string;
  classLevel?: string;
  deliveryMode?: string;
  location?: string;
  weeklyClasses?: string;
  monthlyFee?: number | string;
  classDuration?: string;
  courseDuration?: string;
  applyDeadline?: string;
  availableSeats?: string;
  highlights?: string[];
  about?: string;
  coverImageURL?: string;
  logoImageURL?: string;
  status?: string;
  verificationStatus?: string;
  name?: string;
  email?: string;
  mentorId?: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
}

const backendUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Backend theke asha tuition document ke details page er shape e nei
function toDetailData(
  id: string,
  tuition: BackendTuition
): TuitionDetailData {
  const fee = Number(tuition.monthlyFee || 0);
  const createdAt = tuition.createdAt ? new Date(tuition.createdAt) : null;

  return {
    id: tuition._id || id,
    title: tuition.title || "Untitled Tuition",
    subject: tuition.subject || "General",
    classLevel: tuition.classLevel || "All Levels",
    deliveryMode: tuition.deliveryMode || "Online",
    location: tuition.location || "Online",
    weeklyClasses: tuition.weeklyClasses || "Flexible",
    classDuration: tuition.classDuration || "",
    courseDuration: tuition.courseDuration || "",
    applyDeadline: tuition.applyDeadline || "",
    availableSeats:
      tuition.availableSeats !== undefined && tuition.availableSeats !== null
        ? String(tuition.availableSeats)
        : "",
    highlights: Array.isArray(tuition.highlights)
      ? tuition.highlights.filter(Boolean)
      : [],
    status: tuition.status === "closed" ? "Closed" : "Active",
    monthlyFee: fee.toLocaleString("en-US"),
    currency: "৳",
    about: tuition.about || "",
    bannerImage: tuition.coverImageURL || tuition.logoImageURL || undefined,
    postedDate:
      createdAt && !Number.isNaN(createdAt.getTime())
        ? createdAt.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : undefined,
    mentor: {
      id: tuition.mentorId || "",
      name: tuition.name || "Verified Mentor",
      email: tuition.email || "",
      verified: tuition.verificationStatus === "verified",
    },
    rating: Number(tuition.rating || 0),
    reviewCount: Number(tuition.reviewCount || 0),
  };
}

export default async function ViewDetiailsPage({ params }: PageProps) {
  const { id } = await params;

  let res: Response;

  try {
    res = await fetch(
      `${backendUrl()}/TuitionsDetails/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );
  } catch (error) {
    // Backend bondho thakle page crash na kore friendly message dekhai
    console.error("Failed to fetch tuition details:", error);

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:px-8">
        <div className="mx-auto max-w-lg rounded-3xl border border-slate-200/90 bg-white/95 p-8 text-center shadow-sm dark:border-slate-800/90 dark:bg-slate-900/75">
          <BookOpen className="mx-auto h-9 w-9 text-teal-700 dark:text-cyan-400" />
          <h1 className="mt-3 text-lg font-extrabold">Could not load tuition</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            The tuition server is not reachable right now. Please try again in a
            moment.
          </p>
          <Link
            href="/browsetuitions"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Tuitions</span>
          </Link>
        </div>
      </main>
    );
  }

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to load tuition (status ${res.status})`);
  }

  const tuition = (await res.json()) as BackendTuition;

  // Closed / inactive tuition er details public e dekhai na
  if (tuition.status !== "active") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:px-8">
        <div className="mx-auto max-w-lg rounded-3xl border border-slate-200/90 bg-white/95 p-8 text-center shadow-sm dark:border-slate-800/90 dark:bg-slate-900/75">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
            Tuition closed
          </span>
          <h1 className="mt-3 text-lg font-extrabold">
            {tuition.title || "This tuition is no longer available"}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            The tutor has closed this tuition, so the details and application
            form are no longer available. Browse other active tuitions instead.
          </p>
          <Link
            href="/browsetuitions"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Browse active tuitions</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:px-8">
      <TutionsDetails tuition={toDetailData(id, tuition)} />
    </main>
  );
}
