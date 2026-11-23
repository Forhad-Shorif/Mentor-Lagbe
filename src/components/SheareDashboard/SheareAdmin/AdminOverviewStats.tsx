"use client";

import React from "react";
import {
  BookOpen,
  CheckCircle2,
  CreditCard,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface OverviewData {
  totalUsers: number;
  paidUsers: number;
  blockedUsers: number;
  totalTuitions: number;
  activeTuitions: number;
  approvedTuitions: number;
  totalPayments: number;
  paidRevenue: number;
}

interface AdminOverviewStatsProps {
  data: OverviewData;
}

export default function AdminOverviewStats({ data }: AdminOverviewStatsProps) {
  const cards = [
    {
      label: "Total Users",
      value: data.totalUsers,
      sub: `${data.paidUsers} Pro • ${data.blockedUsers} Blocked`,
      icon: Users,
    },
    {
      label: "Total Tuitions",
      value: data.totalTuitions,
      sub: `${data.activeTuitions} Active • ${data.approvedTuitions} Approved`,
      icon: BookOpen,
    },
    {
      label: "Paid Revenue",
      value: `৳ ${data.paidRevenue}`,
      sub: `${data.totalPayments} Total Payment Records`,
      icon: CreditCard,
    },
    {
      label: "Approved Tuitions",
      value: data.approvedTuitions,
      sub: `Out of ${data.totalTuitions} Listings`,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="rounded-2xl border border-amber-400/30 bg-white/85 text-slate-900 shadow-2xs backdrop-blur-md transition duration-200 hover:border-amber-500/55 dark:border-amber-400/20 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:border-amber-400/45"
          >
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="truncate text-2xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="truncate text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  {stat.sub}
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-400/35 bg-amber-400/15 text-amber-800 dark:text-amber-300">
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}