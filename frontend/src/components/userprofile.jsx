// src/components/UserProfile.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaEdit,
  FaClipboardCheck,
  FaBars,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCircle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div style={{ "--user-topnav": "70px" }}>
      {/* ✅ Top Navbar */}
      <nav
        className="navbar shadow-sm fixed-top"
        style={{
          height: "var(--user-topnav)",
          zIndex: 1030,
          background: "linear-gradient(90deg, #0d6efd, #6610f2)", // 🔹 Blue → Purple gradient
        }}
      >
        <div className="container-fluid">
          {/* Mobile: toggle sidebar */}
          <button
            className="btn btn-light d-lg-none"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>

          <NavLink to="/userdashboard" className="navbar-brand fw-bold text-white">
            QuickStart <span className="text-warning">Career</span>
          </NavLink>

          {/* ✅ Right side (desktop only) */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <NavLink end to="user-dashboard" className="btn btn-outline-light btn-sm">
              Dashboard
            </NavLink>

            {/* Profile icon only on desktop */}
            <NavLink to="view-profile" className="text-white fs-1 mr-3">
              <FaUserCircle />
            </NavLink>
          </div>
        </div>
      </nav>

      {/* ✅ Sidebar */}
      <aside
        className={`bg-dark text-white position-fixed start-0 h-100 px-3 py-4 user-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <h6 className="text-uppercase text-secondary mb-4 px-2 fw-bold">
          Student Panel
        </h6>

        <ul className="nav flex-column gap-2">
          {navItems.map((item, i) => (
            <li
              key={i}
              className={item.to === "view-profile" ? "d-lg-none" : ""}
              // Profile will show only in sidebar on mobile
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? "active" : "text-white"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <span className="me-2">{item.icon}</span> {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ✅ Logout Button */}
        <div className="mt-auto pt-4">
          <button className="btn btn-danger w-100 fw-bold" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* ✅ Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
          style={{ zIndex: 1035 }}
        />
      )}

      {/* ✅ Main Content */}
      <main className="user-main">
        <Outlet />
      </main>

      {/* ✅ Scoped Styles */}
      <style>{`
        .user-main {
          margin-top: var(--user-topnav);
          padding: 20px;
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f9ff, #e9ecef);
          transition: margin-left 0.3s ease;
        }
        .user-sidebar {
          width: 250px;
          top: var(--user-topnav);
          left: 0;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
          z-index: 1040;
        }
        .user-sidebar.open {
          transform: translateX(0);
        }
        @media (min-width: 992px) {
          .user-sidebar {
            transform: translateX(0);
          }
          .user-main {
            margin-left: 250px;
          }
        }
        .nav-link {
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: background 0.3s, color 0.3s;
        }
        .nav-link:hover {
          background: rgba(255,255,255,0.1);
          color: #ffc107 !important;
        }
        .nav-link.active {
          background: #ffc107;
          color: #000 !important;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
