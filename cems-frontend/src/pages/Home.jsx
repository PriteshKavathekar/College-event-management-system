import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col md:flex-row">

        {/* LEFT CONTENT */}
        <div className="md:w-1/2 flex flex-col justify-center px-12 py-10">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            College Event Management System
          </h1>

          <p className="text-gray-400 mb-6 leading-relaxed">
            A centralized platform designed to simplify college event
            planning, registration, and management for students,
            coordinators, and administrators.
          </p>

          <ul className="space-y-3 text-gray-300">
            <li>✔ Discover & Register for Events</li>
            <li>✔ Manage Events Seamlessly</li>
            <li>✔ Admin Controlled System</li>
          </ul>
        </div>

        {/* RIGHT - GET STARTED */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-800">
          <div className="bg-gray-900 p-10 rounded-lg w-96 shadow-xl">
            <h2 className="text-2xl mb-3 text-center font-semibold">
              Get Started
            </h2>

            <p className="text-gray-400 text-sm text-center mb-6">
              Student login to explore and register for events
            </p>

            <button
              onClick={() => navigate("/login/student")}
              className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-medium"
            >
              Student Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
