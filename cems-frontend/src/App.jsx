import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyProfile from "./pages/student/MyProfile";
import StudentRegister from "./pages/StudentRegister";
import StudentEvents from "./pages/student/StudentEvents";
import StudentRegisteredEvents from "./pages/student/StudentRegisteredEvents";
import { ToastContainer } from "react-toastify";

import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import ViewStudents from "./pages/coordinator/ViewStudents";
import AddEvent from "./pages/coordinator/AddEvent";
import ViewEvents from "./pages/coordinator/ViewEvents";
import EditEvent from "./pages/coordinator/EditEvent";
import EventStudents from "./pages/coordinator/EventStudents";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCoordinators from "./pages/admin/ManageCoordinators";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ================= STUDENT ================= */}
        <Route path="/login/student" element={<Login role="STUDENT" />} />
        <Route path="/register" element={<StudentRegister />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <div className="text-gray-400">Welcome to Student Dashboard</div>
            }
          />
          <Route path="profile" element={<MyProfile />} />
          <Route path="events" element={<StudentEvents />} />
          <Route path="registered" element={<StudentRegisteredEvents />} />
        </Route>

        {/* ================= COORDINATOR ================= */}
        <Route
          path="/login/coordinator"
          element={<Login role="COORDINATOR" />}
        />

        <Route
          path="/coordinator"
          element={
            <ProtectedRoute allowedRole="COORDINATOR">
              <CoordinatorDashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <div className="text-gray-400">Select an option from sidebar</div>
            }
          />
          <Route path="students" element={<ViewStudents />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="events" element={<ViewEvents />} />
          <Route path="events/:id/edit" element={<EditEvent />} />
          <Route path="events/:eventId/students" element={<EventStudents />} />
        </Route>

        {/* ================= ADMIN ================= */}
        {/* ADMIN LOGIN */}
        <Route path="/login/admin" element={<Login role="ADMIN" />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <div className="text-gray-400">Select an option from sidebar</div>
            }
          />

          {/* REUSED COORDINATOR FEATURES */}
          <Route path="students" element={<ViewStudents />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="events" element={<ViewEvents />} />
          <Route path="events/:id/edit" element={<EditEvent />} />
          <Route path="events/:eventId/students" element={<EventStudents />} />

          {/* ADMIN ONLY */}
          <Route path="coordinators" element={<ManageCoordinators />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
        hideProgressBar
      />
    </BrowserRouter>
  );
};

export default App;
