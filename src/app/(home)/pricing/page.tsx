import React from "react";
import {
  CheckCircle2,
  GraduationCap,
  Presentation,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import TeacherPlanSection from "@/components/SheareDashboard/SheareTeacher/TeacherPlanSection";
import StudentPlanSection from "@/components/SheareDashboard/SheareStudents/OverView/StudentPlanSection";
import { ServerUser } from "@/lib/ServerUser";

export default async function PricingPage() {
  const user = await ServerUser();
  const rawRole = String(user?.role || "").toLowerCase();

  const isTeacher = rawRole === "teacher" || rawRole === "teachers";
  const isStudent = rawRole === "user" || rawRole === "student";
  const showBoth = !isTeacher && !isStudent;

  const showStudentPlan = isStudent || showBoth;
  const showTeacherPlan = isTeacher || showBoth;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Styled Pricing Header */}
        <header className="relative overflow-hidden rounded-3xl border border-teal-600/20 bg-gradient-to-br from-teal-500/15 via-cyan-500/10 to-sky-500/10 p-6 shadow-sm dark:border-cyan-400/25 dark:from-cyan-500/20 dark:via-slate-900 dark:to-teal-500/10 dark:shadow-[0_0_40px_rgba(6,182,212,0.12)] sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-600/25 bg-white/85 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 backdrop-blur-xs dark:border-cyan-400/30 dark:bg-slate-950/75 dark:text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
              <span>Plans & Pricing</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              {isStudent && (
                <>
                  Smart Plans for{" "}
                  <span className="bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-teal-300">
                    Students
                  </span>
                </>
              )}
              {isTeacher && (
                <>
                  Growth Plans for{" "}
                  <span className="bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-teal-300">
                    Teachers
                  </span>
                </>
              )}
              {showBoth && (
                <>
                  Built for Both{" "}
                  <span className="bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-teal-300">
                    Students & Teachers
                  </span>
                </>
              )}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Pick the right plan for your learning or teaching goals. Upgrade anytime with secure Stripe checkout.
            </p>

            {/* Quick Anchor Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              {showStudentPlan && (
                <a
                  href="#student-plans"
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal-600/25 bg-white/85 px-4 py-2 text-teal-800 transition hover:border-teal-600 dark:border-cyan-400/30 dark:bg-slate-950/75 dark:text-cyan-300 dark:hover:border-cyan-400"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Student Plans</span>
                </a>
              )}

              {showTeacherPlan && (
                <a
                  href="#teacher-plans"
                  className="inline-flex items-center gap-1.5 rounded-full border border-cyan-600/25 bg-white/85 px-4 py-2 text-cyan-800 transition hover:border-cyan-600 dark:border-cyan-400/30 dark:bg-slate-950/75 dark:text-cyan-300 dark:hover:border-cyan-400"
                >
                  <Presentation className="h-4 w-4" />
                  <span>Teacher Plans</span>
                </a>
              )}

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/75 px-3.5 py-2 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4 text-teal-600 dark:text-cyan-400" />
                <span>Stripe Protected</span>
              </span>
            </div>
          </div>
        </header>

        {/* Student Plan Section */}
        {showStudentPlan && (
          <div id="student-plans" className="scroll-mt-8 space-y-3">
            <div className="flex items-center gap-2 px-1">
              <CheckCircle2 className="h-4 w-4 text-teal-700 dark:text-cyan-400" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                For Students
              </h2>
            </div>
            <StudentPlanSection
              studentEmail={user?.email || ""}
              studentId={user?.id || ""}
              currentPlan="free"
            />
          </div>
        )}

        {/* Teacher Plan Section */}
        {showTeacherPlan && (
          <div id="teacher-plans" className="scroll-mt-8 space-y-3">
            <div className="flex items-center gap-2 px-1">
              <CheckCircle2 className="h-4 w-4 text-cyan-700 dark:text-cyan-400" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                For Teachers
              </h2>
            </div>
            <TeacherPlanSection
              teacherEmail={user?.email || ""}
              teacherId={user?.id || ""}
              currentPlan="starter"
            />
          </div>
        )}
      </div>
    </main>
  );
}