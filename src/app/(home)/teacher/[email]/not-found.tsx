import NotFoundState from "@/components/SheareUI/NotFoundState";

export default function TeacherNotFound() {
  return (
    <NotFoundState
      eyebrow="Teacher 404"
      title="This teacher profile was not found"
      description="The mentor link may be outdated or the profile was removed. You can still browse active tuitions and find another verified tutor."
      homeHref="/browsetuitions"
      homeLabel="Browse tuitions"
      browseHref="/"
      browseLabel="Back to home"
      links={[
        {
          label: "Browse active tuitions",
          href: "/browsetuitions",
          description: "Find another verified tutor",
        },
        {
          label: "Student dashboard",
          href: "/dashboard/students",
          description: "Track your applications and saved posts",
        },
        {
          label: "Pricing",
          href: "/pricing",
          description: "Compare student and tutor plans",
        },
        {
          label: "Home",
          href: "/",
          description: "Back to the MentorLagbe landing page",
        },
      ]}
    />
  );
}
