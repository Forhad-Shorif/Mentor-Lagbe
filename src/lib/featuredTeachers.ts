// Home page er "Meet Recent Tutors" marquee er data.
// Server theke fetch kora hoy, tai browser theke backend call jay na.

export interface FeaturedTeacher {
  id: string;
  email: string;
  name: string;
  image: string;
  headline?: string;
  subjects: string[];
  teachingMode?: string;
  location?: string;
}

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const isTeacherRole = (role?: string) => {
  const value = String(role || "").toLowerCase();
  return value === "teachers" || value === "teacher";
};

const prettifyEmail = (email: string) => {
  const local = email.split("@")[0] || "";
  return (
    local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "Mentor"
  );
};

const toSubjects = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

// GET /GetUsers theke teacher role er user niye, prottekjoner
// GET /TeachersProfile/:email profile er sathe merge kora hoy.
export async function getFeaturedTeachers(
  limit = 15
): Promise<FeaturedTeacher[]> {
  try {
    const usersRes = await fetch(`${API_BASE}/GetUsers`, {
      cache: "no-store",
    });
    if (!usersRes.ok) return [];

    const usersRaw = await usersRes.json();
    const users: Array<Record<string, unknown>> = Array.isArray(usersRaw)
      ? usersRaw
      : [];

    const teacherUsers = users
      .filter((user) => isTeacherRole(String(user?.role || "")))
      .filter((user) => Boolean(user?.email))
      .sort(
        (a, b) =>
          new Date(String(b?.createdAt || 0)).getTime() -
          new Date(String(a?.createdAt || 0)).getTime()
      );

    const merged = await Promise.all(
      teacherUsers.map(async (user) => {
        const email = String(user.email || "").trim().toLowerCase();

        const profile = await fetch(
          `${API_BASE}/TeachersProfile/${encodeURIComponent(email)}`,
          { cache: "no-store" }
        )
          .then((res) => (res.ok ? res.json() : []))
          .then((data) => (Array.isArray(data) ? data[0] : data))
          .catch(() => null);

        // Teacher profile na thakle marquee te dekhano hoy na —
        // karon card er subject/headline oi profile theke ashe.
        if (!profile?._id) return null;

        const subjects = toSubjects(profile.skillsAndSubjects);

        return {
          id: String(profile._id || user._id || email),
          email,
          name: String(user.name || profile?.name || prettifyEmail(email)),
          image: String(
            profile?.image ||
              profile?.photoURL ||
              user.image ||
              "/Online.png"
          ),
          headline: profile?.headline ? String(profile.headline) : undefined,
          subjects,
          teachingMode: profile?.teachingMode
            ? String(profile.teachingMode)
            : undefined,
          location: profile?.location ? String(profile.location) : undefined,
          createdAt: String(profile?.createdAt || user.createdAt || ""),
        } as FeaturedTeacher & { createdAt: string };
      })
    );

    return merged
      .filter((item): item is FeaturedTeacher & { createdAt: string } =>
        Boolean(item)
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      )
      .slice(0, limit)
      .map((item) => ({
        id: item.id,
        email: item.email,
        name: item.name,
        image: item.image,
        headline: item.headline,
        subjects: item.subjects,
        teachingMode: item.teachingMode,
        location: item.location,
      }));
  } catch (error) {
    console.error("getFeaturedTeachers error:", error);
    return [];
  }
}
