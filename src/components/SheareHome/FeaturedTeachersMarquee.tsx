import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Monitor } from "lucide-react";
import type { FeaturedTeacher } from "@/lib/featuredTeachers";
import showToast from "@/lib/utils/toast";
import { ServerUser } from "@/lib/ServerUser";

interface FeaturedTeachersMarqueeProps {
  teachers: FeaturedTeacher[];
}

// হিন্ট: এক জন টিচারের সাবজেক্ট লিস্ট থেকে কার্ডের সংক্ষিপ্ত লাইন তৈরি করা হচ্ছে।
function getTeacherSubject(teacher: FeaturedTeacher): string {
  if (Array.isArray(teacher.subjects) && teacher.subjects.length > 0) {
    return teacher.subjects.slice(0, 2).join(" · ");
  }
  return teacher.headline || "Mentor at MentorLagbe";
}

// হিন্ট: ট্র্যাক যেন ছোট না হয়ে যায় সেজন্য কমপক্ষে ৮টি কার্ড রাখা হচ্ছে।
function fillItems(teachers: FeaturedTeacher[]): FeaturedTeacher[] {
  if (teachers.length === 0) return [];
  const target = 8;
  const items: FeaturedTeacher[] = [];
  while (items.length < target) {
    items.push(...teachers);
  }
  return items;
}

export default async function FeaturedTeachersMarquee({
  teachers,
}: FeaturedTeachersMarqueeProps) {
  if (!teachers || teachers.length === 0) {
    return null;
  }

  const items = fillItems(teachers);
  const user = await ServerUser();

  return (
    <section className="overflow-hidden bg-gradient-to-b from-white via-teal-50/40 to-white py-12 dark:from-[#050b10] dark:via-[#07161b] dark:to-[#050b10]">
      <div className="mx-auto mb-6 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold tracking-[0.18em] text-teal-700 uppercase dark:text-teal-300">
              Latest Mentors
            </span>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
              Meet Recent Tutors
            </h2>
          </div>

          <Link
            href="/browsetuitions"
            className="inline-flex items-center gap-1.5 rounded-xl border border-teal-600/25 bg-white/80 px-3.5 py-2 text-xs font-bold text-teal-800 shadow-2xs transition hover:border-teal-600/50 hover:bg-teal-50 dark:border-cyan-400/25 dark:bg-slate-950/70 dark:text-cyan-300 dark:hover:bg-slate-900"
          >
            <span>Browse tuitions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="group relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent dark:from-[#050b10] sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent dark:from-[#050b10] sm:w-20" />

        <div className="ml-marquee-track flex w-max">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              aria-hidden={groupIndex === 1}
              className="flex shrink-0 gap-4 pr-4"
            >
              {items.map((teacher, index) => (
                <article
                  key={`${teacher.id}-${groupIndex}-${index}`}
                  className="w-52 shrink-0 overflow-hidden rounded-2xl border border-teal-200/80 bg-white p-2.5 shadow-2xs transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  {/* বর্গাকার (aspect-square) প্রোফাইল ইমেজ ফ্রেম */}
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 via-cyan-50/60 to-white ring-1 ring-teal-200/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:ring-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="pt-3 pb-1 px-1 text-center">
                    <p className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
                      {teacher.name}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {getTeacherSubject(teacher)}
                    </p>

                    <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      {teacher.teachingMode && (
                        <span className="inline-flex min-w-0 items-center gap-1">
                          <Monitor className="h-3 w-3 shrink-0 text-teal-600 dark:text-teal-400" />
                          <span className="truncate">
                            {teacher.teachingMode}
                          </span>
                        </span>
                      )}

                      {teacher.location && (
                        <span className="inline-flex min-w-0 items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0 text-teal-600 dark:text-teal-400" />
                          <span className="truncate">{teacher.location}</span>
                        </span>
                      )}
                    </div>
                    {
                      user ? (
                        <Link
                          href={`/teacher/${encodeURIComponent(teacher.email)}`}
                          className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
                        >
                          <span>View Tutor</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <Link
                          href='/sign-in'
                          className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
                        >
                          <span>View Tutor</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )
                    }

                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}