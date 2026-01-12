const BASE_URL = "http://localhost:8080";

// STUDENT
export const registerStudent = async (data) => {
  const res = await fetch(`${BASE_URL}/api/students/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

export const studentLogin = async (data) => {
  const res = await fetch(`${BASE_URL}/api/students/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};

export const getStudentProfile = async (id) => {
  const res = await fetch(`${BASE_URL}/api/students/${id}`);
  if (!res.ok) throw new Error("Failed to load profile");
  return res.json();
};

export const updateStudentProfile = async (id, data) => {
  const res = await fetch(`${BASE_URL}/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

// COORDINATOR
export const getAllStudents = async () => {
  const res = await fetch(`${BASE_URL}/api/students`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};

export const deleteStudent = async (id) => {
  const res = await fetch(`${BASE_URL}/api/students/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete failed");
  return res.text();
};

// ADMIN / COORDINATOR LOGIN
export const userLogin = async (data) => {
  const res = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};
