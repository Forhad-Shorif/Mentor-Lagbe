import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

// হিন্ট (কী): Student ও Teacher-এর ১ মাস (30 দিন) ও ৩ মাস (90 দিন)-এর ৪টি প্ল্যানের তথ্য এক জায়গায় রাখা হয়েছে।
// হিন্ট (কেন): আগে Price ID hardcoded ছিল; এভাবে ম্যাপ করলে যেকোনো প্ল্যানের জন্য আলাদা রাউট বানাতে হবে না।
// হিন্ট (কীভাবে): planKey দিয়ে PRICE_MAP থেকে সঠিক priceId, role ও durationDays খুঁজে নেওয়া হবে।
const PRICE_MAP: Record<
  string,
  { priceId: string; role: "student" | "teacher"; days: number }
> = {
  student_1m: {
    priceId:
      process.env.STRIPE_PRICE_STUDENT_1M || "",
    role: "student",
    days: 30,
  },
  student_3m: {
    priceId: process.env.STRIPE_PRICE_STUDENT_3M || "",
    role: "student",
    days: 90,
  },
  teacher_1m: {
    priceId: process.env.STRIPE_PRICE_TEACHER_1M || "",
    role: "teacher",
    days: 30,
  },
  teacher_3m: {
    priceId: process.env.STRIPE_PRICE_TEACHER_3M || "",
    role: "teacher",
    days: 90,
  },
};

// হিন্ট (কী): ইউজার যে পেজ থেকে এসেছিল (returnTo), সেটি নিরাপদ কি না তা যাচাই করার helper।
// হিন্ট (কেন): কেউ যদি বাইরে বা ক্ষতিকর URL (যেমন https://evil.com বা //evil.com) পাঠায়, তাহলে open redirect ঠেকাতে হবে।
// হিন্ট (কীভাবে): শুধু "/" দিয়ে শুরু হওয়া এবং "//" দিয়ে শুরু না হওয়া internal path-কেই অনুমতি দেওয়া হয়েছে; নইলে "/" ফেরত যাবে।
function sanitizeReturnTo(raw: unknown): string {
  if (typeof raw !== "string") return "/";
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return "/";
  return trimmed;
}

export async function POST(req: NextRequest) {
  try {
    // হিন্ট (কী): রিকোয়েস্টের header থেকে বর্তমান অ্যাপের origin (যেমন http://localhost:3000) নেওয়া হচ্ছে।
    // হিন্ট (কেন): success_url ও cancel_url বানাতে অ্যাপের base URL দরকার, আর origin null এলে লিংক ভেঙে যেতে পারে।
    // হিন্ট (কীভাবে): origin না পেলে NEXT_PUBLIC_APP_URL বা localhost:3000 fallback হিসেবে ব্যবহার করা হচ্ছে।
    const headersList = await headers();
    const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL 

    // হিন্ট (কী): ফ্রন্টএন্ড থেকে পাঠানো JSON body থেকে planKey, returnTo ও ইউজারের তথ্য পড়া হচ্ছে।
    // হিন্ট (কেন): খালি বা ভুল JSON এলে যেন সার্ভার crash না করে, তাই আলাদা try/catch রাখা হয়েছে।
    // হিন্ট (কীভাবে): req.json() সফল হলে body-তে মান বসবে, না হলে খালি {} অবজেক্ট ধরে default মান ব্যবহার হবে।
    let body: {
      planKey?: string;
      returnTo?: string;
      email?: string;
      name?: string;
      image?: string;
      role?: string;
    } = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    // হিন্ট (কী): কোন প্ল্যান কেনা হচ্ছে তা ঠিক করে তার Price ID ও প্ল্যান কনফিগ বের করা হচ্ছে।
    // হিন্ট (কেন): Price ID না থাকলে Stripe কল করলে error আসবে—তাই আগেই 400 status দিয়ে আটকে দেওয়া ভালো।
    // হিন্ট (কীভাবে): planKey দিয়ে PRICE_MAP চেক করে selectedPlan বা priceId না পেলে JSON error ফেরত দেওয়া হচ্ছে।
    const planKey = body.planKey || "student_1m";
    const selectedPlan = PRICE_MAP[planKey];

    if (!selectedPlan || !selectedPlan.priceId) {
      return NextResponse.json(
        { error: "Invalid or unconfigured plan price ID" },
        { status: 400 }
      );
    }

    // হিন্ট (কী): safeReturnTo-কে URL query parameter-এ বসানোর উপযোগী (encoded) করা হচ্ছে।
    // হিন্ট (কেন): returnTo-এর ভেতরে "/pricing?tab=1" বা query string থাকলে সরাসরি বসালে URL নষ্ট হতে পারে।
    // হিন্ট (কীভাবে): encodeURIComponent দিয়ে safeReturnTo এনকোড করে success_url ও cancel_url-এ যুক্ত করা হচ্ছে।
    const safeReturnTo = sanitizeReturnTo(body.returnTo);
    const encodedReturnTo = encodeURIComponent(safeReturnTo);

    // হিন্ট (কী): Stripe Checkout-এ যাওয়ার আগেই ব্যাকএন্ডে payment: false দিয়ে একটি pending রেকর্ড পাঠানো হচ্ছে।
    // হিন্ট (কেন): ইউজার Stripe পেজে গিয়ে পেমেন্ট না করে ব্যাক করলে যেন রেকর্ডটি payment: false হিসেবে থেকে যায়।
    // হিন্ট (কীভাবে): email থাকলে /PaymentPending endpoint-এ POST করা হচ্ছে; ব্যাকএন্ড ডাউন থাকলেও .catch(() => null) দিয়ে মূল flow আটকানো হচ্ছে না।
    const backendUrl = process.env.NEXT_PUBLIC_API_URL

    if (body.email) {
      await fetch(`${backendUrl}/PaymentPending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: body.email,
          name: body.name || "",
          image: body.image || "",
          role: body.role || selectedPlan.role,
          planKey,
          durationDays: selectedPlan.days,
          payment: false,
          status: "pending",
          returnTo: safeReturnTo,
          createdAt: new Date().toISOString(),
        }),
      }).catch(() => null);
    }

    // হিন্ট (কী): Price ID-এর amount যাচাই করা হচ্ছে।
    // হিন্ট (কেন): amount 0 হলে Stripe কার্ড ফর্ম দেখায় না, ইউজার বিভ্রান্ত হয়।
    // হিন্ট (কীভাবে): unit_amount না থাকলে বা 0 হলে পরিষ্কার error ফেরত দেওয়া হচ্ছে।
    const price = await stripe.prices.retrieve(selectedPlan.priceId);

    if (!price.unit_amount || price.unit_amount <= 0) {
      return NextResponse.json(
        {
          error:
            "This plan is misconfigured (amount is 0). Please contact support.",
        },
        { status: 500 }
      );
    }

    // হিন্ট (কী): Stripe-এর hosted Checkout Session তৈরি করা হচ্ছে।
    // হিন্ট (কেন): কার্ডের তথ্য নিরাপদে Stripe হ্যান্ডল করে এবং metadata-তে প্ল্যান ও ইউজারের তথ্য থাকলে পেমেন্ট শেষে যাচাই করা সহজ হয়।
    // হিন্ট (কীভাবে): line_items-এ priceId দিয়ে session বানানো হচ্ছে; সফল হলে /success-এ ও বাতিল হলে /pricing-এ returnTo সহ পাঠানো হচ্ছে।
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: body.email || undefined,
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      metadata: {
        planKey,
        role: selectedPlan.role,
        durationDays: String(selectedPlan.days),
        email: body.email || "",
        name: body.name || "",
        image: body.image || "",
        returnTo: safeReturnTo,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&returnTo=${encodedReturnTo}`,
      cancel_url: `${origin}/pricing?returnTo=${encodedReturnTo}&canceled=1`,
    });

    // হিন্ট (কী): Stripe থেকে session.url এসেছে কি না তা যাচাই করা হচ্ছে।
    // হিন্ট (কেন): কোনো কারণে url না এলে undefined-এ redirect বা frontend বিভ্রান্তি এড়াতে স্পষ্ট error দেওয়া দরকার।
    // হিন্ট (কীভাবে): !session.url হলে 500 JSON error ফেরত দেওয়া হচ্ছে।
    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe session URL was not generated" },
        { status: 500 }
      );
    }

    // হিন্ট (কী): ফ্রন্টএন্ডে JSON আকারে Stripe Checkout URL ও sessionId ফেরত পাঠানো হচ্ছে।
    // হিন্ট (কেন): ফ্রন্টএন্ড fetch() দিয়ে কল করলে data.url হাতে পেলে window.location.href দিয়ে সহজেই Stripe পেজে নিয়ে যাওয়া যায়।
    // হিন্ট (কীভাবে): status 200 সহ { url, sessionId } JSON পাঠানো হচ্ছে।
    return NextResponse.json(
      { url: session.url, sessionId: session.id },
      { status: 200 }
    );
  } catch (err) {
    // হিন্ট (কী): পুরো route-এর যেকোনো অপ্রত্যাশিত error ধরে সুন্দর JSON response দেওয়া হচ্ছে।
    // হিন্ট (কেন): error অবজেক্ট সবসময় Error instance না-ও হতে পারে, তাই নিরাপদে message বের করা জরুরি।
    // হিন্ট (কীভাবে): err instanceof Error চেক করে বার্তা নিয়ে status 500 সহ ফেরত দেওয়া হচ্ছে।
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}