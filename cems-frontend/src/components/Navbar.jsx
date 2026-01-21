import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* LEFT - LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center font-bold text-lg">
            C
          </div>
          <span className="text-xl font-semibold tracking-wide">
            CEMS
          </span>
        </div>

        {/* CENTER - NAV LINKS */}
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <button
            onClick={() => navigate("/")}
            className="hover:text-white"
          >
            Home
          </button>
          <button className="hover:text-white">
            About
          </button>
          <button className="hover:text-white">
            Contact
          </button>
        </div>

        {/* RIGHT - ADMIN & COORDINATOR LOGIN */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login/coordinator")}
            className="text-sm border border-gray-600 px-4 py-1.5 rounded hover:bg-gray-800"
          >
            Coordinator Login
          </button>

          <button
            onClick={() => navigate("/login/admin")}
            className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded"
          >
            Admin Login
          </button>
        </div>

      </div>
    </nav>
  );
}
