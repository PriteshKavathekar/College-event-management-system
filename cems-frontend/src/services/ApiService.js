import axios from "axios";

/* ===============================
   AXIOS INSTANCE
================================ */
const API = axios.create({
  baseURL: "http://localhost:8080",
});

/* ===============================
   AUTH APIs
================================ */

// STUDENT LOGIN
export const studentLogin = (data) => {
  return API.post("/api/students/login", data);
};

// ADMIN / COORDINATOR LOGIN
export const adminCoordinatorLogin = (data) => {
  return API.post("/api/auth/login", data);
};

/* ===============================
   STUDENT REGISTRATION
================================ */

// REGISTER STUDENT (MULTIPART)
export const registerStudent = (formData) => {
  return API.post("/api/students/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ===============================
   STUDENT PROFILE
================================ */

// GET STUDENT PROFILE
export const getStudentProfile = (id) => {
  return API.get(`/api/students/${id}`);
};

// UPDATE PROFILE (MATCHES YOUR BACKEND)
export const updateStudentProfile = (id, formData) => {
  return API.put(`/api/students/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ===============================
   EVENTS
================================ */

// GET ALL EVENTS
export const getEvents = () => {
  return API.get("/api/events");
};

// CREATE EVENT (ADMIN / COORDINATOR)
export const createEvent = (formData) => {
  return API.post("/api/events", formData);
};

// UPDATE EVENT
export const updateEvent = (id, formData) => {
  return API.put(`/api/events/${id}`, formData);
};

// DELETE EVENT
export const deleteEvent = (id) => {
  return API.delete(`/api/events/${id}`);
};

/* ===============================
   EVENT REGISTRATIONS
================================ */

// STUDENT REGISTER TO EVENT
export const registerToEvent = (eventId, studentId) => {
  return API.post(`/api/registrations/event/${eventId}/student/${studentId}`);
};

// STUDENT VIEW REGISTERED EVENTS
export const getStudentRegisteredEvents = (studentId) => {
  return API.get(`/api/registrations/student/${studentId}/events`);
};

// REMOVE STUDENT FROM EVENT (COORDINATOR)
export const removeStudentFromEvent = (eventId, studentId) => {
  return API.delete(`/api/registrations/event/${eventId}/student/${studentId}`);
};

// COORDINATOR / ADMIN VIEW EVENT STUDENTS
export const getEventRegisteredStudents = (eventId) => {
  return API.get(`/api/registrations/event/${eventId}/students`);
};

/* ===============================
   ADMIN - COORDINATOR MANAGEMENT
================================ */

// CREATE COORDINATOR
export const createCoordinator = (data) => {
  return API.post("/api/admin/coordinators", data);
};

// GET ALL COORDINATORS
export const getCoordinators = () => {
  return API.get("/api/admin/coordinators");
};

// DELETE COORDINATOR
export const deleteCoordinator = (id) => {
  return API.delete(`/api/admin/coordinators/${id}`);
};

// UPDATE COORDINATOR
export const updateCoordinator = (id, data) => {
  return API.put(`/api/admin/coordinators/${id}`, data);
};


// ================= STUDENTS (COORDINATOR) =================

// GET ALL STUDENTS
export const getAllStudents = () => {
  return API.get("/api/students");
};

// DELETE STUDENT
export const deleteStudent = (id) => {
  return API.delete(`/api/students/${id}`);
};

// GET USER BY ID
export const getUserById = (id) => {
  return API.get(`/api/users/${id}`);
};

// ================= NOTIFICATIONS =================
// REGISTERED STUDENTS
export const notifyRegisteredStudents = (eventId, payload) => {
  return API.post(
    `/api/notifications/events/${eventId}/registered`,
    payload,
    {
      headers: {
        "X-User-Email": localStorage.getItem("email"),
      },
    }
  );
};

// ALL STUDENTS
export const notifyAllStudents = (eventId, payload) => {
  return API.post(
    `/api/notifications/events/${eventId}/all`,
    payload,
    {
      headers: {
        "X-User-Email": localStorage.getItem("email"),
      },
    }
  );
};

// SINGLE STUDENT
export const notifySingleStudent = (studentId, payload) => {
  return API.post(
    `/api/notifications/student/${studentId}`,
    payload,
    {
      headers: {
        "X-User-Email": localStorage.getItem("email"),
      },
    }
  );
};

