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

export default async function StudentDashboardOverviewPage() {
  const user = await ServerUser();
  const email = String(user?.email || "").trim().toLowerCase();

  const query = email ? `?email=${encodeURIComponent(email)}` : "";

  const [applicationsRaw, savedRaw] = await Promise.all([
    email
      ? fetchList(`${API_BASE}/ApplyGet/${encodeURIComponent(email)}`)
      : [],
    email
      ? fetchList(`${API_BASE}/SavedTuitionsGet/${encodeURIComponent(email)}`)
      : [],
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
  const isPro = Boolean((user as { payment?: boolean })?.payment);

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