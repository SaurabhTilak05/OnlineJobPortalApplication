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

export default function UserProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const profilePhoto = localStorage.getItem("profilePhoto") || "/images/default-profile.png";
  const studentName = localStorage.getItem("username") || "Student Name";

  const navItems = [
    { to: "user-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" }, // index route
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
      <header
        className="d-flex justify-content-center align-items-center position-relative shadow py-3"
        style={{
          background: "linear-gradient(270deg, #198754, #0dcaf0, #6610f2, #198754)",
          backgroundSize: "800% 800%",
          color: "#fff",
          animation: "gradientAnimation 15s ease infinite",
        }}
      >
        <h2 className="m-0 fw-bold d-flex align-items-center" style={{ gap: "10px" }}>
          🎓 Student Dashboard
        </h2>
        <button
          type="button"
          className="btn btn-light d-md-none position-absolute top-50 start-0 translate-middle-y ms-3"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <style>{`
          @keyframes gradientAnimation {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}</style>
      </header>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={`p-3 text-white shadow d-flex flex-column flex-shrink-0 ${
            sidebarOpen ? "position-fixed start-0 top-0 vh-100" : "d-none d-md-flex"
          }`}
          style={{
            width: "220px",
            background: "rgba(25,135,84,0.95)",
            backdropFilter: "blur(8px)",
            zIndex: 1050,
            transition: "all 0.25s ease",
            position: sidebarOpen ? "fixed" : "sticky",
            top: sidebarOpen ? 0 : 70,
            height: sidebarOpen ? "100vh" : "calc(100vh - 70px)",
            overflowY: "auto",
          }}
        >
          {/* Profile Photo */}
          <div className="text-center mb-4">
            <img
              src={profilePhoto}
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
              }}
            />
            <h6 className="mt-2">{studentName}</h6>
          </div>

          <nav className="d-flex flex-column">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.to}
                className="d-flex align-items-center mb-3 p-2 rounded text-decoration-none text-white"
                style={({ isActive }) => ({
                  background: isActive ? "linear-gradient(90deg,#198754,#0dcaf0)" : "transparent",
                })}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="me-2 fs-5">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="d-flex align-items-center mt-auto btn btn-outline-light p-2 rounded text-white fw-semibold"
            onClick={handleLogout}
            style={{ gap: "8px", justifyContent: "center" }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </aside>

        {sidebarOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 1040 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main
          className="flex-grow-1 p-3 p-md-4"
          style={{ background: "#f8f9fa", minHeight: "100vh", overflowY: "auto" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
