"use client";

import React, { useMemo, useState } from "react";
import {
  Activity,
  BookMarked,
  CheckCircle2,
  GraduationCap,
  MapPin,
  RotateCcw,
  Trash2,
  User,
} from "lucide-react";
import { showToast } from "@/lib/utils/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteTuitionConfirmButton from "./DeleteTuitionConfirmButton";

export interface AdminTuitionItem {
  _id: string;
  title?: string;
  subject?: string;
  classLevel?: string;
  deliveryMode?: string;
  location?: string;
  monthlyFee?: number | string;
  name?: string;
  email?: string;
  mentorEmail?: string;
  status?: "active" | "closed" | string;
  verificationStatus?:
  | "pending"
  | "approved"
  | "verified"
  | "revoked"
  | "rejected"
  | string;
}

interface AdminTuitionsListProps {
  initialTuitions: AdminTuitionItem[];
}

type FilterTab = "all" | "approved" | "revoked";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function isApprovedState(v?: string) {
  return v === "approved" || v === "verified";
}

function isRevokedState(v?: string) {
  return v === "revoked" || v === "rejected";
}

function notifyOnce(type: "success" | "error", id: string, message: string) {
  showToast[type](message, { id });
}

export default function AdminTuitionsList({
  initialTuitions,
}: AdminTuitionsListProps) {
  const [tuitions, setTuitions] = useState<AdminTuitionItem[]>(initialTuitions);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const counts = useMemo(() => {
    let approved = 0;
    let revoked = 0;

    for (const item of tuitions) {
      if (isApprovedState(item.verificationStatus)) approved += 1;
      if (isRevokedState(item.verificationStatus)) revoked += 1;
    }

    return {
      all: tuitions.length,
      approved,
      revoked,
    };
  }, [tuitions]);

  const filteredTuitions = useMemo(() => {
    if (activeTab === "approved") {
      return tuitions.filter((item) => isApprovedState(item.verificationStatus));
    }
    if (activeTab === "revoked") {
      return tuitions.filter((item) => isRevokedState(item.verificationStatus));
    }
    return tuitions;
  }, [tuitions, activeTab]);

  const handleModeration = async (
    tuition: AdminTuitionItem,
    nextStatus: "approved" | "revoked"
  ) => {
    const prevList = tuitions;
    setBusyId(tuition._id);

    setTuitions((current) =>
      current.map((item) =>
        item._id === tuition._id
          ? { ...item, verificationStatus: nextStatus }
          : item
      )
    );

    try {
      const res = await fetch(
        `${API_BASE}/TuitionsTest/${encodeURIComponent(tuition._id)}/verify`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verificationStatus: nextStatus }),
        }
      );

      if (!res.ok) throw new Error("Moderation update failed");

      notifyOnce(
        "success",
        "admin-tuition-mod",
        nextStatus === "approved"
          ? `Approved "${tuition.title || "Tuition"}"`
          : `Revoked "${tuition.title || "Tuition"}"`
      );
    } catch {
      setTuitions(prevList);
      notifyOnce(
        "error",
        "admin-tuition-mod",
        "Could not update moderation status"
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (tuition: AdminTuitionItem) => {
    const prevList = tuitions;
    const label = tuition.title || "this tuition";

    setBusyId(tuition._id);
    setTuitions((current) => current.filter((item) => item._id !== tuition._id));

    try {
      const res = await fetch(
        `${API_BASE}/TuitionsDelete/${encodeURIComponent(tuition._id)}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete tuition");

      notifyOnce("success", "admin-tuition-delete", `Deleted "${label}"`);
    } catch {
      setTuitions(prevList);
      notifyOnce(
        "error",
        "admin-tuition-delete",
        `Could not delete "${label}"`
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-amber-400/25 bg-white/75 p-2.5 shadow-2xs backdrop-blur-md dark:border-amber-400/20 dark:bg-slate-900/65">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`inline-flex h-8 items-center gap-2 rounded-xl px-3.5 text-xs font-extrabold transition ${activeTab === "all"
              ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-xs"
              : "bg-transparent text-slate-700 hover:bg-amber-400/15 dark:text-slate-300 dark:hover:bg-amber-400/10"
            }`}
        >
          <span>All</span>
          <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-black dark:bg-white/15">
            {counts.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("approved")}
          className={`inline-flex h-8 items-center gap-2 rounded-xl px-3.5 text-xs font-extrabold transition ${activeTab === "approved"
              ? "bg-emerald-600 text-white shadow-xs dark:bg-emerald-500 dark:text-slate-950"
              : "bg-transparent text-slate-700 hover:bg-emerald-500/10 dark:text-slate-300"
            }`}
        >
          <span>Approved</span>
          <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-black dark:bg-white/15">
            {counts.approved}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("revoked")}
          className={`inline-flex h-8 items-center gap-2 rounded-xl px-3.5 text-xs font-extrabold transition ${activeTab === "revoked"
              ? "bg-amber-600 text-white shadow-xs dark:bg-amber-400 dark:text-slate-950"
              : "bg-transparent text-slate-700 hover:bg-amber-500/10 dark:text-slate-300"
            }`}
        >
          <span>Revoked</span>
          <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-black dark:bg-white/15">
            {counts.revoked}
          </span>
        </button>
      </div>

      {filteredTuitions.length === 0 ? (
        <Card className="rounded-2xl border border-amber-400/30 bg-white/80 shadow-2xs backdrop-blur-md dark:border-amber-400/20 dark:bg-slate-900/70">
          <CardContent className="py-8 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
            No tuitions found in this filter.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {filteredTuitions.map((tuition) => {
            const title = tuition.title || "Untitled Tuition";
            const subject = tuition.subject || "General";
            const classLevel = tuition.classLevel || "All Classes";
            const location = tuition.location || "Online";
            const fee = tuition.monthlyFee ?? 0;
            const mentorName =
              tuition.name || tuition.mentorEmail || tuition.email || "Mentor";

            const userStatus =
              String(tuition.status || "active").toLowerCase() === "closed"
                ? "closed"
                : "active";

            const approved = isApprovedState(tuition.verificationStatus);
            const revoked = isRevokedState(tuition.verificationStatus);
            const modLabel = approved
              ? "Approved"
              : revoked
                ? "Revoked"
                : "Pending";

            const isBusy = busyId === tuition._id;

            return (
              <Card
                key={tuition._id}
                className="rounded-2xl border border-amber-400/30 bg-white/85 text-slate-900 shadow-2xs backdrop-blur-md transition duration-200 hover:border-amber-500/55 hover:shadow-sm dark:border-amber-400/20 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:border-amber-400/45"
              >
                <CardContent className="flex flex-col justify-between gap-3 px-4 py-2.5 xl:flex-row xl:items-center xl:px-5 xl:py-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-sm font-extrabold text-slate-900 dark:text-white sm:text-[15px]">
                        {title}
                      </h2>

                      <Badge
                        variant="secondary"
                        className="h-5 gap-1 rounded-lg border border-amber-400/35 bg-amber-400/10 px-2 text-[10px] font-bold text-amber-900 dark:text-amber-300"
                      >
                        <BookMarked className="h-2.5 w-2.5" />
                        <span>{subject}</span>
                      </Badge>

                      <span
                        className={`inline-flex h-5 items-center gap-1 rounded-full border px-2 text-[10px] font-extrabold uppercase ${userStatus === "active"
                            ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            : "border-slate-400/35 bg-slate-500/10 text-slate-600 dark:text-slate-400"
                          }`}
                      >
                        <Activity className="h-2.5 w-2.5" />
                        <span>User: {userStatus}</span>
                      </span>

                      <span
                        className={`inline-flex h-5 items-center rounded-full border px-2 text-[10px] font-extrabold uppercase ${approved
                            ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"
                            : revoked
                              ? "border-amber-500/40 bg-amber-500/15 text-amber-900 dark:text-amber-300"
                              : "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                      >
                        {modLabel}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <GraduationCap className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                        <span>{classLevel}</span>
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <User className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                        <span className="truncate">{mentorName}</span>
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                        <span>{location}</span>
                      </span>

                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        $ {fee}/mo
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isBusy || approved}
                      onClick={() => handleModeration(tuition, "approved")}
                      className="h-8 gap-1 rounded-xl border-emerald-500/35 bg-emerald-500/10 px-3 text-xs font-extrabold text-emerald-800 hover:bg-emerald-500/20 disabled:opacity-45 dark:text-emerald-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Approve</span>
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isBusy || revoked}
                      onClick={() => handleModeration(tuition, "revoked")}
                      className="h-8 gap-1 rounded-xl border-amber-500/40 bg-amber-400/15 px-3 text-xs font-extrabold text-amber-950 hover:bg-amber-400/25 disabled:opacity-45 dark:text-amber-200"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Revoke</span>
                    </Button>

                   
                    <DeleteTuitionConfirmButton
                      tuition={tuition}
                      isBusy={isBusy}
                      onConfirmDelete={handleDelete}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}