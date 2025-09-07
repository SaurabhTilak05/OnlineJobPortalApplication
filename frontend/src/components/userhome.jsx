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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const studentName = localStorage.getItem("username") || "User";

  const navItems = [
    { to: "user-dashboard", icon: <FaTachometerAlt />, label: "Home" },
    { to: "view-jobs", icon: <FaBriefcase />, label: "View Jobs" },
    { to: "applied-jobs", icon: <FaClipboardCheck />, label: "Applied Jobs" },
  ];

  const profileMenu = [
    { to: "view-profile", icon: <FaUser />, label: "View Profile" },
    { to: "update-profile", icon: <FaEdit />, label: "Update Profile" },
  ];

  const handleLogout = () => {
    localStorage.clear();
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
          background: "linear-gradient(90deg, #0d6efd, #6610f2)",
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

          <NavLink
            to="user-dashboard"
            className="navbar-brand fw-bold text-white"
          >
            QuickStart <span className="text-warning">Career</span>
          </NavLink>

          {/* ✅ Desktop Nav Items */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.to}
                className={({ isActive }) =>
                  `btn btn-outline-light btn-sm ${
                    isActive ? "active fw-bold bg-warning text-dark" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Profile Icon with Dropdown */}
            <div className="position-relative">
              <button
                className="btn text-white fs-3"
                onClick={() => setProfileMenuOpen((p) => !p)}
              >
                <FaUserCircle />
              </button>

              {profileMenuOpen && (
                <div
                  className="profile-hamburger shadow-lg rounded-3"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "110%",
                    width: "260px",
                    background: "#fff",
                    zIndex: 2000,
                    overflow: "hidden",
                    animation: "slideDown 0.3s ease",
                  }}
                >
                  {/* 🔹 Header with gradient */}
                  <div
                    className="p-3 text-white fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #0d6efd, #6610f2)",
                    }}
                  >
                    <FaUserCircle className="me-2 fs-4" />
                    {studentName}
                  </div>

                  {/* 🔹 Menu Items */}
                  <ul className="list-unstyled m-0">
                    {profileMenu.map((item, i) => (
                      <li key={i}>
                        <NavLink
                          to={item.to}
                          className="dropdown-item py-3 d-flex align-items-center"
                          style={{
                            fontSize: "0.95rem",
                            borderBottom: "1px solid #f1f1f1",
                          }}
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <span className="me-3 fs-5 text-primary">
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>

                  {/* 🔹 Logout Button Section */}
                  <div className="text-center p-3 bg-light">
                    <button
                      className="btn btn-danger w-100 fw-bold"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Sidebar (Mobile only) */}
      <aside
        className={`bg-dark text-white position-fixed start-0 h-100 px-3 py-4 user-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <h6 className="text-uppercase text-secondary mb-4 px-2 fw-bold">
          Student Panel
        </h6>

        <ul className="nav flex-column gap-2">
          {/* Main nav items */}
          {navItems.map((item, i) => (
            <li key={i}>
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

          {profileMenu.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.to}
                className="nav-link d-flex align-items-center text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="me-2">{item.icon}</span> {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
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
          margin-top: ;
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
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
          .profile-hamburger {
  position: absolute;
  right: 0;
  top: 110%;
  width: 260px;
  background: #fff;
  z-index: 2000;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  animation: slideDown 0.3s ease;
}

.profile-hamburger .header {
  background: linear-gradient(135deg, #0d6efd, #6610f2);
  color: #fff;
  padding: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
}

.profile-hamburger ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.profile-hamburger li {
  border-bottom: 1px solid #f1f1f1;
}

.profile-hamburger li a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 0.95rem;
  color: #333;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
  border-radius: 8px;
}

.profile-hamburger li a:hover {
  background: rgba(13,110,253,0.1);
  color: #0d6efd;
}

.profile-hamburger .logout-btn {
  display: block;
  margin: 12px 16px;
  width: calc(100% - 32px);
  background: #dc3545;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  transition: background 0.3s;
}

.profile-hamburger .logout-btn:hover {
  background: #c82333;
}

      `}</style>
    </div>
  );
}
