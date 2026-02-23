import DashboardLayout from "../../components/DashboardLayout";

export default function AdminDashboard() {
  const adminLinks = [
    { label: "Students", path: "/admin/students" },
    { label: "Add Event", path: "/admin/add-event" },
    { label: "Events", path: "/admin/events" },
    { label: "Manage Coordinators", path: "/admin/coordinators" },
  ];

  return (
    <DashboardLayout
      title="Admin"
      links={adminLinks}
    />
  );
}
