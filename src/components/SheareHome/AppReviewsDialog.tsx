"use client";

import React, { useState } from "react";
import { CheckCircle2, MessageSquarePlus, Star } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type ReviewerRole = "students" | "teachers" | "Guest";

export type AppReviewPayload = {
    name: string;
    role: ReviewerRole;
    mode: "Online" | "Offline";
    rating: number;
    comment: string;
    createdAt: string;
};

export interface AppReviewsDialogProps {
    /** বাটনের লেখা (ডিফল্ট: "Write a Review") */
    triggerLabel?: string;
    /** বাটন ভ্যারিয়েন্ট: যেকোনো পেজ বা ন্যাভবার/ফুটারে মানানসই করার জন্য */
    variant?: "primary" | "outline" | "subtle";
    /** বাটনের অতিরিক্ত ক্লাস */
    triggerClassName?: string;
    /** পরে ব্যাকএন্ডে পাঠাতে চাইলে এই callback ব্যবহার করতে পারবেন */
    onReviewSubmit?: (data: AppReviewPayload) => void | Promise<void>;
}

// হিন্ট: একদম সিম্পল রিভিউ সাবমিশন ডায়ালগ — সাবমিট করলে console.log-এ ডেটা দেখাবে।
export function AppReviewsDialog({
    triggerLabel = "Write a Review",
    variant = "primary",
    triggerClassName,
    onReviewSubmit,
}: AppReviewsDialogProps) {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [role, setRole] = useState<ReviewerRole>("Guest");
    const [mode, setMode] = useState<"Online" | "Offline">("Online");
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cleanName = name.trim();
        const cleanComment = comment.trim();

        if (!cleanName || !cleanComment) {
            setErrorMsg("Please enter your name and review message.");
            return;
        }

        const reviewData: AppReviewPayload = {
            name: cleanName,
            role,
            mode,
            rating,
            comment: cleanComment,
            createdAt: new Date().toISOString(),
        };

        // হিন্ট: আপাতত ডেটা console-এ রাখা হচ্ছে; পরে এখান থেকেই API-তে পাঠাতে পারবেন।
        console.log("Submitted App Review:", reviewData);

        if (onReviewSubmit) {
            await onReviewSubmit(reviewData);
        }

        setErrorMsg("");
        setIsSubmitted(true);
        setName("");
        setComment("");
        setRating(5);

        setTimeout(() => {
            setIsSubmitted(false);
            setOpen(false);
        }, 900);
    };

    const triggerStyles = {
        primary:
            "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm hover:from-teal-500 hover:to-cyan-500 dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950",
        outline:
            "border border-teal-200/90 bg-white/95 text-teal-800 shadow-2xs hover:border-teal-300 hover:bg-teal-50 dark:border-white/15 dark:bg-white/[0.05] dark:text-teal-200 dark:hover:bg-white/10",
        subtle:
            "bg-teal-500/10 text-teal-800 hover:bg-teal-500/20 dark:bg-teal-400/15 dark:text-teal-200 dark:hover:bg-teal-400/25",
    }[variant];

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
                            "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all active:scale-95 sm:text-sm cursor-pointer",
                            triggerStyles,
                            triggerClassName
                        )}
                    />
                }
            >
                <MessageSquarePlus className="size-4" />
                <span>{triggerLabel}</span>
            </DialogTrigger>

            <DialogContent className="w-[calc(100vw-1.5rem)] max-w-md rounded-3xl border border-teal-200/80 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#071117]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-extrabold text-slate-900 sm:text-xl dark:text-white">
                        Share Your Review
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                        Tell us about your learning or teaching experience on MentorLagbe.
                    </DialogDescription>
                </DialogHeader>

                {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <span className="grid size-12 place-items-center rounded-2xl bg-teal-500/15 text-teal-600 dark:bg-teal-400/15 dark:text-teal-300">
                            <CheckCircle2 className="size-6" />
                        </span>
                        <p className="mt-3 text-sm font-extrabold text-slate-900 dark:text-white">
                            Thank you for your feedback!
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Your review has been recorded.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="review-user-name"
                                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                            >
                                Your Name
                            </label>
                            <input
                                id="review-user-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Forhad Shorif"
                                className="mt-1.5 h-10 w-full rounded-xl border border-teal-200/80 bg-teal-50/30 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-teal-400"
                            />
                        </div>

                        {/* Role & Mode */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="review-user-role"
                                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                                >
                                    Role
                                </label>
                                <select
                                    id="review-user-role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as ReviewerRole)}
                                    className="mt-1.5 h-10 w-full rounded-xl border border-teal-200/80 bg-teal-50/30 px-3 text-sm font-medium text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#0b1820] dark:text-white dark:focus:border-teal-400"
                                >
                                    <option value="Guest">Guest</option>
                                    <option value="students">Student</option>
                                    <option value="teachers">Teacher</option>

                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="review-learning-mode"
                                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                                >
                                    Mode
                                </label>
                                <select
                                    id="review-learning-mode"
                                    value={mode}
                                    onChange={(e) =>
                                        setMode(e.target.value as "Online" | "Offline")
                                    }
                                    className="mt-1.5 h-10 w-full rounded-xl border border-teal-200/80 bg-teal-50/30 px-3 text-sm font-medium text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#0b1820] dark:text-white dark:focus:border-teal-400"
                                >
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>
                        </div>

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
                                            className="grid size-9 place-items-center rounded-xl border border-teal-200/70 bg-teal-50/40 transition hover:border-teal-400 dark:border-white/10 dark:bg-white/[0.04] cursor-pointer"
                                        >
                                            <Star
                                                className={`size-4 ${active
                                                        ? "fill-amber-400 text-amber-400"
                                                        : "text-slate-300 dark:text-slate-600"
                                                    }`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label
                                htmlFor="review-message"
                                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                            >
                                Your Review
                            </label>
                            <textarea
                                id="review-message"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a few lines about your experience..."
                                className="mt-1.5 w-full rounded-xl border border-teal-200/80 bg-teal-50/30 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-teal-400"
                            />
                        </div>

                        {errorMsg && (
                            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                                {errorMsg}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:from-teal-500 hover:to-cyan-500 dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950 cursor-pointer"
                        >
                            Submit Review
                        </button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default AppReviewsDialog;