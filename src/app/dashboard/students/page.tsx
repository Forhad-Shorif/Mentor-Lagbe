import StudentOverviewClient from "@/components/SheareDashboard/SheareStudents/OverView/StudentOverviewClient";
import { StudentTuitionItem } from "@/components/SheareDashboard/SheareStudents/OverView/StudentTuitionCard";
import { ServerUser } from "@/lib/ServerUser";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchList(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.applications)) return data.applications;
    if (Array.isArray(data?.saved)) return data.saved;
    if (Array.isArray(data?.tuitions)) return data.tuitions;
    if (Array.isArray(data?.items)) return data.items;
    return [];
  } catch {
    return [];
  }
}

async function fetchPlanStatus(email: string) {
  try {
    const res = await fetch(
      `${API_BASE}/GetPlanStatus/${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return (await res.json()) as { isActivePlan?: boolean } | null;
  } catch {
    return null;
  }
}

// ============================================================================
// হিন্ট: পেমেন্ট · Student Dashboard Overview (Pro ব্যাজ + Free লিমিট)
// ============================================================================
// হিন্ট (কী): এখানে স্টুডেন্টের Apply/Save করা টিউশনের লিস্ট আর "Pro" ব্যাজ দেখানো হয়।
//
// হিন্ট (কেন): Pro কি না সেটা BetterAuth session.user.payment থেকে নেওয়া যাবে না —
//   BetterAuth ওই ফিল্ডটা কখনো সেভ করে না, তাই সেটা সবসময় false হতো। Pro-এর আসল
//   উৎস হলো paid রশিদ → তাই ব্যাকএন্ডের /GetPlanStatus/:email কল করা হয়।
//
// হিন্ট (কীভাবে): fetchPlanStatus() → GET /GetPlanStatus/:email →
//   { isActivePlan, activePlanKey, planExpiresAt }। isActivePlan সত্য হলে isPro = true।
//   পাশাপাশি admin-এর ম্যানুয়াল payment ফ্ল্যাগ থাকলেও fallback হিসেবে ধরা হয়।
//
// হিন্ট: এই isPro কোথায় কাজে লাগে? UI-তে Pro ব্যাজ দেখানোয়। আর আসল ২-এর বেশি
//   Apply/Save করার অনুমতি ব্যাকএন্ড নিজেই দেয় (/GetApplyCount, /ApplyPost,
//   /SavedTuitions), কারণ ক্লায়েন্টের কথায় লিমিট খোলা/বন্ধ হয় না।
//
// হিন্ট: ব্যাকএন্ড ডাউন থাকলে fetchPlanStatus null দেয় → ব্যাজ দেখাবে না, কিন্তু
//   পেজ ক্র্যাশ করবে না (fallback: ফ্রি ইউজার ধরা হয়)।
// ============================================================================
export default async function StudentDashboardOverviewPage() {
  const user = await ServerUser();
  const email = String(user?.email || "").trim().toLowerCase();

  const [applicationsRaw, savedRaw, planStatus] = await Promise.all([
    email
      ? fetchList(`${API_BASE}/ApplyGet/${encodeURIComponent(email)}`)
      : [],
    email
      ? fetchList(`${API_BASE}/SavedTuitionsGet/${encodeURIComponent(email)}`)
      : [],
    email ? fetchPlanStatus(email) : null,
  ]);

  const appliedItems: StudentTuitionItem[] = applicationsRaw.map(
    (
      app: {
        _id?: string;
        tuitionId?: string;
        title?: string;
        tuitionTitle?: string;
        subject?: string;
        mentorName?: string;
        location?: string;
        schedule?: string;
        sessionTime?: string;
        daysPerWeek?: string;
        budget?: string | number;
        monthlyFee?: string | number;
        salary?: string | number;
      },
      index: number
    ) => ({
      id: `applied-${String(app?._id || app?.tuitionId || index)}`,
      title: app?.title || app?.tuitionTitle || "Untitled Tuition",
      subject: app?.subject || "General",
      location: app?.location || "",
      schedule:
        app?.schedule || app?.sessionTime || app?.daysPerWeek || "",
      budget:
        app?.monthlyFee !== undefined
          ? `৳${app.monthlyFee} / month`
          : app?.budget !== undefined
          ? `৳${app.budget} / month`
          : app?.salary !== undefined
          ? `৳${app.salary} / month`
          : "",
      status: "Applied",
      href: "/dashboard/students/application",
    })
  );

  const savedItems: StudentTuitionItem[] = savedRaw.map(
    (
      item: {
        _id?: string;
        tuitionId?: string;
        title?: string;
        tuitionTitle?: string;
        subject?: string;
        location?: string;
        schedule?: string;
        weeklyClasses?: string;
        daysPerWeek?: string;
        budget?: string | number;
        monthlyFee?: string | number;
        salary?: string | number;
      },
      index: number
    ) => ({
      id: `saved-${String(item?._id || item?.tuitionId || index)}`,
      title: item?.title || item?.tuitionTitle || "Untitled Tuition",
      subject: item?.subject || "General",
      location: item?.location || "",
      schedule:
        item?.schedule || item?.weeklyClasses || item?.daysPerWeek || "",
      budget:
        item?.monthlyFee !== undefined
          ? `৳${item.monthlyFee} / month`
          : item?.budget !== undefined
          ? `৳${item.budget} / month`
          : item?.salary !== undefined
          ? `৳${item.salary} / month`
          : "",
      status: "Saved",
      href: "/dashboard/students/saved",
    })
  );

  const realItems: StudentTuitionItem[] = [...appliedItems, ...savedItems];
  const studentName = String(user?.name || user?.email || "Student");
  // হিন্ট: Pro ব্যাজ আসল paid প্ল্যান স্ট্যাটাস থেকে নেওয়া হচ্ছে (আগে session user-এর
  // `payment` ফিল্ড দেখত, যা BetterAuth user-এ থাকে না — তাই সবসময় false হতো)।
  const isPro =
    Boolean(planStatus?.isActivePlan) ||
    Boolean((user as { payment?: boolean })?.payment);

  return (
    <section className="mx-auto w-full max-w-6xl">
      <StudentOverviewClient
        studentName={studentName}
        isPro={isPro}
        items={realItems}
      />
    </section>
  );
}