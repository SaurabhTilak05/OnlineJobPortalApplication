// src/components/Adminhome.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUsers,
  FaClipboardList,
  FaUserGraduate,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTachometerAlt,
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
    { to: "view-jobs", icon: <FaClipboardList />, label: "view jobs" },

  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signup");
  };

  if (!token) {
    return <h1 className="text-center mt-5">Invalid</h1>;
  }

  return (
    <div className="admin-page d-flex flex-column vh-100">
      {/* Header */}
      <header
  className="d-flex justify-content-center align-items-center position-relative shadow py-3"
  style={{
    background: "linear-gradient(270deg, #0d6efd, #6610f2, #0dcaf0, #6610f2)", // multi-color gradient
    backgroundSize: "800% 800%",
    color: "#fff",
    animation: "gradientAnimation 15s ease infinite",
  }}
>
  <h2 className="m-0 fw-bold d-flex align-items-center" style={{ gap: "10px" }}>
    <span
      className="rocket"
      style={{ display: "inline-block", animation: "rocketAnimation 2s infinite" }}
    >
      🚀
    </span>
    Admin Dashboard
  </h2>

  {/* Mobile toggle */}
  <button
    type="button"
    className="btn btn-light d-md-none position-absolute top-50 start-0 translate-middle-y ms-3"
    onClick={() => setSidebarOpen(!sidebarOpen)}
    style={{
      transition: "transform 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {sidebarOpen ? <FaTimes /> : <FaBars />}
  </button>

  {/* Animations */}
  <style>{`
    @keyframes gradientAnimation {
      0% {background-position: 0% 50%;}
      50% {background-position: 100% 50%;}
      100% {background-position: 0% 50%;}
    }
    @keyframes rocketAnimation {
      0%, 100% { transform: translateY(0);}
      50% { transform: translateY(-5px);}
    }
  `}</style>
</header>


      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={`p-3 text-white shadow d-flex flex-column flex-shrink-0
            ${sidebarOpen ? "position-fixed start-0 top-0 vh-100" : "d-none d-md-flex"}`}
          style={{
            width: "220px",
            background: "rgba(33,37,41,0.95)",
            backdropFilter: "blur(8px)",
            zIndex: 1050,
            transition: "all 0.25s ease",
            position: sidebarOpen ? "fixed" : "sticky",
            top: sidebarOpen ? 0 : 70,
            height: sidebarOpen ? "100vh" : "calc(100vh - 70px)",
            overflowY: "auto",
          }}
        >
          <h5 className="mb-4 text-center border-bottom pb-2"> Dashboard</h5>

          <nav className="d-flex flex-column">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.to}
                end={item.exact}
                className="d-flex align-items-center mb-3 p-2 rounded text-decoration-none text-white"
                style={({ isActive }) => ({
                  background: isActive ? "linear-gradient(90deg,#0d6efd,#6610f2)" : "transparent",
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
          style={{ background: "#f8f9fa", minHeight: "100vh", overflowY: "auto" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
