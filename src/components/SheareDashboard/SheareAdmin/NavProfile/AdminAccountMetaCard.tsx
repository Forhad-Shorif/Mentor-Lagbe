import React from "react";
import { BadgeCheck, Mail, MapPin, ShieldCheck } from "lucide-react";

export interface AdminMetaInfo {
  name: string;
  email: string;
  role: string;
  location?: string;
}

interface AdminAccountMetaCardProps {
  meta: AdminMetaInfo;
}

export default function AdminAccountMetaCard({ meta }: AdminAccountMetaCardProps) {
  const details = [
    {
      label: "Display Name",
      value: meta.name,
      icon: (
        <BadgeCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
      ),
    },
    {
      label: "Email Address",
      value: meta.email,
      icon: <Mail className="h-4 w-4 text-teal-600 dark:text-teal-300" />,
    },
    {
      label: "Account Role",
      value: meta.role.toUpperCase(),
      icon: (
        <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
      ),
    },
    {
      label: "Location",
      value: meta.location || "Dhaka, Bangladesh",
      icon: <MapPin className="h-4 w-4 text-teal-600 dark:text-teal-300" />,
    },
  ];

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-50/85 via-white/75 to-teal-50/70 p-5 shadow-[0_14px_36px_-14px_rgba(16,185,129,0.25)] backdrop-blur-xl transition-all dark:border-emerald-300/25 dark:from-emerald-950/40 dark:via-slate-900/75 dark:to-teal-950/35 dark:shadow-[0_14px_38px_-14px_rgba(52,211,153,0.16)] sm:p-6">
      <div className="pointer-events-none -left-14 -bottom-14 absolute h-36 w-36 rounded-full bg-emerald-400/20 blur-2xl" />

      <div className="relative flex items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white sm:text-lg">
            Account Details
          </h3>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
            Core identity & access status
          </p>
        </div>
        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
          Verified
        </span>
      </div>

      <div className="relative mt-4 space-y-2.5">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-400/25 bg-white/80 px-3.5 py-2.5 text-xs backdrop-blur-md dark:border-emerald-300/15 dark:bg-slate-950/65 sm:text-sm"
          >
            <span className="inline-flex shrink-0 items-center gap-2 font-medium text-slate-600 dark:text-slate-300">
              {item.icon}
              <span>{item.label}</span>
            </span>
            <span className="truncate font-bold text-slate-900 dark:text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}