import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerStudent } from "../services/ApiService";

export default function StudentRegister() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    studentPrn: "",
    department: "",
    year: "",
    gender: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student.email || !student.password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      const formData = new FormData();

      // FORMAT DATA BEFORE SENDING (FRONTEND ONLY)
      const formattedStudent = {
        ...student,

        // UPPERCASE ONLY THESE FIELDS
        name: student.name.trim().toUpperCase(),
        department: student.department.trim().toUpperCase(),
        year: student.year.trim().toUpperCase(),
        gender: student.gender.trim().toUpperCase(),

        // KEEP THESE AS-IS
        studentPrn: student.studentPrn.trim(),
        email: student.email.trim(),
        mobile: student.mobile.trim(),
        password: student.password,
      };

      // send formatted student JSON
      formData.append("student", JSON.stringify(formattedStudent));

      // send image only if selected
      if (image) {
        formData.append("image", image);
      }

      await registerStudent(formData);

      toast.success("Student registered successfully ✅");

      setTimeout(() => {
        navigate("/login/student");
      }, 1200);
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      toast.error(error.response?.data || "Registration failed ❌");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-900 p-8 rounded-xl border border-gray-800">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Student Registration
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {/* IMAGE UPLOAD */}
        <div className="flex flex-col items-center mb-4">
          <div
            onClick={() => document.getElementById("imageInput").click()}
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700 cursor-pointer"
          >
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
                Upload
              </div>
            )}
          </div>

          <input
            id="imageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <input
          name="name"
          value={student.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
        />
        <input
          name="studentPrn"
          value={student.studentPrn}
          onChange={handleChange}
          placeholder="Student PRN"
          className="input"
        />
        <input
          name="department"
          value={student.department}
          onChange={handleChange}
          placeholder="Department"
          className="input"
        />
        <input
          name="year"
          value={student.year}
          onChange={handleChange}
          placeholder="Year"
          className="input"
        />
        <input
          name="gender"
          value={student.gender}
          onChange={handleChange}
          placeholder="Gender"
          className="input"
        />
        <input
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />
        <input
          name="mobile"
          value={student.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="input"
        />
        <input
          name="password"
          type="password"
          value={student.password}
          onChange={handleChange}
          placeholder="Password"
          className="input"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
}
