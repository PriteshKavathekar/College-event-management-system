import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import StudentProfile from "./StudentProfile";
import ManageStudents from "./ManageStudents";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const [params] = useSearchParams();
  const tab = params.get("tab");

  if (!role) {
    return (
      <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
        <h4>Please login first</h4>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Sidebar role={role} />

      <div className="flex-grow-1 p-4">
        <h3>Dashboard</h3>
        <p>Logged in as <b>{role}</b></p>

        {role === "STUDENT" && <StudentProfile />}

        {role === "COORDINATOR" && (
          <>
            {tab === "students" && <ManageStudents />}
            {!tab && (
              <div className="card bg-secondary text-light p-4">
                <h5>Coordinator Dashboard</h5>
                <p>Select an option from sidebar</p>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
