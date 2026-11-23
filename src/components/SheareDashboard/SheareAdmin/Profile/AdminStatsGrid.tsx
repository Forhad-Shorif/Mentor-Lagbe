"use client";

import React from "react";
import {
  BookOpen,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AdminStatsGridProps {
  stats: {
    totalUsers: number;
    totalTuitions: number;
    approvedTuitions: number;
    paidRevenue: number;
  };
  role: string;
  status: "active" | "blocked";
}

export default function AdminStatsGrid({
  stats,
  role,
  status,
}: AdminStatsGridProps) {
  const allowed = status !== "blocked";

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users },
    { label: "Total Tuitions", value: stats.totalTuitions, icon: BookOpen },
    {
      label: "Approved Tuitions",
      value: stats.approvedTuitions,
      icon: CheckCircle2,
    },
    { label: "Paid Revenue", value: `৳ ${stats.paidRevenue}`, icon: CreditCard },
  ];

  const permissions = [
    "Users: change role, payment flag, block, delete",
    "Tuitions: approve, revoke, delete",
    "Payments: update status, delete",
  ];

  return (
    <div className="space-y-4">
      {/* Real Stats */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className="rounded-2xl border border-amber-400/30 bg-white/85 dark:border-amber-400/20 dark:bg-slate-900/75"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-700 dark:text-amber-300">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Admin Permissions */}
      <Card className="rounded-2xl border border-amber-400/30 bg-white/85 dark:border-amber-400/20 dark:bg-slate-900/75">
        <CardContent className="space-y-3 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Admin Permissions ({role})
              </h2>
            </div>
            <span className="rounded-full bg-amber-400/15 px-3 py-0.5 text-xs font-bold text-amber-900 dark:text-amber-200">
              {allowed ? "Full Access" : "Locked"}
            </span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            {permissions.map((text) => (
              <div
                key={text}
                className="flex items-center justify-between rounded-xl border border-amber-400/20 bg-amber-50/40 px-3.5 py-2 dark:bg-slate-950/50"
              >
                <span className="text-slate-700 dark:text-slate-300">
                  {text}
                </span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {allowed ? "Allowed" : "Locked"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}