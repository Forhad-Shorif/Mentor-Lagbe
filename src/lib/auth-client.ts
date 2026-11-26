import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

// Auth API ei same Next.js app er vitorei ache (/api/auth/*), tai browser e
// always current origin use kora safest.
//
// কেন: NEXT_PUBLIC_APP_URL build time e bundle e bake hoye jay. Host e ভুল করে
// http://localhost:3000 theke gele live site er browser nijer machine e
// request pathiye dey — tai sign in / sign up kaj kore na.
const configuredBaseURL = (process.env.NEXT_PUBLIC_APP_URL || "")
  .trim()
  .replace(/\/+$/, "")

const baseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : configuredBaseURL || undefined

export const authClient = createAuthClient({
  baseURL,

  // Server-er auth.ts er additionalFields (role, coverImage) client e type hisebe ene dey.
  // Ei jonno signUp.email({ role }) ar session.user.role TypeScript error dey na.
  plugins: [inferAdditionalFields<typeof auth>()],
})
