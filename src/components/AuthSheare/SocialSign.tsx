'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { showToast } from '@/lib/utils/toast'
import { FaGoogle, FaGithub } from 'react-icons/fa6'

// হিন্ট (কী): Google ও GitHub সোশ্যাল সাইন-ইন বাটন—Light ও Dark থিমের সাথে মিলিয়ে স্টাইল করা হয়েছে।
// হিন্ট (কেন): SignUp ও SignIn ফর্মের সায়ান/ডার্ক-ব্লু গ্লাস লুকের সাথে বাটনগুলো যেন সামঞ্জস্যপূর্ণ থাকে।
// হিন্ট (কীভাবে): contents wrapper এবং light/dark adaptive Tailwind ক্লাস ব্যবহার করা হয়েছে।
const SocialSign = () => {
    // কোন provider-এ ক্লিক করা হয়েছে তা ধরে রাখা হচ্ছে, যাতে ওই বাটনে spinner ও disable কাজ করে
    const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null)

    const handleSocialSignIn = async (provider: "google" | "github") => {
        setLoadingProvider(provider)

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/profile",
            })

            if (error) {
                const label = provider === "google" ? "Google" : "GitHub"
                showToast.error(error.message || `${label} sign-in failed. Please try again.`)
            }
        } finally {
            setLoadingProvider(null)
        }
    }

    return (
        <div className="contents">
            <button
                type="button"
                onClick={() => handleSocialSignIn("google")}
                disabled={loadingProvider !== null}
                className="group flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-xs font-bold text-slate-800 shadow-2xs transition-all duration-200 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-slate-950 active:scale-[0.98] disabled:opacity-50 dark:border-slate-700/80 dark:bg-slate-950/65 dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:bg-cyan-400/10 dark:hover:text-white sm:text-sm"
            >
                {loadingProvider === "google" ? (
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                    <FaGoogle className="size-4 text-rose-500 transition-transform duration-200 group-hover:scale-110" />
                )}
                <span>Google</span>
            </button>

            <button
                type="button"
                onClick={() => handleSocialSignIn("github")}
                disabled={loadingProvider !== null}
                className="group flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-xs font-bold text-slate-800 shadow-2xs transition-all duration-200 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-slate-950 active:scale-[0.98] disabled:opacity-50 dark:border-slate-700/80 dark:bg-slate-950/65 dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:bg-cyan-400/10 dark:hover:text-white sm:text-sm"
            >
                {loadingProvider === "github" ? (
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                    <FaGithub className="size-4 text-slate-900 transition-transform duration-200 group-hover:scale-110 dark:text-white" />
                )}
                <span>GitHub</span>
            </button>
        </div>
    )
}

export default SocialSign