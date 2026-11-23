
import React from "react";
import {
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  Share2,
  UserRound,
} from "lucide-react";
import { UserProfileItem } from "@/components/SheareForm/ProfileForm/ActionProfile";

interface UserProfileCardProps {
  profile: UserProfileItem;
  fallbackName?: string;
  fallbackImage?: string;
}

const UserProfileCard = ({
  profile,
  fallbackName,
  fallbackImage,
}: UserProfileCardProps) => {
  const displayName = profile.name || fallbackName || "Unnamed User";
  const displayImage = profile.photoURL || fallbackImage || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      {/* Subtle Accent */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-400" />

      {/* Compact Profile Header */}
      <div className="relative overflow-hidden px-4 py-4 sm:px-5">
        <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/10" />

        <div className="relative flex min-w-0 items-center gap-3.5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-[68px] w-[68px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:h-[76px] sm:w-[76px]">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 via-sky-500 to-teal-400 text-2xl font-bold text-white">
                  {initial}
                </div>
              )}
            </div>

            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-cyan-500 text-white dark:border-slate-950">
              <UserRound className="h-2.5 w-2.5" />
            </span>
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300">
              User Profile
            </span>

            <h3 className="mt-1 break-words text-base font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-lg">
              {displayName}
            </h3>

            {profile.tag && (
              <p className="mt-0.5 break-words text-xs font-medium text-cyan-600 dark:text-cyan-400">
                {profile.tag}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-slate-100 dark:bg-slate-800 sm:mx-5" />

      {/* Basic Information */}
      <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 sm:p-5">
        <InfoTile
          icon={<Calendar className="h-4 w-4" />}
          label="Birth Date"
          value={profile.dateOfBirth || "Not provided"}
          iconBg="bg-violet-500/10"
          iconColor="text-violet-500"
        />

        <InfoTile
          icon={<MapPin className="h-4 w-4" />}
          label="Location"
          value={profile.location || "Not provided"}
          iconBg="bg-teal-500/10"
          iconColor="text-teal-500"
        />

        <InfoTile
          icon={<Mail className="h-4 w-4" />}
          label="Contact"
          value={profile.contact || profile.email || "Not provided"}
          iconBg="bg-blue-500/10"
          iconColor="text-blue-500"
        />

        <InfoTile
          icon={<Share2 className="h-4 w-4" />}
          label="Facebook"
          value={profile.facebook || "Not provided"}
          iconBg="bg-sky-500/10"
          iconColor="text-sky-500"
        />
      </div>

      {/* Education Section */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-900/50">
          <h4 className="mb-2.5 flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <GraduationCap className="h-4 w-4" />
            </span>
            Education & Qualifications
          </h4>

          {Array.isArray(profile.educations) &&
            profile.educations.length > 0 ? (
            <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              {profile.educations.map((edu, idx) => (
                <li
                  key={`${profile._id}-edu-${idx}`}
                  className="flex min-w-0 items-start gap-2 rounded-lg border border-slate-200/70 bg-white px-3 py-2.5 text-xs leading-relaxed text-slate-700 transition-colors hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:border-cyan-500/30"
                >
                  <span className="mt-1.5 h-1.5 shrink-0 rounded-full bg-cyan-500" />
                  <span className="min-w-0 break-words">{edu}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-200 px-3 py-2.5 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">
              No education qualifications added yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

interface InfoTileProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
}

function InfoTile({
  icon,
  label,
  value,
  iconBg,
  iconColor,
}: InfoTileProps) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-2.5 transition-colors hover:bg-slate-100/80 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
      >
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
          {label}
        </p>

        <p className="mt-0.5 break-all text-xs font-semibold leading-5 text-slate-700 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}

export default UserProfileCard;
