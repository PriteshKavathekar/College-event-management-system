import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getEventRegisteredStudents,
  removeStudentFromEvent,
} from "../../services/ApiService";
import NotifySingleStudentModal from "../../components/NotifySingleStudentModal";

export default function EventStudents() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // LOAD REGISTERED STUDENTS
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await getEventRegisteredStudents(eventId);
        setStudents(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load registered students");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [eventId]);

  // REMOVE STUDENT FROM EVENT
  const handleRemove = async (studentId) => {
    if (!window.confirm("Remove student from this event?")) return;

    try {
      await removeStudentFromEvent(eventId, studentId);
      toast.success("Student removed from event");

      setStudents((prev) => prev.filter((s) => s.id !== studentId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove student");
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading students...</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Registered Students</h1>

        <button
          onClick={() => navigate("/coordinator/events")}
          className="text-sm text-blue-400 hover:text-blue-500"
        >
          ← Back to Events
        </button>
      </div>

      {/* EMPTY STATE */}
      {students.length === 0 ? (
        <p className="text-gray-400">
          No students registered for this event.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Student</th>
                <th className="px-6 py-4 text-left">PRN</th>
                <th className="px-6 py-4 text-left">Department</th>
                <th className="px-6 py-4 text-left">Year</th>
                <th className="px-6 py-4 text-left">Gender</th>
                <th className="px-6 py-4 text-left">Mobile</th>
                <th className="px-12 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-gray-800/60 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-100">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.email}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono text-xs text-gray-300">
                    {s.studentPrn}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {s.department}
                  </td>

                  <td className="px-6 py-4 text-gray-300">{s.year}</td>

                  <td className="px-6 py-4 text-gray-300">{s.gender}</td>

                  <td className="px-6 py-4 text-gray-300">{s.mobile}</td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-4">
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="text-purple-400 hover:text-purple-500 font-medium"
                      >
                        Notify
                      </button>

                      <button
                        onClick={() => handleRemove(s.id)}
                        className="text-red-400 hover:text-red-500 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* NOTIFY MODAL */}
      {selectedStudent && (
        <NotifySingleStudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
