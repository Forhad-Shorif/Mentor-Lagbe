import React from "react";
import Link from "next/link";
import { Bookmark, Compass } from "lucide-react";

import SavedTuitionsList, {
  SavedTuitionItem,
} from "@/components/SheareDashboard/SheareStudents/Saved/SavedTuitionsList";
import { ServerUser } from "@/lib/ServerUser";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface SavedTuitionDoc {
  _id?: string;
  id?: string;
  tuitionId?: string;
  title?: string;
  tuitionTitle?: string;
  subject?: string;
  classLevel?: string;
  deliveryMode?: string;
  location?: string;
  weeklyClasses?: string;
  schedule?: string;
  daysPerWeek?: string;
  monthlyFee?: number | string;
  budget?: number | string;
  currency?: string;
  bannerImage?: string;
  mentor?: { id?: string; name?: string; email?: string };
  savedAt?: string;
  createdAt?: string;
}

function formatSavedAt(doc: SavedTuitionDoc) {
  const raw = doc.savedAt || doc.createdAt;
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return String(raw);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function getSavedTuitions(email: string): Promise<SavedTuitionDoc[]> {
  if (!email) return [];

  try {
    const res = await fetch(
      `${API_BASE}/SavedTuitionsGet/${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function SavedTuitionsPage() {
  const user = await ServerUser();
  const studentEmail = String(user?.email || "").trim().toLowerCase();
  const docs = await getSavedTuitions(studentEmail);

  const items: SavedTuitionItem[] = docs.map((doc, index) => ({
    id: String(doc._id || doc.id || doc.tuitionId || index),
    savedId: doc._id ? String(doc._id) : undefined,
    tuitionId: String(doc.tuitionId || doc.id || doc._id || ""),
    title: doc.title || doc.tuitionTitle || "Untitled Tuition",
    subject: doc.subject || "General",
    classLevel: doc.classLevel || "Not specified",
    deliveryMode: doc.deliveryMode || "Not specified",
    location: doc.location || "Not specified",
    weeklyClasses:
      doc.weeklyClasses || doc.schedule || doc.daysPerWeek || "Not specified",
    monthlyFee: doc.monthlyFee ?? doc.budget ?? "—",
    currency: doc.currency || "৳",
    bannerImage: doc.bannerImage,
    mentor: {
      name: doc.mentor?.name || "",
      email: doc.mentor?.email || "",
    },
    savedAt: formatSavedAt(doc),
  }));

  return (
    <main className="w-full text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Heading & Title */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-cyan-500/20 bg-white/90 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:p-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
              <Bookmark className="h-3.5 w-3.5" />
              <span>Student Bookmarks</span>
            </span>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Saved Tuitions
            </h1>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
              Apply directly from your saved list or remove items anytime.
            </p>
          </div>

          <Link
            href="/dashboard/students"
            className="inline-flex items-center gap-1.5 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800 transition hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 sm:self-auto"
          >
            <Compass className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <span>Back to Overview</span>
          </Link>
        </div>

        <SavedTuitionsList initialItems={items} studentEmail={studentEmail} />
      </div>
    </main>
  );
}
