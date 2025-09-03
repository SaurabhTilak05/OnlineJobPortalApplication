// src/components/Adminhome.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUsers,
  FaClipboardList,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBell,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Adminhome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const navItems = [
    { to: "admindashboard", icon: <FaTachometerAlt />, label: "Dashboard", exact: true },
    { to: "addhr", icon: <FaUserPlus />, label: "Add HR" },
    { to: "viewshr", icon: <FaUsers />, label: "View HR" },
    { to: "application", icon: <FaClipboardList />, label: "Applications" },
    { to: "view-jobs", icon: <FaClipboardList />, label: "View Jobs" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signup");
  };

  if (!token) {
    return <h1 className="text-center mt-5 text-danger">Invalid Session</h1>;
  }

  
  return (
    
    <div className="admin-page d-flex flex-column vh-100 m-0 p-0 ">
      {/* ===== Navbar ===== */}
      <nav
        className="d-flex justify-content-between align-items-center p-3 shadow"
        style={{
          background: "#1e293b", // modern dark navy
          color: "#fff",
        }}
      >
        {/* Left: Sidebar Toggle for mobile */}
        <button
          type="button"
          className="btn btn-outline-light d-md-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Center: Title */}
        <h4 className="m-0 fw-bold" style={{ letterSpacing: "1px", color: "#38bdf8" }}>
          Admin Panel
        </h4>

        {/* Right: Navbar Items */}
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          <button className="btn btn-light btn-sm rounded-circle shadow-sm">
            <FaBell className="text-dark" />
          </button>
          <button className="btn btn-light btn-sm rounded-circle shadow-sm">
            <FaCog className="text-dark" />
          </button>

          {/* Profile Icon */}
          <FaUserCircle className="fs-4 text-light" />

          {/* 🔴 Direct Logout Button */}
          <button
            className="btn btn-danger btn-sm ms-2 rounded-pill px-3"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </nav>

      {/* ===== Main Layout ===== */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={`p-3 text-white shadow d-flex flex-column flex-shrink-0
            ${sidebarOpen ? "position-fixed start-0 top-0 vh-100" : "d-none d-md-flex"}`}
          style={{
            width: "240px",
            background: "linear-gradient(180deg,#0f172a,#1e293b)", // sleek gradient
            zIndex: 1050,
            transition: "all 0.3s ease",
            position: sidebarOpen ? "fixed" : "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <h5 className="mb-4 text-center border-bottom pb-2 text-info">Menu</h5>

          <nav className="d-flex flex-column">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.to}
                end={item.exact}
                className="d-flex align-items-center mb-3 p-2 rounded text-decoration-none text-white fw-semibold"
                style={({ isActive }) => ({
                  background: isActive ? "#38bdf8" : "transparent",
                  color: isActive ? "#0f172a" : "#fff",
                  transition: "0.3s",
                })}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="me-2 fs-5">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
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
          style={{ background: "#f1f5f9", minHeight: "100vh", overflowY: "auto" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
