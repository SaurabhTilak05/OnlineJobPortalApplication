import React, { useEffect, useState } from "react";
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
  FaUserGraduate,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Adminhome.css";

export default function Adminhome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // if window resizes to desktop size, close mobile sidebar (state-driven)
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!token)
    return (
      <h1 className="text-center mt-5 text-danger">Invalid Session</h1>
    );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const navItems = [
    { to: "admindashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "addhr", icon: <FaUserPlus />, label: "Add HR" },
    { to: "viewshr", icon: <FaUsers />, label: "View HR" },
    { to: "jobseekers", icon: <FaUserGraduate />, label: "Job Seekers" },
    { to: "application", icon: <FaClipboardList />, label: "Applications" },
    { to: "view-jobs", icon: <FaClipboardList />, label: "View Jobs" },
    { to: "contact-detail", icon: <FaUserCircle />, label: "Messages " },
    { to: "placementlist", icon: <FaUserGraduate />, label: "Placements" }, 
  ];

  return (
    <div className="admin-layout" style={{ "--navbar-height": "56px" }}>
      {/* Navbar */}
      <nav
        className="admin-navbar navbar navbar-dark bg-primary fixed-top shadow px-3 d-flex align-items-center"
        role="navigation"
        aria-label="Main navigation"
      >
        <button
          aria-label="Toggle sidebar"
          className="btn btn-outline-light d-md-none me-2"
          onClick={() => setSidebarOpen((s) => !s)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <span className="fw-bold text-light">
          QuickStart <span className="text-danger">Career</span>
        </span>

        <div className="d-flex align-items-center ms-auto">
          <FaBell className="me-3 text-light fs-5 cursor-pointer" />
          <FaCog className="me-3 text-light fs-5 cursor-pointer" />
          <FaUserCircle className="text-light fs-4 cursor-pointer" />
        </div>
      </nav>

      {/* Mobile overlay (visible only when sidebar open on small screens) */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

     {/* Sidebar */}
<aside
  className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
  role="navigation"
  aria-label="Sidebar navigation"
>
  <div className="sidebar-body">
    <div className="sidebar-header text-center mb-3">
      <h5 className="text-info mb-0">Menu</h5>
    </div>

    <ul className="nav flex-column">
      {navItems.map((item, idx) => (
        <li key={idx} className="nav-item">
     <NavLink
  to={item.to}
  className={({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 ${isActive ? "active-link" : ""}`
  }
  onClick={() => setSidebarOpen(false)}
>
  <span className="icon">{item.icon}</span>
  <span className="label">{item.label}</span>
</NavLink>




        </li>
      ))}
    </ul>
  </div>

  {/* Footer pinned */}
  <div className="sidebar-footer">
    <button
      className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
      onClick={handleLogout}
    >
      <FaSignOutAlt /> Logout
    </button>
  </div>
</aside>


      {/* Main content */}
      <main className="admin-content">
        {/* container-fluid so child pages can use full width */}
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
