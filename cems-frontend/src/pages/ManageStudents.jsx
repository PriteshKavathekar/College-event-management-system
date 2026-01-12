import { useEffect, useState } from "react";
import {
  getAllStudents,
  deleteStudent,
  updateStudentProfile,
} from "../services/apiService";

const ManageStudents = () => {
  //  Role protection
  const role = localStorage.getItem("role");
  if (role !== "COORDINATOR") {
    return (
      <div className="text-light">
        <h4>Unauthorized</h4>
      </div>
    );
  }

  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await getAllStudents();
    setStudents(data);
  };

  const handleUpdate = async () => {
    await updateStudentProfile(editing.id, {
      name: editing.name,
      department: editing.department,
      year: editing.year,
      gender: editing.gender,
      mobile: editing.mobile,
    });

    setEditing(null);
    loadStudents();
  };

  return (
    <div className="card bg-secondary text-light p-4">
      <h4 className="mb-3">Manage Students</h4>

      {/* ===== EDIT FORM ===== */}
      {editing && (
        <div className="card bg-dark p-3 mb-4">
          <h5>Edit Student</h5>

          <div className="row g-2">
            <div className="col-md-6">
              <label>Name</label>
              <input
                className="form-control"
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label>Department</label>
              <input
                className="form-control"
                value={editing.department}
                onChange={(e) =>
                  setEditing({ ...editing, department: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label>Year</label>
              <input
                className="form-control"
                value={editing.year}
                onChange={(e) =>
                  setEditing({ ...editing, year: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label>Gender</label>
              <input
                className="form-control"
                value={editing.gender}
                onChange={(e) =>
                  setEditing({ ...editing, gender: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label>Mobile</label>
              <input
                className="form-control"
                value={editing.mobile}
                onChange={(e) =>
                  setEditing({ ...editing, mobile: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={handleUpdate}>
              Save Changes
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ===== STUDENT TABLE ===== */}
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>PRN</th>
            <th>Department</th>
            <th>Year</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.studentPrn}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>
              <td>{s.gender}</td>
              <td>{s.email}</td>
              <td>{s.mobile}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditing(s)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteStudent(s.id).then(loadStudents)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {students.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
