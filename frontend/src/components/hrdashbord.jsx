// src/components/hrdashbord.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUsers, FaBriefcase, FaUserPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HRDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const hrId = localStorage.getItem("hrId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!hrId || role !== "hr") navigate("/signup");
  }, [navigate, hrId, role]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("hrId");
    navigate("/signup");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-3 fixed-top">
        <NavLink to="/hrdashboard" className="navbar-brand fw-bold d-flex align-items-center">
          QuickStart <span className="text-danger ms-1">Career</span>
        </NavLink>

        <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/* `end` makes it active only on /hrdashboard exactly */}
              <NavLink
                end
                to=""
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaUsers className="me-1" /> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="addjob"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaBriefcase className="me-1" /> Post a Job
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="view-applicants"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <FaUserPlus className="me-1" /> View Applicants
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger ms-lg-3 mt-2 mt-lg-0" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main area below fixed navbar */}
      <main className="container-fluid flex-grow-1 p-4" style={{ marginTop: 72 }}>
        <Outlet />
      </main>
    </div>
  );
}
