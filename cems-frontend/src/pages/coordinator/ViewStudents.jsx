import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllStudents,
  deleteStudent,
  updateStudentProfile,
} from "../../services/ApiService";
import NotifySingleStudentModal from "../../components/NotifySingleStudentModal";

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");

  // LOAD STUDENTS
  const loadStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // DELETE STUDENT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteStudent(id);
      toast.success("Student deleted");
      loadStudents();
    } catch {
      toast.error("Cannot delete student (registered in events)");
    }
  };

  // OPEN EDIT MODAL
  const openEdit = (student) => {
    setFormData({ ...student });
    setShowModal(true);
  };

  // HANDLE EDIT INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE STUDENT (UPPERCASE RULE)
  const handleUpdate = async () => {
    try {
      const fd = new FormData();

      const studentPayload = {
        name: formData.name.trim().toUpperCase(),
        department: formData.department.trim().toUpperCase(),
        year: formData.year.trim().toUpperCase(),
        gender: formData.gender.trim().toUpperCase(),

        mobile: formData.mobile.trim(),
        email: formData.email,
        studentPrn: formData.studentPrn,
      };

      fd.append(
        "student",
        new Blob([JSON.stringify(studentPayload)], {
          type: "application/json",
        })
      );

      await updateStudentProfile(formData.id, fd);

      toast.success("Student updated successfully");
      setShowModal(false);
      loadStudents();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // SEARCH (ANY FIELD)
  const filteredStudents = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.studentPrn?.toLowerCase().includes(q) ||
      s.department?.toLowerCase().includes(q) ||
      s.year?.toLowerCase().includes(q) ||
      s.gender?.toLowerCase().includes(q) ||
      s.mobile?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All Students</h1>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by any field..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800
                     border border-gray-700 text-gray-100
                     placeholder-gray-400 focus:outline-none
                     focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">PRN</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Year</th>
              <th className="px-6 py-4 text-left">Gender</th>
              <th className="px-6 py-4 text-left">Mobile</th>
              <th className="px-15 py-4 text-left ">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {filteredStudents.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-gray-800/60 transition-colors"
              >
                <td className="p-3">
                  <div>
                    <p className="font-medium text-gray-100">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </div>
                </td>

                <td className="px-6 py-4 font-mono text-xs text-gray-300">
                  {s.studentPrn}
                </td>
                <td className="px-6 py-4 text-gray-300">{s.department}</td>
                <td className="px-6 py-4 text-gray-300">{s.year}</td>
                <td className="px-6 py-4 text-gray-300">{s.gender}</td>
                <td className="px-6 py-4 text-gray-300">{s.mobile}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => openEdit(s)}
                      className="text-blue-400 hover:text-blue-500 font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="text-purple-400 hover:text-purple-500 font-medium"
                    >
                      Notify
                    </button>

                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-400 hover:text-red-500 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Update Student</h2>

            <div className="space-y-3">
              <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" />
              <input name="department" value={formData.department} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" />
              <input name="year" value={formData.year} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" />
              <input name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" />
              <input name="mobile" value={formData.mobile} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded" />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFY SINGLE STUDENT MODAL */}
      {selectedStudent && (
        <NotifySingleStudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
