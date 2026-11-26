import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

import dns from "node:dns"

// Local dev e SRV lookup fail korchilo, tai Google DNS set kora hoy.
// Production (Vercel/Render) e custom DNS block thakle Mongo connection fail kore,
// tai shudhu development e set kora hoy.
if (process.env.NODE_ENV !== "production") {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"])
  } catch {
    // ignore — default DNS diyei cholbe
  }
}

// .env: MONGODB_SECRET_URL_ID = MongoDB connection string
const client = new MongoClient(`${process.env.MONGODB_SECRET_URL_ID}`)
const db = client.db("assignment-projects")

const normalizeUrl = (value?: string) =>
    String(value || "").trim().replace(/\/+$/, "")

const isLocalhostUrl = (url: string) =>
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(url)

// Production e localhost URL kokhono trusted/base hisebe use hobe na.
// (Host e bhul kore NEXT_PUBLIC_APP_URL=http://localhost:3000 theke gele o site bachbe.)
const usableUrl = (value?: string) => {
    const url = normalizeUrl(value)
    if (!url) return ""
    if (process.env.NODE_ENV === "production" && isLocalhostUrl(url)) return ""
    return url
}

// Vercel nijei ei env gulo dey — tai URL na dileo deployment nijer domain chinbe.
const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : ""
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : ""

// BetterAuth ei base URL diye callback/cookie banay.
// Production e set korte hobe: BETTER_AUTH_URL=https://your-domain.com
const appUrl =
    usableUrl(process.env.BETTER_AUTH_URL) ||
    usableUrl(process.env.NEXT_PUBLIC_APP_URL) ||
    usableUrl(vercelUrl) ||
    usableUrl(vercelProductionUrl) ||
    undefined

// www.example.com ar example.com — duita thekei login korle o jeno 403 na ashe.
const withWwwVariant = (url: string) => {
    if (!url) return []
    const list = [url]
    try {
        const parsed = new URL(url)
        const host = parsed.hostname
        if (host.startsWith("www.")) {
            list.push(`${parsed.protocol}//${host.slice(4)}`)
        } else if (!/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
            list.push(`${parsed.protocol}//www.${host}`)
        }
    } catch {
        // invalid URL — ignore
    }
    return list
}

// Ei origin gulo theke auth request allow hobe (nahole 403 Invalid origin).
const trustedOrigins = Array.from(
    new Set(
        [
            appUrl,
            usableUrl(process.env.NEXT_PUBLIC_APP_URL),
            usableUrl(vercelUrl),
            usableUrl(vercelProductionUrl),
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]
            .filter((origin): origin is string => Boolean(origin))
            .flatMap(withWwwVariant)
    )
)

export const auth = betterAuth({
    baseURL: appUrl,
    trustedOrigins,

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },

    user: {
        additionalFields: {
            // 🎭 User Role Field
            role: {
                // DB te string hisebe save hobe; allowed value: "students" | "teachers" | "admin"
                type: "string",
                defaultValue: "students",
                required: true,
                input: true,
            },

            // 🖼️ Cover Image Field
            coverImage: {
                type: "string",
                required: false,
                input: true,
            },

            // 🚦 Account Status Field ("active" | "blocked")
            status: {
                type: "string",
                defaultValue: "active",
                required: false,
                input: false,
            },

            // 👑 Payment / Pro Status Field (true | false)
            payment: {
                type: "boolean",
                defaultValue: false,
                required: false,
                input: false,
            },
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
})
