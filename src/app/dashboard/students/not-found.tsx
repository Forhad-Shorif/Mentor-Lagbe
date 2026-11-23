import NotFoundState from "@/components/SheareUI/NotFoundState";

export default function StudentDashboardNotFound() {
  return (
    <NotFoundState
      compact
      eyebrow="Student 404"
      title="This student page is not available"
      description="The page may have moved. Use your student overview or browse active tuitions to continue."
      homeHref="/dashboard/students"
      homeLabel="Student overview"
      browseHref="/browsetuitions"
      browseLabel="Browse tuitions"
      links={[
        {
          label: "My applications",
          href: "/dashboard/students/application",
          description: "Track pending, accepted and rejected applications",
        },
        {
          label: "Saved tuitions",
          href: "/dashboard/students/saved",
          description: "Open your bookmarked tuitions",
        },
        {
          label: "Profile settings",
          href: "/dashboard/students/profile-setting",
          description: "Update your student profile",
        },
        {
          label: "Browse tuitions",
          href: "/browsetuitions",
          description: "Find a new tuition to apply for",
        },
      ]}
    />
  );
}
