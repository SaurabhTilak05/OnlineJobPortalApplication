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
    <div style={{ "--hr-topnav": "80px" }}>
      {/* Top Navbar (fixed) */}
      <nav
        className="navbar navbar-dark bg-dark shadow-sm fixed-top"
        style={{ height: "var(--hr-topnav)", zIndex: 1030 }}
      >
        <div className="container-fluid">
          {/* Mobile: toggle sidebar */}
          <button
            className="btn btn-dark d-lg-none"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>

          <NavLink to="/hrdashboard" className="navbar-brand fw-bold">
            QuickStart <span className="text-danger">Career</span>
          </NavLink>

          {/* Right side (desktop) */}
          <div className="d-none d-md-flex align-items-center gap-2">
            <NavLink end to="." className="btn btn-outline-light btn-sm">
              Dashboard
            </NavLink>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              <FaSignOutAlt className="me-1" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar (fixed) */}
      <aside
        className={`bg-dark text-white position-fixed start-0 h-100 px-3 py-3 hr-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
        style={{ top: "var(--hr-topnav)", width: 250, zIndex: 1040 }}
      >
        <div className="mb-3 text-uppercase small text-secondary px-2">
          HR Panel
        </div>

        <ul className="nav flex-column">
          <li className="nav-item mb-1">
            <NavLink
              end
              to="."
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active" : ""}`
              }
              onClick={closeSidebar}
            >
              <FaUsers className="me-2" />
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-1">
            <NavLink
              to="addjob"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active" : ""}`
              }
              onClick={closeSidebar}
            >
              <FaBriefcase className="me-2" />
              Post Job
            </NavLink>
          </li>

          <li className="nav-item mb-1">
            <NavLink
              to="view-applicants"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active" : ""}`
              }
              onClick={closeSidebar}
            >
              <FaUserPlus className="me-2" />
              View Applicants
            </NavLink>
          </li>

          {/* Optional pages — add routes or remove these links */}
          <li className="nav-item mb-1">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active" : ""}`
              }
              onClick={closeSidebar}
            >
              <FaUserCog className="me-2" />
              Profile
            </NavLink>
          </li>
          <li className="nav-item mb-1">
            <NavLink
              to="job-history"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active" : ""}`
              }
              onClick={closeSidebar}
            >
              <FaHistory className="me-2" />
              Job History
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              to="messages"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active" : ""}`
              }
              onClick={closeSidebar}
            >
              <FaEnvelope className="me-2" />
              Messages
            </NavLink>
          </li>

        </ul>

        <div className="mt-auto pb-2">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" />
            Logout
          </button>
        </div>
      </aside>

      {/* Dark overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,.4)", zIndex: 1035 }}
          onClick={closeSidebar}
        />
      )}

      {/* Main content */}
      <main className="hr-main p-3 p-md-4 mt-5">
        <Outlet />
      </main>

      {/* Scoped styles */}
      <style>{`
        /* Main pushes down below fixed top navbar */
        .hr-main {
          padding-top: calc(var(--hr-topnav) + 8px);
          min-height: 100vh;
          background: #f8f9fa;
        }

        /* Sidebar behavior */
        .hr-sidebar { 
          transform: translateX(-100%);
          transition: transform .3s ease;
        }
        .hr-sidebar.open { 
          transform: translateX(0);
        }

        /* Desktop: sidebar always visible + content shifted */
        @media (min-width: 992px){
          .hr-sidebar { transform: translateX(0); }
          .hr-main { margin-left: 250px; }
        }

        /* Active link style */
        .nav-link.active {
          font-weight: 700;
          color: #ffc107 !important;
        }
      `}</style>
    </div>
  );
}
