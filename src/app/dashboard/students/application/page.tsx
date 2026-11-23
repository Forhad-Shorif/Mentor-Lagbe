import React from "react";

import StudentApplicationsClient from "@/components/SheareDashboard/SheareStudents/StudentApplication/StudentApplicationsClient";
import {
  ApplicationStatus,
  StudentApplicationItem,
} from "@/components/SheareDashboard/SheareStudents/StudentApplication/StudentApplicationCard";
import { ServerUser } from "@/lib/ServerUser";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function normalizeStatus(rawStatus?: string): ApplicationStatus {
  const s = String(rawStatus || "pending").toLowerCase();
  if (s === "accepted" || s === "approved") return "Accepted";
  if (s === "rejected" || s === "declined") return "Rejected";
  return "Pending";
}

async function fetchApplications(email: string): Promise<StudentApplicationItem[]> {
  if (!email) return [];

  try {
    const res = await fetch(
      `${API_BASE}/ApplyGet/${encodeURIComponent(email)}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) return [];

    const data = await res.json();
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.applications)
      ? data.applications
      : [];

    return list.map(
      (app: {
        _id?: string;
        id?: string;
        title?: string;
        tuitionTitle?: string;
        subject?: string;
        tutorName?: string;
        teacherName?: string;
        mentorName?: string;
        location?: string;
        schedule?: string;
        sessionTime?: string;
        daysPerWeek?: string;
        budget?: string | number;
        monthlyFee?: string | number;
        salary?: string | number;
        appliedAt?: string;
        createdAt?: string;
        status?: string;
        post?: boolean;
      }) => ({
        id: String(app?._id || app?.id || Math.random()),
        title: app?.title || app?.tuitionTitle || "Untitled Tuition",
        subject: app?.subject || "General",
        tutorName:
          app?.mentorName ||
          app?.tutorName ||
          app?.teacherName ||
          "Assigned Tutor",
        location: app?.location || "Not specified",
        schedule:
          app?.schedule || app?.sessionTime || app?.daysPerWeek || "Flexible",
        budget:
          app?.monthlyFee !== undefined
            ? `৳${app.monthlyFee} / month`
            : app?.budget !== undefined
            ? `৳${app.budget} / month`
            : app?.salary !== undefined
            ? `৳${app.salary} / month`
            : "Negotiable",
        appliedAt: app?.appliedAt
          ? String(app.appliedAt)
          : app?.createdAt
          ? new Date(app.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Recently",
        status: normalizeStatus(app?.status),
        post: app?.post !== false,
      })
    );
  } catch {
    return [];
  }
}

export default async function StudentApplicationsPage() {
  const user = await ServerUser();
  const email = String(user?.email || "").trim().toLowerCase();
  const initialApplications = await fetchApplications(email);

  return (
    <section className="mx-auto w-full max-w-6xl">
      <StudentApplicationsClient
        initialApplications={initialApplications}
        studentEmail={email}
      />
    </section>
  );
}