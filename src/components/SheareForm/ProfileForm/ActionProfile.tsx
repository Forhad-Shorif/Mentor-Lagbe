import { TeacherProfileForm } from "@/lib/Type/ProfileType";

// Backend URL ek jaygay rakha hoy, jate sob function same URL use kore.
// .env e NEXT_PUBLIC_API_URL na thakle local backend (port 8000) use hobe.
const getBackendUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ;

// User profile (MongoDB "Profile" collection) er ekta document
export interface UserProfileItem {
  _id: string;
  name?: string;
  tag?: string;
  dateOfBirth?: string;
  location?: string;
  photoURL?: string;
  facebook?: string;
  contact?: string;
  email?: string;
  educations?: string[];
}

// Form theke backend e pathano user profile data
export interface UserProfileFormData {
  name: string;
  tag: string;
  dateOfBirth: string;
  location: string;
  photoURL: string;
  facebook: string;
  contact: string;
  educations: string[];
  email?: string;
  Id?: string;
}

// Teacher profile (MongoDB "Teacher-Address" collection) er ekta document
export interface TeacherProfileItem extends TeacherProfileForm {
  _id: string;
}

// ================= USER PROFILE =================

// GET: email diye user profile ana
export async function getUserProfile(
  email: string
): Promise<UserProfileItem | null> {
  if (!email) return null;

  try {
    const res = await fetch(
      `${getBackendUrl()}/UsersGet/${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    // Backend array pathay (notun ta age). Array na hole object o handle kori.
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    if (data && typeof data === "object" && !Array.isArray(data) && data._id) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

// POST: area kono profile na thakle notun profile save kore
export async function createUserProfile(
  profile: UserProfileFormData
): Promise<boolean> {
  try {
    const res = await fetch(`${getBackendUrl()}/UserProfiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    return res.ok;
  } catch (error) {
    console.error("Error creating user profile:", error);
    return false;
  }
}

// PATCH: profile already thakle _id diye update kore
export async function updateUserProfile(
  id: string,
  profile: UserProfileFormData
): Promise<boolean> {
  try {
    const res = await fetch(
      `${getBackendUrl()}/UsersUpdate/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }
    );

    return res.ok;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
}

// ================= TEACHER PROFILE =================

// GET: email diye teacher profile ana
export async function getTeacherProfile(
  email: string
): Promise<TeacherProfileItem | null> {
  if (!email) return null;

  try {
    const res = await fetch(
      `${getBackendUrl()}/TeachersProfile/${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    if (data && typeof data === "object" && !Array.isArray(data) && data._id) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    return null;
  }
}

// POST: teacher profile notun kore save kore
export async function createTeacherProfile(
  profile: TeacherProfileForm
): Promise<boolean> {
  try {
    const res = await fetch(`${getBackendUrl()}/TeachersProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    return res.ok;
  } catch (error) {
    console.error("Error creating teacher profile:", error);
    return false;
  }
}

// PATCH: teacher profile _id diye update kore
export async function updateTeacherProfile(
  id: string,
  profile: TeacherProfileForm
): Promise<boolean> {
  try {
    const res = await fetch(
      `${getBackendUrl()}/TeachersUpdate/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }
    );

    return res.ok;
  } catch (error) {
    console.error("Error updating teacher profile:", error);
    return false;
  }
}
