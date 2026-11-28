"use client";

import React, { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import ClientUser from "@/lib/ClientUser";

export type TutorReviewPayload = {
  rating: number;
  message: string;
  teacherId: string;
  teacherEmail: string;
  userId: string;
  userEmail: string;
  userName: string;
  createdAt: string;
};

export interface TutorReviewDialogProps {
  /** যে টিচারকে রিভিউ দেওয়া হচ্ছে তার ID */
  teacherId?: string;
  /** যে টিচারকে রিভিউ দেওয়া হচ্ছে তার Email */
  teacherEmail?: string;
  /** বাটনের লেখা (ডিফল্ট: "Tutor Review") */
  triggerLabel?: string;
  /** বাটনের অতিরিক্ত ক্লাস */
  triggerClassName?: string;
  /** পরে ব্যাকএন্ডে পাঠাতে চাইলে এই callback ব্যবহার করতে পারবেন */
  onReviewSubmit?: (data: TutorReviewPayload) => void | Promise<void>;
}

export function TutorReviewDialog({
  teacherId = "",
  teacherEmail = "",
  triggerLabel = "Tutor Review",
  triggerClassName,
  onReviewSubmit,
}: TutorReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rawUser = ClientUser() as
    | { id?: string; _id?: string; email?: string; name?: string }
    | null
    | undefined;

  const userId = String(rawUser?.id || rawUser?._id || "");
  const userEmail = String(rawUser?.email || "");
  const userName = String(rawUser?.name || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanMessage = message.trim();
    if (!cleanMessage) {
      setErrorMsg("Please write your review message.");
      return;
    }

    const reviewData: TutorReviewPayload = {
      rating,
      message: cleanMessage,
      teacherId,
      teacherEmail,
      userId,
      userEmail,
      userName,
      createdAt: new Date().toISOString(),
    };

    // আপাতত ডেটা console-এ রাখা হচ্ছে; পরে এখান থেকেই API-তে পাঠাতে পারবেন
    console.log("Submitted Tutor Review:", reviewData);

    if (onReviewSubmit) {
      await onReviewSubmit(reviewData);
    }

    setErrorMsg("");
    setIsSubmitted(true);
    setMessage("");
    setRating(5);

    setTimeout(() => {
      setIsSubmitted(false);
      setOpen(false);
    }, 900);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setErrorMsg("");
          setIsSubmitted(false);
        }
      }}
    >
      <DialogTrigger
        render={
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition-all hover:brightness-105 active:scale-95 sm:text-sm dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950 cursor-pointer",
              triggerClassName
            )}
          />
        }
      >
        <Star className="size-4 fill-amber-200 text-amber-200 dark:fill-slate-950 dark:text-slate-950" />
        <span>{triggerLabel}</span>
      </DialogTrigger>

      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-md rounded-3xl border border-amber-300/80 bg-white p-6 shadow-2xl dark:border-amber-300/20 dark:bg-[#071117]">
        <DialogHeader>
          <DialogTitle className="text-lg font-extrabold text-slate-900 sm:text-xl dark:text-white">
            Tutor Review
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-600 sm:text-sm dark:text-slate-400">
            Rate this tutor and share your feedback.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-amber-500/15 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300">
              <CheckCircle2 className="size-6" />
            </span>
            <p className="mt-3 text-sm font-extrabold text-slate-900 dark:text-white">
              Review submitted!
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Thank you for rating your tutor.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            {/* Star Rating */}
            <div>
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Rating
              </span>
              <div className="mt-1.5 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const active = starValue <= rating;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      aria-label={`Rate ${starValue} out of 5 stars`}
                      className="grid size-9 place-items-center rounded-xl border border-amber-300/75 bg-amber-50/40 transition hover:border-amber-400 dark:border-white/10 dark:bg-white/[0.04] cursor-pointer"
                    >
                      <Star
                        className={`size-4 ${
                          active
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300 dark:text-slate-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Box */}
            <div>
              <label
                htmlFor="tutor-review-message"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Message
              </label>
              <textarea
                id="tutor-review-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your feedback about this tutor..."
                className="mt-1.5 w-full rounded-xl border border-slate-300/85 bg-slate-50/60 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-amber-300"
              />
            </div>

            {errorMsg && (
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950 cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TutorReviewDialog;