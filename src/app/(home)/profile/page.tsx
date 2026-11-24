import React from "react";

import ProfileMediaSection from "@/components/SheareForm/ProfileForm/ImageFeild";
import UserProfileCard from "@/components/SheareForm/ProfileForm/UserProfile";
import TeacherProfileCard from "@/components/SheareForm/ProfileForm/TeacherProfile";
import {getTeacherProfile,getUserProfile,} from "@/components/SheareForm/ProfileForm/ActionProfile";
import EditTeacherProfileDialog from "@/components/SheareForm/ProfileForm/EditTeacherProfileDialog";
import AddTeacherProfileDialog from "@/components/SheareForm/ProfileForm/Teacher-Form";
import EditLeftProfileDialog from "@/components/SheareForm/ProfileForm/EditLeftProfileDialog";
import AddLeftProfileDialog from "@/components/SheareForm/ProfileForm/Parsonal-Form";
import AdminProfileBioCard from "@/components/SheareDashboard/SheareAdmin/NavProfile/AdminProfileBioCard";
import AdminAccountMetaCard from "@/components/SheareDashboard/SheareAdmin/NavProfile/AdminAccountMetaCard";
import AdminQuickActionsCard from "@/components/SheareDashboard/SheareAdmin/NavProfile/AdminQuickActionsCard";
import NavProfileEdit from "@/components/SheareForm/ProfileForm/EditNavProfile";
import { ServerUser } from "@/lib/ServerUser";

// Role na porichito hole null — kono "students" fallback nei.
const getRole = (role?: string): "students" | "teachers" | "admin" | null => {
  const value = String(role || "").toLowerCase();

  if (value === "students" || value === "student") return "students";
  if (value === "teachers" || value === "teacher") return "teachers";
  if (value === "admin") return "admin";

  return null;
};

const ProfilePage = async () => {
  const user = await ServerUser();

  // Login na thakle profile dekhano jabe na.
  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Please sign in to view your profile.
        </div>
      </main>
    );
  }

  const role = getRole(user.role);
  const email = user.email || "";
  const isStudentOrTeacher = role === "students" || role === "teachers";

  // Backend theke login kora user er profile data ana hoy.
  // Admin er jonno ei profile info section cholbe na (shudhu student + teacher).
  const userProfile = isStudentOrTeacher ? await getUserProfile(email) : null;
  const teacherProfile =
    role === "teachers" ? await getTeacherProfile(email) : null;

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-8">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Top Header with Post / Update Profile Actions */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70 sm:px-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              My Profile
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your personal info and appearance
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            {/* Teacher profile data thakle Update, na thakle Post Data */}
            {role === "teachers" &&
              (teacherProfile ? (
                <EditTeacherProfileDialog initialData={teacherProfile} />
              ) : (
                <AddTeacherProfileDialog />
              ))}

            {/* User profile data thakle Update, na thakle Post Data */}
            {isStudentOrTeacher &&
              (userProfile ? (
                <EditLeftProfileDialog initialData={userProfile} />
              ) : (
                <AddLeftProfileDialog />
              ))}

            <NavProfileEdit />
          </div>
        </div>

        {/* Main Profile Card */}
        <ProfileMediaSection />

        {/* Student: shudhu User card. Teacher: Column-wise User card + Teacher card. */}
        {isStudentOrTeacher &&
          (role === "teachers" ? (
            <div className="flex flex-col gap-4 md:gap-5">
              {userProfile ? (
                <UserProfileCard
                  profile={userProfile}
                  fallbackName={user.name || undefined}
                  fallbackImage={user.image || undefined}
                />
              ) : (
                <EmptyCard>
                  No user profile info posted yet. Click the &quot;Post Data&quot;
                  / &quot;Add Info&quot; button above to post it.
                </EmptyCard>
              )}

              {teacherProfile ? (
                <TeacherProfileCard profile={teacherProfile} />
              ) : (
                <EmptyCard>
                  Teacher info not posted yet. Click the button above to post
                  it.
                </EmptyCard>
              )}
            </div>
          ) : userProfile ? (
            <UserProfileCard
              profile={userProfile}
              fallbackName={user.name || undefined}
              fallbackImage={user.image || undefined}
            />
          ) : (
            <EmptyCard>
              No profile info posted yet. Click the button above to post your
              details.
            </EmptyCard>
          ))}

        {role === "admin" ? (
          <div className="space-y-6">
            <AdminProfileBioCard />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <AdminAccountMetaCard
                  meta={{
                    name: user.name,
                    email: user.email,
                    role: user.role,
                  }}
                />
              </div>
              <div className="lg:col-span-6">
                <AdminQuickActionsCard />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

interface EmptyCardProps {
  children: React.ReactNode;
}

// Profile data na thakle ei dashed card ta dekhano hoy.
function EmptyCard({ children }: EmptyCardProps) {
  return (
    <div className="flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
      {children}
    </div>
  );
}

export default ProfilePage;