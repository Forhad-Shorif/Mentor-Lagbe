import NotFoundState from "@/components/SheareUI/NotFoundState";

export default function TeacherDashboardNotFound() {
  return (
    <NotFoundState
      compact
      eyebrow="Teacher 404"
      title="This teacher page is not available"
      description="The page may have moved. Use your teacher overview or open your tuition studio to continue."
      homeHref="/dashboard/teachers"
      homeLabel="Teacher overview"
      browseHref="/dashboard/teachers/tuitions"
      browseLabel="My tuitions"
      links={[
        {
          label: "My tuitions",
          href: "/dashboard/teachers/tuitions",
          description: "Edit, close or delete your posted tuitions",
        },
        {
          label: "Post a tuition",
          href: "/dashboard/teachers/post",
          description: "Create a new tuition listing",
        },
        {
          label: "Applicants",
          href: "/dashboard/teachers/applicants",
          description: "Accept or reject student applications",
        },
        {
          label: "Profile settings",
          href: "/dashboard/teachers/profile-setting",
          description: "Update your teacher profile",
        },
      ]}
    />
  );
}
