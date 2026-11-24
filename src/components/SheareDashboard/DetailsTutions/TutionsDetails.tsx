
"use client";

import { useEffect, useState } from "react";
import { showToast } from "@/lib/utils/toast";
import ClientUser from "@/lib/ClientUser";
import TuitionApplyModal from "./TuitionApplyModal";
import TuitionDetailsView from "./TuitionDetailsView";

export interface TuitionDetailData {
  _id?: string;
  id?: string;
  title?: string;
  subject?: string;
  classLevel?: string;
  deliveryMode?: string;
  location?: string;
  weeklyClasses?: string;
  classDuration?: string;
  courseDuration?: string;
  applyDeadline?: string;
  availableSeats?: string;
  highlights?: string[];
  status?: string;
  monthlyFee?: number | string;
  currency?: string;
  about?: string;
  bannerImage?: string;
  postedDate?: string;
  mentor?: {
    id?: string;
    name?: string;
    email?: string;
    verified?: boolean;
  };
  rating?: number;
  reviewCount?: number;
}

export interface SavedTuitionPayload {
  tuitionId: string;
  title: string;
  subject: string;
  classLevel: string;
  deliveryMode: string;
  location: string;
  weeklyClasses: string;
  classDuration?: string;
  courseDuration?: string;
  applyDeadline?: string;
  availableSeats?: string;
  monthlyFee: number | string;
  currency: string;
  bannerImage?: string;
  mentor: {
    id?: string;
    name: string;
    email: string;
    verified?: boolean;
  };
  savedAt: string;
}

interface TutionsDetailsProps {
  tuition?: TuitionDetailData | null;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const EMPTY_TUITION: TuitionDetailData = {
  title: "Untitled Tuition",
  subject: "Not specified",
  classLevel: "Not specified",
  deliveryMode: "Not specified",
  location: "Not specified",
  weeklyClasses: "Not specified",
  monthlyFee: "Not specified",
};

export default function TutionsDetails({
  tuition,
}: TutionsDetailsProps) {
  const user = ClientUser();

  const studentEmail = String(user?.email || "")
    .trim()
    .toLowerCase();

  const safeTuition = tuition ?? EMPTY_TUITION;

  const tuitionId = String(safeTuition._id || safeTuition.id || "");

  const mentorName = safeTuition.mentor?.name || "Mentor";
  const mentorEmail = safeTuition.mentor?.email || "";

  const [saved, setSaved] = useState(false);
  const [savedDocId, setSavedDocId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  // Check saved tuition
  useEffect(() => {
    if (!studentEmail || !tuitionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSaved(false);
      setSavedDocId(null);
      return;
    }

    let active = true;

    const checkSaved = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/SavedTuitionsGet/${encodeURIComponent(studentEmail)}`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const data = await res.json();

        if (!Array.isArray(data)) return;

        const match = data.find(
          (item: { _id?: string; tuitionId?: string }) =>
            String(item?.tuitionId || "") === tuitionId
        );

        if (active) {
          setSaved(Boolean(match));
          setSavedDocId(match?._id ? String(match._id) : null);
        }
      } catch {
        // Keep default save state when network is unavailable.
      }
    };

    checkSaved();

    return () => {
      active = false;
    };
  }, [studentEmail, tuitionId]);

  const buildSavedData = (): SavedTuitionPayload => ({
    tuitionId,
    title: safeTuition.title || "Untitled Tuition",
    subject: safeTuition.subject || "Not specified",
    classLevel: safeTuition.classLevel || "Not specified",
    deliveryMode: safeTuition.deliveryMode || "Not specified",
    location: safeTuition.location || "Not specified",
    weeklyClasses: safeTuition.weeklyClasses || "Not specified",
    classDuration: safeTuition.classDuration,
    courseDuration: safeTuition.courseDuration,
    applyDeadline: safeTuition.applyDeadline,
    availableSeats: safeTuition.availableSeats,
    monthlyFee: safeTuition.monthlyFee ?? "Not specified",
    currency: safeTuition.currency || "৳",
    bannerImage: safeTuition.bannerImage,
    mentor: {
      id: safeTuition.mentor?.id,
      name: mentorName,
      email: mentorEmail,
      verified: safeTuition.mentor?.verified,
    },
    savedAt: new Date().toISOString(),
  });

  // Share tuition
  const handleShare = async () => {
    try {
      if (typeof window === "undefined") return;

      const shareUrl = window.location.href;

      if (navigator.share) {
        await navigator.share({
          title: safeTuition.title || "Tuition Details",
          url: shareUrl,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        showToast.success("Link copied successfully!");
        return;
      }

      showToast.error("Sharing is not supported on this device");
    } catch (error) {
      // User canceling the native share dialog isn't an error.
      if (error instanceof Error && error.name === "AbortError") return;

      showToast.error("Unable to share this tuition");
    }
  };

  // Save / Remove tuition
  const handleBookmark = async () => {
    if (saving) return;

    if (!studentEmail) {
      showToast.error("Please sign in to save tuitions");
      return;
    }

    if (!tuitionId) {
      showToast.error("Tuition ID is unavailable");
      return;
    }

    setSaving(true);

    try {
      if (saved) {
        const deleteKey = encodeURIComponent(savedDocId || tuitionId);

        const res = await fetch(
          `${API_BASE}/SavedTuitionsDelete/${deleteKey}?email=${encodeURIComponent(studentEmail)}`,
          { method: "DELETE" }
        );

        if (!res.ok && res.status !== 404) {
          throw new Error("Could not remove saved tuition");
        }

        setSaved(false);
        setSavedDocId(null);
        showToast.success("Tuition removed from saved list");
        return;
      }

      const res = await fetch(`${API_BASE}/SavedTuitions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...buildSavedData(),
          studentEmail,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.status === 409) {
        setSaved(true);
        setSavedDocId(data?.savedId ? String(data.savedId) : null);
        showToast.success("Tuition is already saved");
        return;
      }

      if (!res.ok) {
        throw new Error(data?.message || "Could not save tuition");
      }

      setSaved(true);
      setSavedDocId(data?.insertedId ? String(data.insertedId) : null);

      showToast.success("Tuition saved successfully!");
    } catch (error) {
      showToast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  if (!tuition) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Tuition details are currently unavailable.
        </p>
      </div>
    );
  }

  return (
    <>
      <TuitionDetailsView
        tuition={safeTuition}
        saved={saved}
        saving={saving}
        onShare={handleShare}
        onBookmark={handleBookmark}
        onApply={() => setApplyOpen(true)}
      />

      <TuitionApplyModal
        open={applyOpen}
        onOpenChange={setApplyOpen}
        tuition={safeTuition}
      />

    </>
  );
}
