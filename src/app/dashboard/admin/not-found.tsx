import NotFoundState from "@/components/SheareUI/NotFoundState";

export default function AdminDashboardNotFound() {
  return (
    <NotFoundState
      compact
      eyebrow="Admin 404"
      title="This admin page is not available"
      description="The page may have moved. Use the admin overview to manage users, tuitions and payments."
      homeHref="/dashboard/admin"
      homeLabel="Admin overview"
      browseHref="/dashboard/admin/users"
      browseLabel="Manage users"
      links={[
        {
          label: "Users management",
          href: "/dashboard/admin/users",
          description: "Roles, payment flags, block and delete",
        },
        {
          label: "All tuitions",
          href: "/dashboard/admin/tuitions",
          description: "Approve, revoke or delete tuitions",
        },
        {
          label: "Payments",
          href: "/dashboard/admin/payments",
          description: "Review transactions and payment status",
        },
        {
          label: "Admin profile",
          href: "/dashboard/admin/profile-setting",
          description: "Admin bio and activity overview",
        },
      ]}
    />
  );
}
