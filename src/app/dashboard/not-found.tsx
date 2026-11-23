import NotFoundState from "@/components/SheareUI/NotFoundState";

export default function DashboardNotFound() {
  return (
    <NotFoundState
      compact
      eyebrow="Dashboard 404"
      title="This dashboard page does not exist"
      description="The section you tried to open is not available for your account. Jump back to your dashboard home instead."
      homeHref="/dashboard"
      homeLabel="Dashboard home"
      browseHref="/browsetuitions"
      browseLabel="Browse tuitions"
      links={[
        {
          label: "Student dashboard",
          href: "/dashboard/students",
          description: "Applications, saved tuitions, profile",
        },
        {
          label: "Teacher dashboard",
          href: "/dashboard/teachers",
          description: "Tuitions, applicants, profile",
        },
        {
          label: "Admin dashboard",
          href: "/dashboard/admin",
          description: "Users, tuitions and payments",
        },
        {
          label: "Browse tuitions",
          href: "/browsetuitions",
          description: "Find an active tuition listing",
        },
      ]}
    />
  );
}
