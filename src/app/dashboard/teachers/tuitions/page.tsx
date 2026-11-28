import MyTuitionsList, {
  TuitionItem,
} from "@/components/SheareDashboard/SheareTeacher/My-Tuition";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// .env e NEXT_PUBLIC_API_URL na thakle local backend (port 8000) use hobe.
// Empty string dile fetch URL relative hoye server e fail kore.
const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

export default async function TeacherTuitionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = String(session?.user?.email || "")
    .trim()
    .toLowerCase();

  let tuitions: TuitionItem[] = [];

  // Email chara /TeacherTeutionsGet/ call korle backend 400 dey, tai age check.
  if (email) {
    try {
      const res = await fetch(
        `${API_BASE}/TeacherTeutionsGet/${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );

      if (res.ok) {
        const data = await res.json();
        tuitions = Array.isArray(data) ? data : data?.tuitions || [];
      }
    } catch (error) {
      console.error("Failed to fetch tuitions:", error);
    }
  }

  return (
    <div className="w-full">
      <MyTuitionsList initialTuitions={tuitions} />
    </div>
  );
}
