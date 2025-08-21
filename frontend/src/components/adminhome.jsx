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
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Adminhome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: "addhr", icon: <FaUserPlus />, label: "Add HR" },
    { to: "viewshr", icon: <FaUsers />, label: "View HR" },
    { to: "application", icon: <FaClipboardList />, label: "Applications" },
    { to: "register-student", icon: <FaUserGraduate />, label: "Register Student" },
  ];

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signup");
  };

  return (
    <>
      {token === null ? (
        <h1>Invalid</h1>
      ) : (
        <div className="admin-page d-flex flex-column vh-100">
          {/* Header */}
          <header
            className="text-white py-3 shadow d-flex justify-content-center align-items-center position-relative"
            style={{ background: "linear-gradient(90deg, #0d6efd, #6610f2)" }}
          >
            <h2 className="m-0 text-center fw-bold">🚀 Admin Dashboard</h2>

            {/* Mobile toggle button */}
            <button
              className="btn btn-light d-md-none position-absolute top-50 start-0 translate-middle-y ms-3"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </header>

          <div className="d-flex flex-grow-1">
            {/* Sidebar */}
            <aside
              className={`p-3 text-white shadow d-flex flex-column
                ${sidebarOpen ? "position-fixed start-0 top-0 vh-100" : "d-none"} 
                d-md-flex flex-column`}
              style={{
                width: "220px",
                background: "rgba(33,37,41,0.95)",
                backdropFilter: "blur(8px)",
                zIndex: 1050,
                transition: "all 0.3s ease-in-out",
              }}
            >
              <h5 className="mb-4 text-center border-bottom pb-2">📌 Dashboard</h5>

              {navItems.map((item, i) => (
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
                  onClick={() => setSidebarOpen(false)} // auto-close on mobile
                >
                  <span className="me-2 fs-5">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}

              {/* Logout Button */}
              <button
                className="d-flex align-items-center mt-auto btn btn-outline-light p-2 rounded text-white fw-semibold"
                onClick={handleLogout}
                style={{ gap: "8px", justifyContent: "center", transition: "0.3s" }}
              >
                <FaSignOutAlt /> Logout
              </button>
            </aside>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
              <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{ background: "rgba(0,0,0,0.5)", zIndex: 1040 }}
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Main Content Area */}
            <main
              className="flex-grow-1 p-3 p-md-4"
              style={{ background: "#f8f9fa", minHeight: "100vh" }}
            >
              <div
                className="card shadow-lg border-0 text-center"
                style={{
                  borderRadius: "20px",
                  background: "linear-gradient(145deg, #ffffff, #f1f1f1)",
                }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="fw-bold">Welcome, Admin 👋</h3>
                </div>
              </div>

              <div className="mt-4">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
