"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Headphones,
  Mail,
  MessageSquare,
  Phone,
  Search,
} from "lucide-react";

interface FaqItem {
  id: string;
  category: "Students" | "Tutors" | "Modes & Account";
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "f1",
    category: "Students",
    question: "How do I search for a tuition or tutor on MentorLagbe?",
    answer:
      "Go to Browse Tuitions or use the search bar on the home page to filter by subject, class level, or teaching mode (Online, Offline, or Hybrid).",
  },
  {
    id: "f2",
    category: "Tutors",
    question: "How can I join and post tuitions as a tutor?",
    answer:
      "Sign up with your account and choose or update your tutor profile details so students can discover your subjects, schedule, and mode.",
  },
  {
    id: "f3",
    category: "Modes & Account",
    question:
      "What is the difference between Online, Offline, and Hybrid tuitions?",
    answer:
      "Online tuitions happen remotely from home, Offline tuitions take place in person or at a nearby area, and Hybrid tuitions combine both options.",
  },
  {
    id: "f4",
    category: "Modes & Account",
    question: "How can I contact MentorLagbe support directly?",
    answer:
      "You can email hello@mentorlagbe.com or call +880 1234-567890 for help with your account, listings, or general platform questions.",
  },
];

const categories = ["All", "Students", "Tutors", "Modes & Account"] as const;

export default function HelpCenterInteractive() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [openId, setOpenId] = useState<string>("f1");

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="rounded-[26px] border border-amber-300/80 bg-white/95 p-5 shadow-sm dark:border-amber-300/25 dark:bg-white/[0.04] sm:p-6">
        <div className="flex items-center gap-2.5 rounded-2xl border border-amber-300/85 bg-slate-50/80 px-4 py-2.5 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-400/15 dark:border-amber-300/25 dark:bg-slate-950/80">
          <Search className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search help topics (e.g. online, tutor, support)..."
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl border px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? "border-amber-500 bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 text-white shadow-sm dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950"
                  : "border-slate-300/80 bg-white/85 text-slate-700 hover:border-amber-400 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-amber-400/70 bg-white/90 p-8 text-center dark:border-amber-300/25 dark:bg-white/[0.03]">
            <p className="text-base font-extrabold text-slate-900 dark:text-white">
              No matching help articles found
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try another keyword or switch back to All topics.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-[22px] border border-slate-300/85 bg-white/95 shadow-2xs transition hover:border-amber-400 dark:border-white/12 dark:bg-white/[0.04] dark:hover:border-amber-300/35"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer sm:px-6"
                >
                  <div className="min-w-0">
                    <span className="inline-block rounded-md bg-amber-500/12 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-amber-800 uppercase dark:text-amber-300">
                      {faq.category}
                    </span>
                    <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
                      {faq.question}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-amber-600 transition-transform duration-200 dark:text-amber-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200/80 bg-gradient-to-r from-amber-50/40 via-white to-cyan-50/35 px-5 py-4 text-xs leading-relaxed text-slate-700 dark:border-white/10 dark:from-amber-400/[0.04] dark:via-transparent dark:to-cyan-400/[0.04] dark:text-slate-300 sm:px-6 sm:text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 rounded-[26px] border border-amber-300/85 bg-gradient-to-r from-amber-50/90 via-white to-cyan-50/80 p-5 shadow-sm dark:border-amber-300/25 dark:from-[#18150e] dark:via-slate-900 dark:to-[#081a21] sm:grid-cols-3 sm:p-6">
        <a
          href="forhadshorif79@gmail.com"
          className="flex items-center gap-3 rounded-2xl border border-amber-300/70 bg-white/90 p-3.5 text-xs font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-amber-400 dark:border-white/10 dark:bg-slate-950/75 dark:text-amber-200 sm:text-sm"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300">
            <Mail className="h-4 w-4" />
          </span>
          <span className="truncate">forhadshorif79@gmail.com</span>
        </a>

        <a
          href="tel:+8801335292712"
          className="flex items-center gap-3 rounded-2xl border border-slate-300/80 bg-white/90 p-3.5 text-xs font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-400 dark:border-white/10 dark:bg-slate-950/75 dark:text-cyan-200 sm:text-sm"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
            <Phone className="h-4 w-4" />
          </span>
          <span>+880 1335292712</span>
        </a>

        <Link
          href="/browsetuitions"
          className="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 p-3.5 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950 sm:text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Browse Tuitions</span>
          </span>
          <Headphones className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
