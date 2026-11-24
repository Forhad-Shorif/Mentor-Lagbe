// হিন্ট (কী): এই ফাইলটি শুধু সার্ভার সাইডে চলবে—এমন একটি guard import যুক্ত করা হয়েছে।
// হিন্ট (কেন): STRIPE_SECRET_KEY একটি গোপন সার্ভার key; ভুল করেও কোনো Client Component-এ যেন এটি ব্যবহার না হয়।
// হিন্ট (কীভাবে): Next.js-এর 'server-only' প্যাকেজ client bundle-এ এই ফাইল ঢুকলে build/compile পর্যায়েই সতর্কতা বা error দেয়।
import "server-only";

import Stripe from "stripe";

// হিন্ট (কী): এনভায়রনমেন্ট ভেরিয়েবল থেকে Stripe Secret Key নেওয়া হচ্ছে।
// হিন্ট (কেন): key না থাকলে বা খালি থাকলে পরবর্তীতে অস্পষ্ট error পাওয়ার চেয়ে শুরুতেই পরিষ্কার বার্তা পাওয়া ভালো।
// হিন্ট (কীভাবে): process.env.STRIPE_SECRET_KEY পড়ে যাচাই করা হচ্ছে যে সেটি আছে কি না।
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
}

// হিন্ট (কী): Next.js dev mode-এ hot reload-এর সময় বারবার নতুন Stripe client তৈরি হওয়া আটকানো হচ্ছে।
// হিন্ট (কেন): অপ্রয়োজনীয় একাধিক instance তৈরি না করে একটি পরিষ্কার instance পুনরায় ব্যবহার করা যায়।
// হিন্ট (কীভাবে): globalThis-এ একটি cache property রেখে আগে থেকে তৈরি stripe instance থাকলে সেটাই ফেরত দেওয়া হচ্ছে।
const globalForStripe = globalThis as unknown as { stripeClient?: Stripe };

// হিন্ট (কী): সার্ভারজুড়ে ব্যবহারের জন্য মূল `stripe` instance export করা হচ্ছে।
// হিন্ট (কেন): checkout_session বা payment verify রাউটগুলো যেন একইভাবে Stripe API কল করতে পারে।
// হিন্ট (কীভাবে): new Stripe(stripeSecretKey) দিয়ে instance বানিয়ে export করা হয়েছে।
export const stripe = globalForStripe.stripeClient ?? new Stripe(stripeSecretKey);

if (process.env.NODE_ENV !== "production") {
  globalForStripe.stripeClient = stripe;
}