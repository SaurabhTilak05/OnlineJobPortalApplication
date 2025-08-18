import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUserPlus,
  FaUsers,
  FaClipboardList,
  FaUserGraduate,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Adminhome() {
  return (
    <div className="admin-page d-flex flex-column vh-100">
      {/* Header */}
      <header
        className="text-white py-3 shadow"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #6610f2)",
        }}
      >
        <h2 className="text-center m-0">🚀 Admin Dashboard</h2>
      </header>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className="p-3 text-white shadow"
          style={{
            width: "260px",
            background: "rgba(33,37,41,0.9)",
            backdropFilter: "blur(8px)",
          }}
        >
          <h5 className="mb-4 text-center border-bottom pb-2">📌 Navigation</h5>

          {[
            { to: "addhr", icon: <FaUserPlus />, label: "Add HR" },
            { to: "viewhr", icon: <FaUsers />, label: "View HR" },
            { to: "application", icon: <FaClipboardList />, label: "Applications" },
            { to: "register-student", icon: <FaUserGraduate />, label: "Register Student" },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className="d-flex align-items-center mb-3 p-2 rounded text-decoration-none text-white"
              style={({ isActive }) => ({
                background: isActive
                  ? "linear-gradient(90deg, #0d6efd, #6610f2)"
                  : "transparent",
                transition: "0.3s",
              })}
            >
              <span className="me-2 fs-5">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </aside>

        {/* Main Content Area */}
        <main
          className="flex-grow-1 p-4"
          style={{
            background: "#f8f9fa",
          }}
        >
          <div
            className="card shadow-lg border-0 text-center"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(145deg, #ffffff, #f1f1f1)",
            }}
          >
            <div className="card-body p-5">
              <h3 className="fw-bold">Welcome, Admin 👋</h3>
              <p className="text-muted mt-3">
                Use the sidebar to manage HRs, students, and applications.
              </p>
            </div>
          </div>

          {/* ✅ Nested route content */}
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
