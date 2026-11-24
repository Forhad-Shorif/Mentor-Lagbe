// Placeholder page — build pass korar jonno minimal export.

import PostTuitionForm from "@/components/SheareDashboard/SheareTeacher/PostTutions/PostTuition";

// Nije content likhe ei file ta replace koro.
export default function TeacherPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Post a Tuition</h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Ei page ta ekhono banano hoyni. Notun tuition post korar form ekhane
        thakbe.
      </p>
      <PostTuitionForm />
    </div>
  );
}
