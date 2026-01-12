import { useEffect, useState } from "react";
import { getStudentProfile, updateStudentProfile } from "../services/apiService";

const StudentProfile = () => {
  const studentId = localStorage.getItem("studentId");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getStudentProfile(studentId).then(setProfile);
  }, []);

  if (!profile) return <p>Loading...</p>;

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();
    await updateStudentProfile(studentId, profile);
    alert("Profile updated");
  };

  return (
    <form onSubmit={update} className="card bg-secondary p-4 text-light">
      <h4>My Profile</h4>

      <input className="form-control mb-2" name="name" value={profile.name} onChange={handleChange} />
      <input className="form-control mb-2" value={profile.studentPrn} disabled />
      <input className="form-control mb-2" name="department" value={profile.department} onChange={handleChange} />
      <input className="form-control mb-2" name="year" value={profile.year} onChange={handleChange} />
      <input className="form-control mb-2" name="mobile" value={profile.mobile} onChange={handleChange} />

      <button className="btn btn-primary">Update</button>
    </form>
  );
};

export default StudentProfile;
