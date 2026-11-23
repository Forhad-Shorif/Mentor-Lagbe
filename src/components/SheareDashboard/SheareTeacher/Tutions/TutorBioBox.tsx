"use client";

import React, { useState } from "react";
import { Edit3, Save, Sparkles, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

interface TutorBioBoxProps {
  userId?: string;
  email: string;
  initialBio?: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function showBioToast(type: "success" | "error", message: string) {
  toast.dismiss("tutor-profile-bio");
  toast[type](message, { toastId: "tutor-profile-bio" });
}

export default function TutorBioBox({
  userId,
  email,
  initialBio = "",
}: TutorBioBoxProps) {
  const [bio, setBio] = useState(initialBio);
  const [draftBio, setDraftBio] = useState(initialBio);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  const target = encodeURIComponent(userId || email);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftBio.trim();

    try {
      setBusy(true);
      const res = await fetch(`${API_BASE}/SaveBio/${target}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          bio: cleaned,
          role: "teacher",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to save bio");
      }

      const saved = String(data?.bio ?? cleaned);
      setBio(saved);
      setDraftBio(saved);
      setEditing(false);
      showBioToast("success", "Bio saved");
    } catch (err) {
      showBioToast(
        "error",
        err instanceof Error ? err.message : "Could not save bio"
      );
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    try {
      setBusy(true);
      const query = email ? `?email=${encodeURIComponent(email)}` : "";

      const res = await fetch(`${API_BASE}/DeleteBio/${target}${query}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete bio");
      }

      setBio("");
      setDraftBio("");
      setEditing(false);
      showBioToast("success", "Bio deleted");
    } catch (err) {
      showBioToast(
        "error",
        err instanceof Error ? err.message : "Could not delete bio"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-amber-400/35 bg-white/90 p-4 shadow-sm backdrop-blur-md dark:border-amber-300/20 dark:bg-slate-900/75 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-700 dark:text-amber-300">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
              Tutor Bio
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Short introduction shown on your mentor profile
            </p>
          </div>
        </div>

        {!editing && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setDraftBio(bio);
                setEditing(true);
              }}
              className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-50/80 px-3 text-xs font-bold text-slate-800 transition hover:bg-amber-400/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-amber-200"
            >
              <Edit3 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span>{bio ? "Edit Bio" : "Add Bio"}</span>
            </button>

            {bio && (
              <button
                type="button"
                disabled={busy}
                onClick={handleDelete}
                className="inline-flex h-8 items-center gap-1 rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 text-xs font-bold text-rose-700 transition hover:bg-rose-500/20 dark:text-rose-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-3.5">
        {editing ? (
          <form onSubmit={handleSave} className="space-y-2.5">
            <textarea
              rows={3}
              value={draftBio}
              onChange={(e) => setDraftBio(e.target.value)}
              placeholder="Write your short mentor bio..."
              className="w-full rounded-xl border border-amber-400/40 bg-white/95 p-3 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950/85 dark:text-white sm:text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => setEditing(false)}
                className="inline-flex h-8 items-center gap-1 rounded-xl border border-slate-300 bg-white/80 px-3 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={busy}
                className="inline-flex h-8 items-center gap-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 text-xs font-extrabold text-slate-950"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{busy ? "Saving..." : "Save Bio"}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-xl border border-amber-400/20 bg-amber-50/45 px-4 py-3 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 sm:text-sm">
            {bio || "No bio added yet. Click 'Add Bio' to write one."}
          </div>
        )}
      </div>
    </div>
  );
}