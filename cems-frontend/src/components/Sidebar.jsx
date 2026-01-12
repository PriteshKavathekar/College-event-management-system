import { useNavigate } from "react-router-dom";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-black p-3" style={{ width: "230px" }}>
      <h5 className="text-primary mb-4">CEMS</h5>

      <ul className="nav flex-column gap-2">
        {role === "STUDENT" && (
          <li style={{ cursor: "pointer" }}>
            👤 My Profile
          </li>
        )}

        {role === "COORDINATOR" && (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard?tab=students")}
          >
            👥 Manage Students
          </li>
        )}

        <li
          className="text-danger mt-4"
          style={{ cursor: "pointer" }}
          onClick={logout}
        >
          🚪 Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
