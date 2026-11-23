import MyTuitionsList, {
  TuitionItem,
} from "@/components/SheareDashboard/SheareTeacher/My-Tuition";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function TeacherTuitionsPage() {
  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
       
    const email = session?.user?.email

  // আপনার সেশন/ইউজার থেকে teacher-এর email নিন (না থাকলে ফাঁকা থাকলে /Tuitions কল হবে)
  const Email = email || "";

  let tuitions: TuitionItem[] = [];

  try {

    const res = await fetch( `${backendUrl}/TeacherTeutionsGet/${encodeURIComponent(Email)}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      tuitions = Array.isArray(data) ? data : data?.tuitions || [];
    }
  } catch (error) {
    console.error("Failed to fetch tuitions:", error);
  }

  return (
    <div className="w-full">
      <MyTuitionsList initialTuitions={tuitions} />
    </div>
  );
}