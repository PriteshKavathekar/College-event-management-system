import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { registerStudent } from "../services/apiService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    studentPrn: "",
    department: "",
    year: "",
    gender: "",
    email: "",
    mobile: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerStudent(form);
      toast.success("Registration successful");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
      <ToastContainer />

      <div className="card p-4" style={{ width: "800px" }}>
        <h4 className="text-center mb-3">Student Registration</h4>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input className="form-control" name="name" placeholder="Full Name" onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <input className="form-control" name="studentPrn" placeholder="PRN" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <input className="form-control" name="department" placeholder="Department" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <input className="form-control" name="year" placeholder="Year" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <select className="form-select" name="gender" onChange={handleChange}>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="col-md-6">
            <input className="form-control" name="email" placeholder="College Email" onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <input className="form-control" name="mobile" placeholder="Mobile Number" onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} />
          </div>

          <div className="col-12">
            <button className="btn btn-primary w-100">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
