import { motion } from "framer-motion";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CoordinatorHeader from "../../components/CoordinatorHeader";
import CoordinatorFooter from "../../components/CoordinatorFooter";
import UserProfileCard from "../../components/UserProfileCard";

const navItem = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function CoordinatorDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("userName") || "Coordinator";
  const department = localStorage.getItem("department") || "Department";
  const role = localStorage.getItem("role") || "COORDINATOR";

  const handleLogout = () => {
    toast.info(
      ({ closeToast }) => (
        <div className="space-y-3">
          <p className="font-medium text-gray-100">
            Are you sure you want to logout?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                localStorage.clear();
                toast.dismiss();
                toast.success("Logged out successfully");
                navigate("/");
              }}
              className="px-4 py-1.5 rounded bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Logout
            </button>

            <button
              onClick={closeToast}
              className="px-4 py-1.5 rounded bg-gray-600 text-white text-sm hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      },
    );
  };

  return (
    // ROOT MUST BE flex-col
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* HEADER */}
      <CoordinatorHeader />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
          {/* USER PROFILE */}
          <UserProfileCard />

          <motion.nav
            initial="hidden"
            animate="visible"
            className="space-y-3 flex-1"
          >
            {[
              { to: "/coordinator/students", label: "Students" },
              { to: "/coordinator/add-event", label: "Add Event" },
              { to: "/coordinator/events", label: "Events" },
            ].map((item, i) => (
              <motion.div
                key={item.to}
                variants={navItem}
                transition={{ delay: i * 0.08 }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg text-sm font-medium
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-300 hover:bg-gray-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>

          {/* LOGOUT */}
          <div className="pt-6 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium
                         text-red-400 hover:bg-red-500/10 hover:text-red-500 transition"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}
      <CoordinatorFooter />
    </div>
  );
}
