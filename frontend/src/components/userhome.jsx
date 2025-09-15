// src/components/UserProfile.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaEdit,
  FaClipboardCheck,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserProfile() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("loading");
  const [studentName, setStudentName] = useState(
    () => localStorage.getItem("username") || "User"
  );
  const profileMenuRef = useRef();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch profile picture (and optional username from server)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/upload", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // if server returns a username/name, use it (fallback to localStorage)
        if (data.username) {
          setStudentName(data.username);
        } else if (data.name) {
          setStudentName(data.name);
        }

        if (data.profile_picture) {
          const picPath = data.profile_picture.startsWith("/images/")
            ? data.profile_picture
            : `/images/${data.profile_picture}`;
          setProfilePic(`http://localhost:8080${picPath}`);
        } else {
          setProfilePic("none");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfilePic("none");
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const navItems = [
    { to: "user-dashboard", icon: <FaTachometerAlt />, label: "Home" },
    { to: "view-jobs", icon: <FaBriefcase />, label: "View Jobs" },
    { to: "applied-jobs", icon: <FaClipboardCheck />, label: "Applied Jobs" },
  ];

  const profileMenu = [
    { to: "view-profile", icon: <FaUser />, label: "View Profile" },
    { to: "update-profile", icon: <FaEdit />, label: "Update Profile" },
    { to: "upload-resume", icon: <FaBriefcase />, label: "Upload Resume" },
    { to: "intschedule", icon: <FaClipboardCheck />, label: "My Schedule" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  if (!token) return <h1 className="text-center mt-5">Invalid Access</h1>;

  const renderProfile = (size = 40) => {
    if (profilePic === "loading" || profilePic === "none") {
      return (
        <div
          className="d-flex justify-content-center align-items-center bg-secondary text-white rounded-circle"
          style={{ width: size, height: size, border: "2px solid white" }}
        >
          <FaUser size={size * 0.6} />
        </div>
      );
    }
    return (
      <img
        src={profilePic}
        alt="Profile"
        onError={() => setProfilePic("none")}
        className="rounded-circle"
        style={{
          width: size,
          height: size,
          objectFit: "cover",
          border: "2px solid white",
        }}
      />
    );
  };

  return (
    <div style={{ "--user-topnav": "70px" }}>
      {/* Navbar */}
      <nav
        className="navbar shadow-sm fixed-top d-flex justify-content-between align-items-center px-3"
        style={{
          height: "var(--user-topnav)",
          zIndex: 1030,
          background: "linear-gradient(90deg, #0d6efd, #6610f2)",
        }}
      >
        {/* Left: Logo */}
        <div className="d-flex align-items-center gap-2">
          <NavLink
            to="user-dashboard"
            className="navbar-brand fw-bold text-white ms-2"
          >
            QuickStart <span className="text-warning">Career</span>
          </NavLink>
        </div>

        {/* Right: Desktop nav + profile */}
        <div className="d-flex align-items-center gap-2">
          {/* Desktop Nav Items (only desktop) */}
          <div className="d-none d-lg-flex align-items-center gap-2">
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
          </div>

          {/* Profile Dropdown */}
          <div className="position-relative" ref={profileMenuRef}>
            <button
              className="btn p-0"
              onClick={() => setProfileMenuOpen((p) => !p)}
              style={{ border: "none", background: "transparent" }}
              aria-label="Profile menu"
            >
              {renderProfile(40)}
            </button>

            {profileMenuOpen && (
              <div className="profile-hamburger shadow-lg rounded-3 d-flex flex-column">
                <div className="header d-flex align-items-center gap-2">
                  {renderProfile(70)}
                  {/* username as NavLink -> navigate to view-profile and close menu */}
                  <NavLink
                    to="view-profile"
                    className="username text-white text-decoration-none"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    {studentName}
                  </NavLink>
                </div>

                {/* Mobile menu scrollable */}
                <div className="menu-list flex-grow-1">
                  <ul>
                    {/* All items only in mobile (visible inside dropdown) */}
                    <div className="d-lg-none">
                      {navItems.map((item, i) => (
                        <li key={`nav-${i}`}>
                          <NavLink
                            to={item.to}
                            className="dropdown-item d-flex align-items-center"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            <span className="me-3 fs-5 text-primary">
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </div>

                    {profileMenu.map((item, i) => (
                      <li key={`profile-${i}`}>
                        <NavLink
                          to={item.to}
                          className="dropdown-item d-flex align-items-center"
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
                </div>

                {/* Fixed Logout */}
                <div className="logout-box bg-light text-center">
                  <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="user-main">
        <Outlet />
      </main>

      {/* Styles */}
      <style>{`
        .user-main {
          margin-top: 70px;
          min-height: 100vh;
          padding: 0;
          background: #f8f9fa;
        }
        .profile-hamburger {
          position: absolute;
          right: 0;
          top: 110%;
          width: 260px;
          background: #fff;
          z-index: 2000;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          max-height: 70vh;
          display: flex;
          flex-direction: column;
        }
        .profile-hamburger .header {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          color: #fff;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: bold;
        }
        /* username styling */
        .profile-hamburger .header .username {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          max-width: 140px;
          cursor: pointer;
        }
        .profile-hamburger .menu-list {
          flex-grow: 1;
          overflow-y: auto;
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
          color: #333;
          text-decoration: none;
          border-radius: 8px;
        }
        .profile-hamburger li a:hover {
          background: rgba(13,110,253,0.1);
          color: #0d6efd;
        }
        .profile-hamburger .logout-box {
          padding: 12px;
          border-top: 1px solid #eee;
        }
        .profile-hamburger .logout-btn {
          display: block;
          width: 100%;
          background: #dc3545;
          color: #fff;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          padding: 10px 0;
        }
        .profile-hamburger .logout-btn:hover {
          background: #c82333;
        }

        /* Ensure desktop nav stays as-is and mobile dropdown only used on small screens */
        @media (max-width: 991px) {
          /* on mobile/tablet screens you might want to hide the desktop nav items
             so users use the dropdown instead - but you already used d-none d-lg-flex */
        }
      `}</style>
    </div>
  );
}
