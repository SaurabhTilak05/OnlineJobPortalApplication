import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBriefcase,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaUserCog,
  FaHistory,
  FaEnvelope,
  FaUserCircle,
  FaCalendarAlt, // new icon for schedule
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HRDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const hrId = localStorage.getItem("hrId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!hrId || role !== "hr") navigate("/signup");
  }, [navigate, hrId, role]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div style={{ "--hr-topnav": "70px" }}>
      {/* ✅ Top Navbar */}
      <nav
        className="navbar shadow-sm fixed-top"
        style={{
          height: "var(--hr-topnav)",
          zIndex: 1030,
          background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
        }}
      >
        <div className="container-fluid">
          <button
            className="btn btn-light d-lg-none"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>

          <NavLink
            to="/hrdashboard"
            className="navbar-brand fw-bold text-white"
          >
            QuickStart <span className="text-warning">Career</span>
          </NavLink>

          <div className="d-none d-lg-flex align-items-center gap-3">
            <NavLink end to="." className="btn btn-outline-light btn-sm">
              Dashboard
            </NavLink>
            <NavLink to="profile" className="text-white fs-1 mr-3">
              <FaUserCircle />
            </NavLink>
          </div>
        </div>
      </nav>

      {/* ✅ Sidebar */}
      <aside
        className={`bg-dark text-white position-fixed start-0 h-100 px-3 py-4 hr-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <h6 className="text-uppercase text-secondary mb-4 px-2 fw-bold">
          HR Panel
        </h6>

        <ul className="nav flex-column gap-2">
          <li>
            <NavLink
              end
              to="."
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active" : "text-white"
                }`
              }
              onClick={closeSidebar}
            >
              <FaUsers className="me-2" /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="addjob"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active" : "text-white"
                }`
              }
              onClick={closeSidebar}
            >
              <FaBriefcase className="me-2" /> Post Job
            </NavLink>
          </li>

          <li>
            <NavLink
              to="view-applicants"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active" : "text-white"
                }`
              }
              onClick={closeSidebar}
            >
              <FaUserPlus className="me-2" /> View Applicants
            </NavLink>
          </li>

          {/* ✅ New View Schedule */}
          <li>
            <NavLink
              to="view-schedule"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active" : "text-white"
                }`
              }
              onClick={closeSidebar}
            >
              <FaCalendarAlt className="me-2" /> View Schedule
            </NavLink>
          </li>

          <li className="d-lg-none">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active" : "text-white"
                }`
              }
              onClick={closeSidebar}
            >
              <FaUserCog className="me-2" /> Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="job-history"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active" : "text-white"
                }`
              }
              onClick={closeSidebar}
            >
              <FaHistory className="me-2" /> Job History
            </NavLink>
          </li>

          <li>
            <NavLink
              to="messages"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active" : "text-white"
                }`
              }
              onClick={closeSidebar}
            >
              <FaEnvelope className="me-2" /> Messages
            </NavLink>
          </li>
        </ul>

        <div className="mt-auto pt-4">
          <button
            className="btn btn-danger w-100 fw-bold"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          onClick={closeSidebar}
          style={{ zIndex: 1035 }}
        />
      )}

      <main className="hr-main">
        <Outlet />
      </main>

      <style>{`
        .hr-main {
          margin-top: var(--hr-topnav);
          padding: 20px;
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f2fe, #f8fafc); 
          transition: margin-left 0.3s ease;
        }
        .hr-sidebar {
          width: 250px;
          top: var(--hr-topnav);
          left: 0;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
          z-index: 1040;
        }
        .hr-sidebar.open {
          transform: translateX(0);
        }
        @media (min-width: 992px) {
          .hr-sidebar {
            transform: translateX(0);
          }
          .hr-main {
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
