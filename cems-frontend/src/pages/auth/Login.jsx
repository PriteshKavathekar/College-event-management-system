import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  studentLogin,
  adminCoordinatorLogin,
  getUserById,
} from "../../services/ApiService";

export default function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      // LOGIN
      const loginApi =
        role === "STUDENT" ? studentLogin : adminCoordinatorLogin;

      const loginRes = await loginApi({ email, password });

      const { id, role: userRole } = loginRes.data;

      // STORE BASIC INFO (IMMEDIATE)
      localStorage.setItem("userId", id);
      localStorage.setItem("role", userRole);

      //  THIS IS THE MOST IMPORTANT LINE
      localStorage.setItem("email", email);

      //  FETCH PROFILE ONLY FOR DISPLAY PURPOSE
      if (userRole !== "STUDENT") {
        const profileRes = await getUserById(id);

        localStorage.setItem("userName", profileRes.data.name || "");
        localStorage.setItem("department", profileRes.data.department || "");
      }

      toast.success(`${userRole} login successful`);

      // REDIRECT
      navigate(`/${userRole.toLowerCase()}`);
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {role} Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-gray-700 rounded outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-700 rounded outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-medium"
        >
          Login
        </button>

        {role === "STUDENT" && (
          <p className="text-sm text-center mt-4 text-gray-400">
            New student?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
