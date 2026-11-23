"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Edit3,
  Mail,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

export interface AdminHeroProfile {
  _id?: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  bio?: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function notifyAdminBio(type: "success" | "error", msg: string) {
  toast.dismiss("admin-bio-toast");
  toast[type](msg, { toastId: "admin-bio-toast" });
}

export default function AdminProfileHero({
  profile,
}: {
  profile: AdminHeroProfile;
}) {
  const [bio, setBio] = useState(profile.bio || "");
  const [draftBio, setDraftBio] = useState(profile.bio || "");
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  const target = encodeURIComponent(profile._id || profile.email);
  const initial = (profile.name || profile.email || "A").charAt(0).toUpperCase();

  const handleSaveBio = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftBio.trim();

    try {
      setBusy(true);
      const res = await fetch(`${API_BASE}/SaveBio/${target}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: profile.email,
          bio: cleaned,
          role: profile.role || "admin",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Could not save bio");
      }

      const saved = String(data?.bio ?? cleaned);
      setBio(saved);
      setDraftBio(saved);
      setEditing(false);
      notifyAdminBio("success", "Bio saved");
    } catch (err) {
      notifyAdminBio(
        "error",
        err instanceof Error ? err.message : "Could not save bio"
      );
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteBio = async () => {
    try {
      setBusy(true);
      const query = profile.email
        ? `?email=${encodeURIComponent(profile.email)}`
        : "";

      const res = await fetch(`${API_BASE}/DeleteBio/${target}${query}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Could not delete bio");
      }

      setBio("");
      setDraftBio("");
      setEditing(false);
      notifyAdminBio("success", "Bio deleted");
    } catch (err) {
      notifyAdminBio(
        "error",
        err instanceof Error ? err.message : "Could not delete bio"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-50/95 via-white/85 to-yellow-100/75 p-5 shadow-[0_14px_40px_-14px_rgba(245,158,11,0.28)] backdrop-blur-xl dark:border-amber-300/25 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-yellow-950/30 sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-300/10" />

      <div className="relative flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="flex items-start gap-3.5 sm:gap-4">
          {profile.image ? (
            <img
              src={profile.image}
              alt={profile.name}
              className="h-14 w-14 shrink-0 rounded-2xl border border-amber-400/50 object-cover sm:h-16 sm:w-16"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 text-xl font-black text-slate-950 shadow-xs sm:h-16 sm:w-16">
              {initial}
            </div>
          )}

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/45 bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-950 dark:text-amber-200">
                <ShieldCheck className="h-3 w-3" />
                <span>{profile.role || "admin"}</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-200">
                <Sparkles className="h-3 w-3" />
                <span>Active</span>
              </span>
            </div>

            <h1 className="truncate text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
              {profile.name}
            </h1>

            <p className="flex items-center gap-1.5 truncate text-xs font-medium text-slate-600 dark:text-slate-300">
              <Mail className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-300" />
              <span className="truncate">{profile.email}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/admin/manage-users"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 text-xs font-extrabold text-slate-950 shadow-xs transition hover:brightness-105"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Manage Users</span>
          </Link>

          {!editing && (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setDraftBio(bio);
                  setEditing(true);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-amber-400/45 bg-white/85 px-3 text-xs font-bold text-slate-800 transition hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-950/80 dark:text-amber-200"
              >
                <Edit3 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                <span>{bio ? "Edit Bio" : "Add Bio"}</span>
              </button>

              {bio && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={handleDeleteBio}
                  className="inline-flex h-9 items-center gap-1 rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 text-xs font-bold text-rose-700 transition hover:bg-rose-500/20 dark:text-rose-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="relative mt-4">
        {editing ? (
          <form onSubmit={handleSaveBio} className="space-y-2.5">
            <textarea
              rows={3}
              value={draftBio}
              onChange={(e) => setDraftBio(e.target.value)}
              placeholder="Write admin bio..."
              className="w-full rounded-2xl border border-amber-400/45 bg-white/90 p-3 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950/80 dark:text-white sm:text-sm"
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
          <div className="rounded-2xl border border-amber-400/25 bg-white/75 px-4 py-3 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950/65 dark:text-slate-300 sm:text-sm">
            {bio || "No admin bio added yet."}
          </div>
        )}
      </div>
    </section>
  );
}