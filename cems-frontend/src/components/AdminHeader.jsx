import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Admin";

  const handleLogout = () => {
    if (!window.confirm("Logout from admin panel?")) return;

    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">🛠 Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">
          {userName} (ADMIN)
        </span>

        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
