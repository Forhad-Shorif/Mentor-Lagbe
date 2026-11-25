import React from "react";
import UserProfileCard from "@/components/SheareForm/ProfileForm/UserProfile";
import TeacherProfileCard from "@/components/SheareForm/ProfileForm/TeacherProfile";
import {
  getTeacherProfile,
  getUserProfile,
} from "@/components/SheareForm/ProfileForm/ActionProfile";
import EditTeacherProfileDialog from "@/components/SheareForm/ProfileForm/EditTeacherProfileDialog";
import AddTeacherProfileDialog from "@/components/SheareForm/ProfileForm/Teacher-Form";
import EditLeftProfileDialog from "@/components/SheareForm/ProfileForm/EditLeftProfileDialog";
import AddLeftProfileDialog from "@/components/SheareForm/ProfileForm/Parsonal-Form";
import TutorBioBox from "@/components/SheareDashboard/SheareTeacher/Tutions/TutorBioBox";
import TeacherPlanSection from "@/components/Payments/TeacherPlanSection";
import { ServerUser } from "@/lib/ServerUser";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ============================================================================
// হিন্ট: পেমেন্ট · Teacher Profile Setting (Teacher Pro প্ল্যান কার্ড)
// ============================================================================
// হিন্ট (কী): এই পেজের একদম নিচে <TeacherPlanSection /> বসানো আছে — টিচারের
//   Free Starter vs Teacher Pro কার্ড এবং Stripe "Update Plan" বাটন।
//
// হিন্ট (কেন): প্রোফাইল আপডেট করতে আসা টিচার যেন এখান থেকেই প্ল্যান কিনতে পারে,
//   আলাদা pricing পেজে যেতে না হয়। currentPlan="starter" পাঠানো হয় যাতে প্রথম
//   রেন্ডারে Free অবস্থা ধরে নেয়।
//
// হিন্ট (কীভাবে): কম্পোনেন্ট নিজেই GET /GetPlanStatus/:email ডেকে আসল স্ট্যাটাস আনে →
//   active থাকলে বাটন disabled হয়ে "Pro Plan Active · till <তারিখ>" দেখায়,
//   আর active না থাকলে ক্লিকে POST /PaymentPending → POST /api/checkout_sessions
//   → Stripe পেজে redirect হয়।
//
// হিন্ট: teacherEmail / teacherId props-এ logged-in টিচারের email ও id যাচ্ছে —
//   Stripe session-এর metadata-তে সেই email-ই যায়, তাই পেমেন্ট শেষে প্ল্যান ঠিক
//   এই অ্যাকাউন্টেই activate হয়।
// ============================================================================
export default async function TeacherProfilePage() {
  const user = await ServerUser();

  if (!user) {
    return (
      <main className="w-full text-slate-900 transition-colors dark:text-slate-100">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Please sign in to view your teacher profile.
        </div>
      </main>
    );
  }

  const email = String(user.email || "").trim().toLowerCase();

  // Ei page teacher layout er vitore, tai role guard already hoye geche.
  const userProfile = await getUserProfile(email);
  const teacherProfile = await getTeacherProfile(email);

  let initialBio = "";

  if (email) {
    try {
      const res = await fetch(
        `${API_BASE}/GetBio?email=${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        initialBio = String(data?.bio || "");
      }
    } catch {
      initialBio = "";
    }
  }

  return (
    <main className="w-full text-slate-900 transition-colors dark:text-slate-100">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Top Header with Post / Update Profile Actions */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70 sm:px-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              Teacher Profile
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your mentor profile, personal info, and Pro plan
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            {teacherProfile ? (
              <EditTeacherProfileDialog initialData={teacherProfile} />
            ) : (
              <AddTeacherProfileDialog />
            )}

            {userProfile ? (
              <EditLeftProfileDialog initialData={userProfile} />
            ) : (
              <AddLeftProfileDialog />
            )}
          </div>
        </div>

        {/* Tutor Bio Section */}
        <TutorBioBox
          userId={String((user as { _id?: string })?._id || "")}
          email={email}
          initialBio={initialBio}
        />

        {/* User Profile + Teacher Profile Cards (Column-wise) */}
        <div className="flex flex-col gap-4 md:gap-5">
          {userProfile ? (
            <UserProfileCard
              profile={userProfile}
              fallbackName={user.name || undefined}
              fallbackImage={user.image || undefined}
            />
          ) : (
            <EmptyCard>
              No user profile info posted yet. Click the button above to post it.
            </EmptyCard>
          )}

          {teacherProfile ? (
            <TeacherProfileCard profile={teacherProfile} />
          ) : (
            <EmptyCard>
              Teacher info not posted yet. Click the button above to post it.
            </EmptyCard>
          )}
        </div>

        {/* Teacher Plan Upgrade Section -> Stripe */}
        <TeacherPlanSection
          teacherEmail={user.email || ""}
          teacherId={user.id || ""}
          currentPlan="starter"
        />
      </div>
    </main>
  );
}

function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
      {children}
    </div>
  );
}