import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUserPlus, FaUsers, FaClipboardList,
  FaBars, FaTimes, FaSignOutAlt,
  FaTachometerAlt, FaBell, FaUserCircle, FaCog,
  FaUserGraduate
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Adminhome.css";

export default function Adminhome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return <h1 className="text-center mt-5 text-danger">Invalid Session</h1>;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const navItems = [
    { to: "admindashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "addhr", icon: <FaUserPlus />, label: "Add HR" },
    { to: "viewshr", icon: <FaUsers />, label: "View HR" },
    { to: "jobseekers", icon: <FaUserGraduate />, label: "Job Seekers" }, // ✅ New menu
    { to: "application", icon: <FaClipboardList />, label: "Applications" },
    { to: "view-jobs", icon: <FaClipboardList />, label: "View Jobs" },
  ];

  return (
    <div className="d-flex flex-column vh-100">
      {/* Sticky Navbar */}
      <nav className="navbar navbar-dark bg-primary shadow p-3 fixed-top px-3">
        <button
          className="btn btn-outline-light d-md-none me-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        QuickStart <span className="text-danger p-1">Career</span>
        <div className="d-flex align-items-center ms-auto">
          <FaBell className="me-3 text-light fs-5 cursor-pointer" />
          <FaCog className="me-3 text-light fs-5 cursor-pointer" />
          <FaUserCircle className="text-light fs-4 cursor-pointer" />
        </div>
      </nav>

      {/* Layout */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={`sidebar bg-dark text-white m-0 p-3 d-flex flex-column ${sidebarOpen ? "open" : ""}`}
        >
          <h4 className="text-info mb-4 text-center">Menu</h4>
          <nav className="flex-grow-1">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.to}
                className={({ isActive }) =>
                  `d-flex align-items-center mb-3 p-2 rounded text-decoration-none sidebar-link ${
                    isActive ? "active-link" : ""
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <span className="me-2 fs-5">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="pt-3 border-top">
            <button
              className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 p-4 mt-5 content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
