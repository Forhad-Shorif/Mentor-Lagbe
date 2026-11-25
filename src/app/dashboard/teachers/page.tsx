import React from "react";
import TutorOverviewHero from "@/components/SheareDashboard/SheareTeacher/TeacherOverView/TutorOverviewHero";
import TutorOverviewStats from "@/components/SheareDashboard/SheareTeacher/TeacherOverView/TutorOverviewStats";
import TutorOverviewActivity from "@/components/SheareDashboard/SheareTeacher/TeacherOverView/TutorOverviewActivity";
import { ServerUser } from "@/lib/ServerUser";
import PaymentReceiptCard from "@/components/Payments/PaymentReceiptCard";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function loadArray(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.tuitions)) return data.tuitions;
    if (Array.isArray(data?.applications)) return data.applications;
    if (Array.isArray(data?.items)) return data.items;
    return [];
  } catch {
    return [];
  }
}

export default async function TutorOverviewPage() {
  const user = await ServerUser();
  const email = String(user?.email || "").trim().toLowerCase();

  const [tuitions, applications] = await Promise.all([
    loadArray(`${API_BASE}/TeacherTeutionsGet/${encodeURIComponent(email)}`),
    loadArray(
      `${API_BASE}/TeacherApplicationsGet/${encodeURIComponent(email)}`
    ),
  ]);

  const activeCount = tuitions.filter(
    (t: { status?: string; isActive?: boolean }) =>
      t?.isActive !== false && String(t?.status || "").toLowerCase() !== "closed"
  ).length;

  const pendingCount = applications.filter(
    (a: { status?: string }) =>
      !a?.status || String(a?.status).toLowerCase() === "pending"
  ).length;

  const acceptedCount = applications.filter(
    (a: { status?: string }) =>
      String(a?.status || "").toLowerCase() === "accepted"
  ).length;

  const recentTuitions = tuitions.slice(0, 4).map(
    (
      t: {
        _id?: string;
        title?: string;
        subject?: string;
        monthlyFee?: number | string;
        status?: string;
      },
      index: number
    ) => ({
      id: `t-${String(t?._id || index)}`,
      title: t?.title || "Untitled Tuition",
      meta: `${t?.subject || "General"} • ৳${t?.monthlyFee || 0}/mo`,
      badge: String(t?.status || "Active"),
    })
  );

  const recentApplications = applications.slice(0, 4).map(
    (
      a: {
        _id?: string;
        studentName?: string;
        name?: string;
        tuitionTitle?: string;
        title?: string;
        status?: string;
      },
      index: number
    ) => ({
      id: `a-${String(a?._id || index)}`,
      title: `${a?.studentName || a?.name || "Student"} → ${
        a?.tuitionTitle || a?.title || "Tuition"
      }`,
      meta: "Student Request",
      badge: String(a?.status || "Pending"),
    })
  );

  return (
    <main className="w-full text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-4 sm:space-y-5">
        <TutorOverviewHero
          name={String(user?.name || "Tutor")}
          email={email || "tutor@mentorlagbe.com"}
          image={String((user as { image?: string })?.image || "")}
          role={String(user?.role || "teacher")}
        />

        <TutorOverviewStats
          totalTuitions={tuitions.length}
          activeTuitions={activeCount}
          pendingApplications={pendingCount}
          acceptedStudents={acceptedCount}
        />

        <TutorOverviewActivity
          tuitions={recentTuitions}
          applications={recentApplications}
        />

        <PaymentReceiptCard />
      </div>
    </main>
  );
}