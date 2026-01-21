import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Sidebar({ title, links }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* TOP */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-8 tracking-wide">
          {title}
        </h2>

        <nav className="space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="mt-auto p-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium
                     text-red-400 hover:bg-red-500/10 hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
