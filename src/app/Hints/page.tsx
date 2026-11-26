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

// ============================================================================
// ডেমো টিচার অ্যাকাউন্ট (লগইন করে চেক করার জন্য)
// ============================================================================
// এই ৪টি অ্যাকাউন্ট BetterAuth-এ role = "teachers" দিয়ে তৈরি করা হয়েছে।
// প্রতিটি অ্যাকাউন্টের জন্য আছে:
//   · bio            → backend `Bio` কালেকশন (PATCH /SaveBio/:email)
//   · user profile   → backend `Profile` কালেকশন (POST /UserProfiles)
//   · teacher profile→ backend `Teacher-Address` কালেকশন (POST /TeachersProfile)
//   · ২টি tuition    → backend `Tuitions` কালেকশন (POST /TuitionsPost)
// সব ছবি ImgBB-তে আপলোড করা (portrait, tuition cover + logo)।
//
// নিচের ইমেইল + পাসওয়ার্ড দিয়ে /sign-in থেকে লগইন করে
// /dashboard/teachers, /profile এবং /dashboard/teachers/tuitions দেখা যাবে।
// ============================================================================

interface DemoTeacher {
  name: string;
  email: string;
  password: string;
  userId: string;
  subject: string;
  portrait: string;
  tuitions: { id: string; title: string }[];
}

const demoTeachers: DemoTeacher[] = [
  {
    name: "Badhon Hossain",
    email: "badhon.teacher@gmail.com",
    password: "Badhon@1234",
    userId: "6b07bb88aa68058612f7fa8f",
    subject: "Mathematics & Physics",
    portrait: "https://i.ibb.co/C5w3w63x/badhon-portrait.jpg",
    tuitions: [
      { id: "6b07bb8b93261c7b48a721e0", title: "HSC Higher Mathematics Crash Course" },
      { id: "6b07bb8c93261c7b48a721e1", title: "Physics for SSC & HSC — Concept First" },
    ],
  },
  {
    name: "Munna Ahmed",
    email: "munna.teacher@gmail.com",
    password: "Munna@1234",
    userId: "6b07bb8eaa68058612f7fa92",
    subject: "English & IELTS",
    portrait: "https://i.ibb.co/n8YtF95N/munna-portrait.jpg",
    tuitions: [
      { id: "6b07bb9093261c7b48a721e4", title: "IELTS Academic Preparation — Band 7+ Batch" },
      { id: "6b07bb9293261c7b48a721e5", title: "Spoken English & Grammar for Class 6-8" },
    ],
  },
  {
    name: "Jahid Hasan",
    email: "jahid.teacher@gmail.com",
    password: "Jahid@1234",
    userId: "6b07bb93aa68058612f7fa95",
    subject: "ICT & Web Development",
    portrait: "https://i.ibb.co/Z36sD8v/jahid-portrait.jpg",
    tuitions: [
      { id: "6b07bb9593261c7b48a721e8", title: "HSC ICT — Full Syllabus with Practical" },
      { id: "6b07bb9793261c7b48a721e9", title: "Full-Stack Web Development Bootcamp (React + Node)" },
    ],
  },
  {
    name: "Didar Islam",
    email: "didar.teacher@gmail.com",
    password: "Didar@1234",
    userId: "6b07bb99aa68058612f7fa98",
    subject: "Chemistry & Biology",
    portrait: "https://i.ibb.co/ksKVhgnK/didar-portrait.jpg",
    tuitions: [
      { id: "6b07bb9b93261c7b48a721ec", title: "HSC Chemistry — Organic & Inorganic Mastery" },
      { id: "6b07bb9d93261c7b48a721ed", title: "Medical Admission Biology & Chemistry" },
    ],
  },
];

export default function HintsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-sm leading-7 text-slate-700 dark:text-slate-300">
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

      {/* ------------------------------------------------------------------ */}
      {/* ডেমো টিচার অ্যাকাউন্ট — লগইন করে চেক করার জন্য                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              ডেমো টিচার অ্যাকাউন্ট
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              ৪টি অ্যাকাউন্ট — প্রতিটিতে bio, user profile, teacher profile এবং ২টি
              tuition (ছবি সহ) তৈরি করা আছে।
            </p>
          </div>

          <a
            href="/sign-in"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-teal-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            Sign in পেজ খুলুন
          </a>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {demoTeachers.map((teacher) => {
            const profileHref = `/teacher/${encodeURIComponent(teacher.email)}`;

            return (
              <article
                key={teacher.email}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500" />

                <div className="space-y-4 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={teacher.portrait}
                      alt={teacher.name}
                      className="h-14 w-14 shrink-0 rounded-2xl border border-slate-200 object-cover ring-4 ring-slate-100 dark:border-slate-700 dark:ring-slate-900"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-extrabold text-slate-900 dark:text-white">
                        {teacher.name}
                      </h3>
                      <p className="text-xs font-medium text-cyan-700 dark:text-cyan-400">
                        {teacher.subject}
                      </p>
                      <span className="mt-1 inline-flex rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-300">
                        role: teachers
                      </span>
                    </div>
                  </div>

                  <dl className="space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Email
                      </dt>
                      <dd className="min-w-0 break-all text-right text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {teacher.email}
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Password
                      </dt>
                      <dd className="text-right">
                        <code className="rounded bg-slate-900 px-2 py-0.5 text-xs font-bold text-cyan-300 dark:bg-slate-800">
                          {teacher.password}
                        </code>
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        User ID
                      </dt>
                      <dd className="break-all text-right font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {teacher.userId}
                      </dd>
                    </div>
                  </dl>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Tuitions (২টি)
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {teacher.tuitions.map((tuition) => (
                        <li key={tuition.id}>
                          <a
                            href={`/view/${tuition.id}`}
                            className="block rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-cyan-500/40 dark:hover:text-cyan-300"
                          >
                            {tuition.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={profileHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/35 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-800 transition hover:bg-cyan-500/20 dark:border-cyan-400/30 dark:text-cyan-200"
                  >
                    Public profile দেখুন
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-4 rounded-xl border border-amber-300/70 bg-amber-50 px-3.5 py-2.5 text-xs font-medium text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-200">
          লগইন করার পর ড্যাশবোর্ড:{" "}
          <code className="rounded bg-white/70 px-1 py-0.5 text-[11px] dark:bg-slate-900/60">
            /dashboard/teachers
          </code>{" "}
          · প্রোফাইল:{" "}
          <code className="rounded bg-white/70 px-1 py-0.5 text-[11px] dark:bg-slate-900/60">
            /profile
          </code>{" "}
          · আমার টিউশন:{" "}
          <code className="rounded bg-white/70 px-1 py-0.5 text-[11px] dark:bg-slate-900/60">
            /dashboard/teachers/tuitions
          </code>
        </p>
      </section>
    </main>
  );
}
