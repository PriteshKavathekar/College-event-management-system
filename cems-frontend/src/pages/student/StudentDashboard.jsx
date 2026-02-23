import DashboardLayout from "../../components/DashboardLayout";
import StudentHeader from "../../components/StudentHeader";
import StudentFooter from "../../components/StudentFooter";

export default function StudentDashboard() {
  const studentLinks = [
    { label: "My Profile", path: "/student/profile" },
    { label: "Events", path: "/student/events" },
    { label: "My Registered Events", path: "/student/registered" },
  ];

  return (
    <DashboardLayout
      title="Student"
      links={studentLinks}
      HeaderComponent={StudentHeader}
      FooterComponent={StudentFooter}
    />
  );
}
