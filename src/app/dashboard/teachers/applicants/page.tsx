import React from "react";

import { AdminState, TutorAppItem, TutorAppStatus } from "@/components/SheareDashboard/SheareTeacher/Applicaitons/TutorApplicationCard";
import TutorApplicationsClient from "@/components/SheareDashboard/SheareTeacher/Applicaitons/TutorApplicationsClient";
import { ServerUser } from "@/lib/ServerUser";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function toStatus(raw?: string): TutorAppStatus {
  const s = String(raw || "pending").toLowerCase();
  if (s === "accepted" || s === "approved") return "Accepted";
  if (s === "rejected" || s === "declined") return "Rejected";
  return "Pending";
}

function toAdminState(raw?: unknown): AdminState {
  if (typeof raw === "boolean") return raw ? "Approved" : "Revoked";
  const s = String(raw || "pending").toLowerCase();
  if (s === "approved" || s === "active") return "Approved";
  if (s === "revoked" || s === "rejected") return "Revoked";
  return "Pending";
}

export default async function TutorApplicationsPage() {
  const user = await ServerUser();
  const email = String(user?.email || "").trim().toLowerCase();

  let list: TutorAppItem[] = [];

  if (email) {
    try {
      const res = await fetch(
        `${API_BASE}/TeacherApplicationsGet/${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        const rawList = Array.isArray(data)
          ? data
          : Array.isArray(data?.applications)
          ? data.applications
          : [];

        list = rawList.map(
          (
            app: {
              _id?: string;
              id?: string;
              tuitionTitle?: string;
              title?: string;
              subject?: string;
              studentName?: string;
              name?: string;
              studentEmail?: string;
              email?: string;
              location?: string;
              budget?: string | number;
              monthlyFee?: string | number;
              status?: string;
              adminStatus?: unknown;
              adminApproved?: unknown;
              appliedAt?: string;
              createdAt?: string;
            },
            index: number
          ) => ({
            id: String(app?._id || app?.id || `app-${index}`),
            tuitionTitle: app?.tuitionTitle || app?.title || "Untitled Tuition",
            subject: app?.subject || "General",
            studentName: app?.studentName || app?.name || "Student",
            studentEmail: app?.studentEmail || app?.email || "",
            location: app?.location || "Online / Dhaka",
            budget:
              app?.budget !== undefined
                ? `৳${app.budget}/mo`
                : app?.monthlyFee !== undefined
                ? `৳${app.monthlyFee}/mo`
                : "Negotiable",
            status: toStatus(app?.status),
            adminStatus: toAdminState(app?.adminStatus ?? app?.adminApproved),
            appliedAt: app?.appliedAt
              ? String(app.appliedAt)
              : app?.createdAt
              ? new Date(app.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "Recently",
          })
        );
      }
    } catch {
      list = [];
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl">
      <TutorApplicationsClient
        initialApplications={list}
        tutorEmail={email}
      />
    </section>
  );
}