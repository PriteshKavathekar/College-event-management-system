import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { studentLogin , userLogin} from "../services/apiService";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.info("Enter email and password");
      return;
    }

    try {
      let data;

      if (role === "STUDENT") {
        data = await studentLogin({ email, password });
        localStorage.setItem("role", "STUDENT");
        localStorage.setItem("studentId", data.id);
      } else {
        data = await userLogin({ email, password });
        localStorage.setItem("role", data.role);
      }

      navigate("/dashboard");
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
      <ToastContainer />

      <div className="card p-4" style={{ width: "380px" }}>
        <h4 className="text-center mb-3">CEMS Login</h4>

        <form onSubmit={handleSubmit}>
          <select
            className="form-select mb-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="COORDINATOR">Coordinator</option>
            <option value="ADMIN">Admin</option>
          </select>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="College email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {role === "STUDENT" && (
            <p
              className="text-primary text-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              New student? Register
            </p>
          )}

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
