import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCoordinators,
  deleteCoordinator,
  updateCoordinator,
  createCoordinator,
} from "../../services/ApiService";

export default function ManageCoordinators() {
  const [coordinators, setCoordinators] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
  });

  /* ================= LOAD ================= */
  const loadData = async () => {
    try {
      const res = await getCoordinators();
      setCoordinators(res.data);
    } catch {
      toast.error("Failed to load coordinators");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= CREATE ================= */
  const handleCreate = async () => {
    if (!form.name || !form.email || !form.department || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await createCoordinator({
        name: form.name.trim().toUpperCase(),
        email: form.email,
        department: form.department.trim().toUpperCase(),
        password: form.password,
      });

      toast.success("Coordinator created successfully");
      setShowCreate(false);
      setForm({ name: "", email: "", department: "", password: "" });
      loadData();
    } catch {
      toast.error("Failed to create coordinator");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coordinator?")) return;

    try {
      await deleteCoordinator(id);
      toast.success("Coordinator deleted");
      loadData();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    try {
      await updateCoordinator(selected.id, {
        name: selected.name.trim().toUpperCase(),
        department: selected.department.trim().toUpperCase(),
        email: selected.email,
      });

      toast.success("Coordinator updated");
      setSelected(null);
      loadData();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Coordinators</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium"
        >
          + Create Coordinator
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-10 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {coordinators.map((c) => (
              <tr key={c.id} className="hover:bg-gray-800/60">
                <td className="px-6 py-4">{c.name}</td>
                <td className="px-6 py-4">{c.email}</td>
                <td className="px-6 py-4">{c.department}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-8">
                    <button
                      onClick={() => setSelected({ ...c })}
                      className="text-blue-400 hover:text-blue-500 font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-400 hover:text-red-500 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {coordinators.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No coordinators found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== EDIT MODAL ===== */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">
              Update Coordinator
            </h2>

            <div className="space-y-3">
              <input
                value={selected.name}
                onChange={(e) =>
                  setSelected({ ...selected, name: e.target.value })
                }
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Name"
              />

              <input
                value={selected.department}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    department: e.target.value,
                  })
                }
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Department"
              />

              <input
                value={selected.email}
                disabled
                className="w-full p-2 bg-gray-900 rounded text-gray-500"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setSelected(null)}
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

      {/* ===== CREATE MODAL ===== */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">
              Create Coordinator
            </h2>

            <div className="space-y-3">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
              />

              <input
                name="department"
                placeholder="Department"
                value={form.department}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
