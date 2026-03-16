import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaBars,
  FaBell,
  FaBriefcase,
  FaBuilding,
  FaClipboardList,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCircle,
  FaUserGraduate,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminpanel.css";

export default function Adminhome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    localStorage.getItem("adminSidebarCollapsed") === "true"
  );
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!token) {
    return <h1 className="text-center mt-5 text-danger">Invalid Session</h1>;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const toggleSidebarWidth = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("adminSidebarCollapsed", String(next));
      return next;
    });
  };

  const navItems = [
    { to: "admindashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "addhr", icon: <FaUserPlus />, label: "Add HR" },
    { to: "viewshr", icon: <FaUsers />, label: "View HR" },
    { to: "jobseekers", icon: <FaUserGraduate />, label: "Job Seekers" },
    { to: "application", icon: <FaClipboardList />, label: "Applications" },
    { to: "view-jobs", icon: <FaBriefcase />, label: "View Jobs" },
    { to: "contact-detail", icon: <FaUserCircle />, label: "Messages" },
    { to: "placementlist", icon: <FaUserGraduate />, label: "Placements" },
  ];

  return (
    <div className={`admin-shell ${sidebarCollapsed ? "admin-sidebar-collapsed" : ""}`}>
      <nav className="admin-topbar">
        <div className="container-fluid admin-topbar-inner">
          <button
            aria-label="Toggle sidebar"
            className="btn admin-menu-btn d-md-none"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <FaBars />
          </button>

          <NavLink to="/adminhome/admindashboard" className="admin-brand">
            <span className="admin-brand-badge">
              <FaBuilding />
            </span>
            <span>
              QuickStart <span>Career</span>
            </span>
          </NavLink>

          <div className="admin-topbar-actions">
            <div className="admin-chip d-none d-lg-inline-flex">
              <FaBell />
              <span>Control center</span>
            </div>
            <NavLink to="admindashboard" className="admin-topbar-link d-none d-lg-inline-flex">
              Overview
            </NavLink>
            <span className="admin-icon-btn" aria-hidden="true">
              <FaUserCircle />
            </span>
          </div>
        </div>
      </nav>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button
          type="button"
          className="admin-sidebar-toggle d-none d-md-inline-flex"
          onClick={toggleSidebarWidth}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>

        <div className="admin-sidebar-header">
          <span className="admin-kicker">Admin Workspace</span>
          <h2>Manage your placement platform with confidence</h2>
          <p>Track users, review activity, and keep the whole system organized from one place.</p>
        </div>

        <div className="admin-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
              title={item.label}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span className="admin-nav-text">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="admin-sidebar-footer">
          <button
            className="btn admin-logout-btn w-100 d-inline-flex align-items-center justify-content-center gap-2"
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
          >
            <span className="admin-logout-icon">
              <FaSignOutAlt />
            </span>
            <span className="admin-nav-text">Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
