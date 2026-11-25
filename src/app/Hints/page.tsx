// ============================================================================
// হিন্ট: এই ফাইলটি কোথাও import বা link করা হয় না।
// ============================================================================
// হিন্ট (কী): পেমেন্ট ফ্লো বোঝার সব বাংলা হিন্ট আসল কোডের ভেতরেই কমেন্ট আকারে
//   লেখা আছে — আলাদা করে কোনো কম্পোনেন্ট import করার দরকার নেই।
//
// হিন্ট (কেন): কোড পড়ার সময় ঠিক যে লাইনে কাজ হচ্ছে, তার পাশেই ব্যাখ্যা থাকলে
//   বোঝা সহজ হয়; আলাদা পেজে রাখলে খুঁজে বের করতে হয়।
//
// হিন্ট: হিন্টগুলো এখানে খুঁজে পাবে —
//   · src/app/(home)/pricing/page.tsx              → ধাপ ১ (প্ল্যান বাছাই)
//   · src/app/api/checkout_sessions/route.ts       → ধাপ ২ (Stripe session তৈরি)
//   · src/app/(home)/success/page.tsx              → ধাপ ৪ (Stripe থেকে ফেরা + VerifyPayment)
//   · src/app/payment/success/page.tsx             → বিকল্প/পুরনো success পেজ
//   · src/app/dashboard/students/page.tsx          → Pro স্ট্যাটাস ও Free লিমিট
//   · src/app/dashboard/teachers/page.tsx          → রশিদ কার্ড
//   · src/app/dashboard/teachers/profile-setting/page.tsx → Teacher Pro প্ল্যান কার্ড
//   · src/app/dashboard/admin/payments/page.tsx    → অ্যাডমিন পেমেন্ট কন্ট্রোল
//   · src/components/Payments/*.tsx                → বাটন, pending রেকর্ড, redirect
//   · backend (assignment-9-bk/index.js)           → /PaymentPending, /VerifyPayment,
//                                                    /GetPlanStatus, /GetReceipts,
//                                                    /AdminViewPayments, সিঙ্ক লজিক
// ============================================================================

export default function HintsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-slate-700 dark:text-slate-300">
      <h1 className="text-2xl font-black text-slate-900 dark:text-white">
        হিন্ট কোথায় আছে?
      </h1>
      <p className="mt-3">
        পেমেন্ট ফ্লো বোঝার বাংলা হিন্টগুলো সরাসরি সংশ্লিষ্ট{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">
          page.tsx
        </code>{" "}
        ফাইলগুলোর ভেতরে কমেন্ট আকারে লেখা আছে। এই পেজটি কোথাও লিংক করা নেই — শুধু
        রেফারেন্সের জন্য রাখা।
      </p>
    </main>
  );
}
