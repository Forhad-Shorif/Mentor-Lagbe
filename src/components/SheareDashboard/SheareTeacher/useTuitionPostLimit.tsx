"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/lib/utils/toast";

interface PostCountResponse {
  postCount?: number;
  hasActivePlan?: boolean;
  canPostMore?: boolean;
  freeLimit?: number;
}

// হিন্ট: open redirect ঠেকাতে শুধু "/" দিয়ে শুরু হওয়া নিরাপদ return path বের করা হচ্ছে।
// হিন্ট: পেমেন্ট বা প্ল্যান পেজ থেকে ফেরার পর যেন ভুল বা বাইরের লিংকে না যায়।
// হিন্ট: pathname ও searchParams যাচাই করে safe relative path ফেরত দেয়।
function getSafeReturnPath(pathname: string, search: string): string {
  const full = search ? `${pathname}?${search}` : pathname;
  if (!full.startsWith("/") || full.startsWith("//")) return "/";
  return full;
}

// হিন্ট: টিচারের পোস্ট সংখ্যা ও active plan যাচাই করে প্রয়োজনে Pricing পেজে পাঠানোর hook।
// হিন্ট: ফর্মের বাটন disable না রেখে ক্লিক/সাবমিটের সময় ২টি ফ্রি পোস্টের সীমা চেক করতে।
// হিন্ট: /GetPostCount/:email চেক করে সীমা শেষ হলে returnTo সহ /pricing-এ পাঠায়।
export function useTuitionPostLimit() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checkingLimit, setCheckingLimit] = useState(false);

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const currentReturnTo = getSafeReturnPath(pathname, searchParams.toString());
  const pricingRedirectUrl = `/pricing?returnTo=${encodeURIComponent(
    currentReturnTo
  )}`;

  const redirectToPricing = useCallback(
    (msg?: string) => {
      showToast.info(
        msg || "আপনার ফ্রি ২টি Post সীমা শেষ। প্ল্যান নিতে Pricing পেজে যাওয়া হচ্ছে..."
      );
      router.push(pricingRedirectUrl);
    },
    [pricingRedirectUrl, router]
  );

  const checkCanPostTuition = useCallback(
    async (email?: string): Promise<boolean> => {
      if (!email) return true;

      setCheckingLimit(true);
      try {
        const res = await fetch(
          `${backendUrl}/GetPostCount/${encodeURIComponent(email)}`,
          { cache: "no-store" }
        );
        if (!res.ok) return true;

        const data = (await res.json()) as PostCountResponse;
        const limit = data.freeLimit ?? 2;
        const count = data.postCount ?? 0;
        const canPost =
          typeof data.canPostMore === "boolean"
            ? data.canPostMore
            : Boolean(data.hasActivePlan) || count < limit;

        if (!canPost) {
          redirectToPricing(
            `আপনার ফ্রি ${limit}টি Post সীমা শেষ। প্ল্যান নিতে Pricing পেজে যাওয়া হচ্ছে...`
          );
          return false;
        }

        return true;
      } catch {
        // নেটওয়ার্ক/endpoint সমস্যা হলে ব্যাকএন্ডে সাবমিটের সময় যাচাই হবে
        return true;
      } finally {
        setCheckingLimit(false);
      }
    },
    [backendUrl, redirectToPricing]
  );

  return {
    checkingLimit,
    currentReturnTo,
    checkCanPostTuition,
    redirectToPricing,
  };
}