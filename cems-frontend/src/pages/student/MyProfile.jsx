import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getStudentProfile,
  updateStudentProfile,
} from "../../services/ApiService";

export default function MyProfile() {
  const studentId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [student, setStudent] = useState({
    name: "",
    studentPrn: "",
    department: "",
    year: "",
    gender: "",
    email: "",
    mobile: "",
    imageUrl: "",
  });

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const res = await getStudentProfile(studentId);
      setStudent(res.data);
    } catch (error) {
      console.error("FETCH PROFILE ERROR:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!studentId) {
      toast.error("Student ID not found");
      setLoading(false);
      return;
    }
    fetchProfile();
  }, [studentId]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE IMAGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImage(file);
    setPreview(previewUrl);
  };

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ================= UPDATE PROFILE =================
  const studentPayload = {
    name: student.name.trim().toUpperCase(),
    department: student.department.trim().toUpperCase(),
    year: student.year.trim().toUpperCase(),
    gender: student.gender.trim().toUpperCase(),

    // keep as-is
    email: student.email,
    studentPrn: student.studentPrn,
    mobile: student.mobile.trim(),
  };

  if (loading) {
    return <div className="p-10 text-gray-400">Loading...</div>;
  }

  // ================= UPDATE PROFILE =================
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      const studentPayload = {
        name: student.name.trim().toUpperCase(),
        department: student.department.trim().toUpperCase(),
        year: student.year.trim().toUpperCase(),
        gender: student.gender.trim().toUpperCase(),

        // keep as-is
        email: student.email,
        studentPrn: student.studentPrn,
        mobile: student.mobile.trim(),
      };

      // backend expects JSON
      formData.append("student", JSON.stringify(studentPayload));

      // attach image only if changed
      if (image) {
        formData.append("image", image);
      }

      await updateStudentProfile(studentId, formData);

      toast.success("Profile updated successfully ✅");

      // refresh profile
      fetchProfile();

      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);
      toast.error("Failed to update profile ❌");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-white border border-gray-700 px-4 py-2 rounded-lg"
        >
          ← Back
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT - IMAGE */}
        <div className="flex flex-col items-center">
          <div
            onClick={() => fileInputRef.current.click()}
            className="relative cursor-pointer"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800">
              {preview || student.imageUrl ? (
                <img
                  src={preview || student.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* RIGHT - FORM */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              name="name"
              value={student.name}
              onChange={handleChange}
            />

            <Input label="Student PRN" value={student.studentPrn} disabled />

            <Input
              label="Department"
              name="department"
              value={student.department}
              onChange={handleChange}
            />

            <Input
              label="Year"
              name="year"
              value={student.year}
              onChange={handleChange}
            />

            <Input
              label="Gender"
              name="gender"
              value={student.gender}
              onChange={handleChange}
            />

            <Input
              label="Mobile Number"
              name="mobile"
              value={student.mobile}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <Input label="Email" value={student.email} disabled />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="mt-8 bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Input ---------- */
function Input({ label, disabled, ...props }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        disabled={disabled}
        {...props}
        className={`w-full px-4 py-2 rounded-lg text-sm border 
          ${
            disabled
              ? "bg-gray-900 border-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 border-gray-700 focus:border-blue-500"
          }`}
      />
    </div>
  );
}
