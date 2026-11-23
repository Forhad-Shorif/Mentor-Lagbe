"use client";

import React from "react";
import { Activity, BookOpen, CreditCard, Lock, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ActivityItem {
  id: string;
  type?: "Tuition" | "Payment";
  title: string;
  subtitle: string;
  tag: string;
}

interface AdminActivityHubProps {
  email: string;
  role: string;
  status: "active" | "blocked";
  activities: ActivityItem[];
}

export default function AdminActivityHub({
  email,
  role,
  status,
  activities,
}: AdminActivityHubProps) {
  const isActive = status !== "blocked";
  const isAdmin = role.toLowerCase() === "admin";

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Security */}
      <Card className="rounded-2xl border border-amber-400/30 bg-white/85 dark:border-amber-400/20 dark:bg-slate-900/75">
        <CardContent className="space-y-3 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            {isActive && isAdmin ? (
              <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            ) : (
              <ShieldAlert className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            )}
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Security Status
            </h2>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between rounded-xl border border-amber-400/20 bg-amber-50/40 px-3.5 py-2 dark:bg-slate-950/50">
              <span className="text-slate-600 dark:text-slate-400">
                Account Status
              </span>
              <span className="font-bold uppercase text-slate-900 dark:text-white">
                {status}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-amber-400/20 bg-amber-50/40 px-3.5 py-2 dark:bg-slate-950/50">
              <span className="text-slate-600 dark:text-slate-400">Role</span>
              <span className="font-bold uppercase text-slate-900 dark:text-white">
                {role}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-xl border border-amber-400/20 bg-amber-50/40 px-3.5 py-2 dark:bg-slate-950/50">
              <span className="text-slate-600 dark:text-slate-400">Email</span>
              <span className="truncate font-bold text-slate-900 dark:text-white">
                {email}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity (Latest Tuitions + Latest Payments) */}
      <Card className="rounded-2xl border border-amber-400/30 bg-white/85 dark:border-amber-400/20 dark:bg-slate-900/75">
        <CardContent className="space-y-3 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Recent Activity (Tuitions & Payments)
            </h2>
          </div>

          {activities.length === 0 ? (
            <p className="rounded-xl border border-amber-400/20 bg-amber-50/40 p-4 text-center text-xs text-slate-500 dark:bg-slate-950/50 dark:text-slate-400">
              No recent tuitions or payments found.
            </p>
          ) : (
            <div className="space-y-2">
              {activities.map((item) => {
                const isPayment = item.type === "Payment";
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-amber-400/20 bg-amber-50/40 px-3.5 py-2 dark:bg-slate-950/50"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-400/15 text-amber-800 dark:text-amber-300">
                        {isPayment ? (
                          <CreditCard className="h-3.5 w-3.5" />
                        ) : (
                          <BookOpen className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                          {item.title}
                        </p>
                        <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-amber-400/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-amber-900 dark:text-amber-200">
                      {item.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}