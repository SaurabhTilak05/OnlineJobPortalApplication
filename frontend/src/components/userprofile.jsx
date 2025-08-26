// src/components/UserProfile.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaEdit,
  FaClipboardCheck,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css";   // ✅ import external css

export default function UserProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const studentName = localStorage.getItem("username") || "Student";

  const navItems = [
    { to: "user-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "view-profile", icon: <FaUser />, label: "View Profile" },
    { to: "view-jobs", icon: <FaBriefcase />, label: "View Jobs" },
    { to: "update-profile", icon: <FaEdit />, label: "Update Profile" },
    { to: "applied-jobs", icon: <FaClipboardCheck />, label: "Applied Jobs" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signup");
  };

  if (!token) return <h1 className="text-center mt-5">Invalid Access</h1>;

  return (
    <div className="student-page d-flex flex-column vh-100">
      {/* Header */}
      <header className="dashboard-header d-flex justify-content-between align-items-center px-4 shadow-sm">
        <h4 className="fw-bold m-0">🎓 Student Dashboard</h4>

        {/* Toggle button for mobile */}
        <button
          type="button"
          className="btn btn-light d-md-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={`dashboard-sidebar p-3 d-flex flex-column flex-shrink-0 ${
            sidebarOpen ? "show" : "d-none d-md-flex"
          }`}
        >
          <h6 className="fw-bold text-dark mb-4 text-center">
            Welcome, {studentName}
          </h6>

          <nav className="d-flex flex-column">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.to}
                className="sidebar-link d-flex align-items-center mb-2 p-2 rounded text-decoration-none"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="me-2 fs-5">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="logout-btn d-flex align-items-center mt-auto btn p-2 rounded fw-semibold"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </aside>

        {sidebarOpen && (
          <div
            className="overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="dashboard-content flex-grow-1 p-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
