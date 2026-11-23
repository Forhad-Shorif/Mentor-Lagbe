import NotFoundState from "@/components/SheareUI/NotFoundState";

export default function TuitionNotFound() {
  return (
    <NotFoundState
      eyebrow="Tuition 404"
      title="This tuition is no longer listed"
      description="The tuition may have been removed or the link is incorrect. Browse the active tuitions to find a similar one."
      homeHref="/browsetuitions"
      homeLabel="Browse tuitions"
      browseHref="/"
      browseLabel="Back to home"
      links={[
        {
          label: "Browse active tuitions",
          href: "/browsetuitions",
          description: "See every open tuition listing",
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
