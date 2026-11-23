"use client";

import React, { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { showToast } from "@/lib/utils/toast";
import SavedTuitionsFilterBar from "./SavedTuitionsFilterBar";
import SavedTuitionCard from "./SavedTuitionCard";
import TuitionApplyModal from "../../SheareTeacher/TuitionApplyModal";

export interface SavedTuitionItem {
  id: string;
  /** MongoDB _id of the saved document (used for delete). */
  savedId?: string;
  tuitionId: string;
  title: string;
  subject: string;
  classLevel: string;
  deliveryMode: string;
  location: string;
  weeklyClasses: string;
  monthlyFee: number | string;
  currency?: string;
  bannerImage?: string;
  mentor?: {
    name?: string;
    email?: string;
  };
  savedAt?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SavedTuitionsList({
  initialItems,
  studentEmail = "",
}: {
  initialItems: SavedTuitionItem[];
  studentEmail?: string;
}) {
  const [items, setItems] = useState<SavedTuitionItem[]>(initialItems);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedTuition, setSelectedTuition] =
    useState<SavedTuitionItem | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);

  const subjects = useMemo(() => {
    const list = Array.from(
      new Set(items.map((i) => String(i.subject || "").trim()).filter(Boolean))
    );
    return ["All", ...list];
  }, [items]);

  const filteredItems = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return items.filter((item) => {
      const matchSubject =
        selectedSubject === "All" ||
        String(item.subject || "").toLowerCase() ===
          selectedSubject.toLowerCase();
      if (!matchSubject) return false;
      if (!q) return true;
      return (
        String(item.title || "").toLowerCase().includes(q) ||
        String(item.subject || "").toLowerCase().includes(q) ||
        String(item.location || "").toLowerCase().includes(q)
      );
    });
  }, [items, selectedSubject, searchText]);

  const handleDelete = async (target: SavedTuitionItem) => {
    const deleteKey = encodeURIComponent(
      target.savedId || target.tuitionId || target.id
    );
    const emailQuery = studentEmail
      ? `?email=${encodeURIComponent(studentEmail)}`
      : "";

    const removeLocally = () =>
      setItems((prev) => prev.filter((item) => item.id !== target.id));

    try {
      setDeletingId(target.id);
      const res = await fetch(
        `${API_BASE}/SavedTuitionsDelete/${deleteKey}${emailQuery}`,
        { method: "DELETE" }
      );

      // 404 = already removed from the DB, so just drop it from the UI.
      if (res.status === 404) {
        removeLocally();
        showToast.success("Removed from saved tuitions");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Delete failed");
      }

      removeLocally();
      showToast.success("Removed from saved tuitions");
    } catch (error) {
      showToast.error(
        error instanceof Error
          ? error.message
          : "Could not delete saved tuition"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-amber-400/45 bg-white/80 p-8 text-center backdrop-blur-xl dark:border-amber-300/25 dark:bg-slate-900/70 sm:p-12">
        <Sparkles className="mx-auto mb-2 h-6 w-6 text-amber-600 dark:text-amber-300" />
        <p className="text-base font-extrabold text-slate-900 dark:text-white">
          No saved tuitions yet
        </p>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          Bookmark tuitions from the browse page to view and apply here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <SavedTuitionsFilterBar
        subjects={subjects}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
        searchText={searchText}
        onSearchChange={setSearchText}
        onReset={() => {
          setSelectedSubject("All");
          setSearchText("");
        }}
      />

      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-amber-400/45 bg-white/80 p-8 text-center backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">
            No matching saved tuitions found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {filteredItems.map((item) => (
            <SavedTuitionCard
              key={item.id}
              item={item}
              deletingId={deletingId}
              onDelete={handleDelete}
              onApply={(tuition) => {
                setSelectedTuition(tuition);
                setApplyOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {selectedTuition && (
        <TuitionApplyModal
          open={applyOpen}
          onOpenChange={setApplyOpen}
          tuition={{ ...selectedTuition, _id: selectedTuition.tuitionId }}
        />
      )}
    </div>
  );
}