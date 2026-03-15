import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaHistory,
  FaSignOutAlt,
  FaUserCircle,
  FaUserCog,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./hrdashboard.css";

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

  const navItems = [
    { to: ".", label: "Dashboard", icon: <FaChartLine />, end: true },
    { to: "addjob", label: "Post Job", icon: <FaBriefcase /> },
    { to: "view-applicants", label: "Applicants", icon: <FaClipboardList /> },
    { to: "view-schedule", label: "Interview Schedule", icon: <FaCalendarAlt /> },
    { to: "job-history", label: "Job History", icon: <FaHistory /> },
    { to: "placement", label: "Placement Records", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="hr-dashboard-shell">
      <nav className="hr-topbar">
        <div className="container-fluid hr-topbar-inner">
          <button
            className="btn hr-menu-toggle d-lg-none"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>

          <NavLink to="/hrdashboard" className="hr-brand">
            <span className="hr-brand-badge">
              <FaBuilding />
            </span>
            <span>
              QuickStart <span>Career</span>
            </span>
          </NavLink>

          <div className="hr-topbar-actions">
            <div className="hr-topbar-chip d-none d-md-flex">
              <FaBell />
              <span>Recruit smarter</span>
            </div>
            <NavLink end to="." className="hr-topbar-link d-none d-lg-inline-flex">
              Overview
            </NavLink>
            <NavLink to="profile" className="hr-profile-link" aria-label="HR profile">
              <FaUserCircle />
            </NavLink>
          </div>
        </div>
      </nav>

      <aside className={`hr-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="hr-sidebar-header">
          <p className="hr-sidebar-kicker">HR Workspace</p>
          <h2>Manage hiring with clarity</h2>
          <p className="hr-sidebar-copy">
            Post jobs, track applicants, and keep interviews moving from one clean place.
          </p>
        </div>

        <div className="hr-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `hr-nav-link ${isActive ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="hr-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="d-lg-none">
            <NavLink
              to="profile"
              className={({ isActive }) => `hr-nav-link ${isActive ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="hr-nav-icon">
                <FaUserCog />
              </span>
              <span>Profile</span>
            </NavLink>
          </div>
        </div>

        <div className="hr-sidebar-footer">
          <button className="btn hr-logout-btn w-100 fw-bold" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="hr-sidebar-overlay" onClick={closeSidebar} />}

      <main className="hr-main-content">
        <Outlet />
      </main>
    </div>
  );
}
