import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBriefcase,
  FaClipboardCheck,
  FaEdit,
  FaFileAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userhome.css";

export default function UserProfile() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("loading");
  const [studentName, setStudentName] = useState(
    () => localStorage.getItem("username") || "User"
  );
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/upload", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

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
    { to: "user-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "view-jobs", icon: <FaBriefcase />, label: "Jobs" },
    { to: "applied-jobs", icon: <FaClipboardCheck />, label: "Applied" },
  ];

  const profileMenu = [
    { to: "view-profile", icon: <FaUser />, label: "View Profile" },
    { to: "update-profile", icon: <FaEdit />, label: "Update Profile" },
    { to: "upload-resume", icon: <FaFileAlt />, label: "Upload Resume" },
    { to: "intschedule", icon: <FaClipboardCheck />, label: "My Schedule" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

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

  const renderProfile = (size = 44) => {
    if (profilePic === "loading" || profilePic === "none") {
      return (
        <div
          className="user-shell-avatar-fallback"
          style={{ width: size, height: size }}
        >
          <FaUser size={size * 0.46} />
        </div>
      );
    }

    return (
      <img
        src={profilePic}
        alt="Profile"
        onError={() => setProfilePic("none")}
        className="user-shell-avatar"
        style={{ width: size, height: size }}
      />
    );
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="user-shell">
      <nav className="user-shell-topbar">
        <div className="user-shell-topbar-inner">
          <div className="user-shell-brand-row">
            <button
              type="button"
              className="user-shell-menu-btn d-lg-none"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <FaTimes /> : <FaBars />}
            </button>

            <NavLink to="user-dashboard" className="user-shell-brand">
              <span className="user-shell-brand-badge">Q</span>
              <span>
                QuickStart <span>Career</span>
              </span>
            </NavLink>
          </div>

          <div className="user-shell-nav d-none d-lg-flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `user-shell-nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="user-shell-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="user-shell-topbar-actions" ref={profileMenuRef}>
            <div className="user-shell-chip d-none d-md-inline-flex">
              <span>Student Workspace</span>
            </div>

            <button
              className="user-shell-profile-btn"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
              aria-label="Profile menu"
              type="button"
            >
              {renderProfile(44)}
            </button>

            {profileMenuOpen && (
              <div className="user-shell-profile-menu">
                <div className="user-shell-profile-menu-head">
                  {renderProfile(64)}
                  <div>
                    <strong>{studentName}</strong>
                    <span>Student account</span>
                  </div>
                </div>

                <div className="user-shell-profile-menu-list">
                  <div className="d-lg-none">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className="user-shell-profile-link"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          closeMobileNav();
                        }}
                      >
                        <span className="user-shell-profile-link-icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>

                  {profileMenu.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="user-shell-profile-link"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <span className="user-shell-profile-link-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>

                <button className="user-shell-logout-btn" onClick={handleLogout} type="button">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {mobileNavOpen && (
        <>
          <div className="user-shell-mobile-nav d-lg-none">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `user-shell-mobile-link ${isActive ? "active" : ""}`
                }
                onClick={closeMobileNav}
              >
                <span className="user-shell-mobile-link-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
          <div className="user-shell-overlay d-lg-none" onClick={closeMobileNav} />
        </>
      )}

      <main className="user-main">
        <Outlet />
      </main>
    </div>
  );
}
