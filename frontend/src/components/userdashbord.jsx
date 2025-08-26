// src/components/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { FaUser, FaBriefcase, FaBookmark, FaClipboardCheck } from "react-icons/fa";

export default function userdashbord() {
  const [stats, setStats] = useState({
    applied: 0,
    saved: 0,
    openings: 0,
    profileComplete: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [appliedRes, savedRes, openingsRes, profileRes] = await Promise.all([
          fetch("http://localhost:8080/student/appliedCount"),
          fetch("http://localhost:8080/student/savedCount"),
          fetch("http://localhost:8080/student/openingsCount"),
          fetch("http://localhost:8080/student/profileStatus"),
        ]);

        const applied = await appliedRes.json();
        const saved = await savedRes.json();
        const openings = await openingsRes.json();
        const profile = await profileRes.json();

        setStats({
          applied: applied.total || 0,
          saved: saved.total || 0,
          openings: openings.total || 0,
          profileComplete: profile.percent || 0,
        });
      } catch (err) {
        console.error("Error fetching student stats:", err);
      }
    }
    fetchStats();
  }, []);

  const cardStyle = {
    borderRadius: "15px",
    padding: "2rem",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "150px",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  };

  const cards = [
    {
      title: "Profile Completion",
      count: stats.profileComplete + "%",
      icon: <FaUser size={40} />,
      bg: "linear-gradient(135deg, #0d6efd, #6610f2)",
    },
    {
      title: "Applied Jobs",
      count: stats.applied,
      icon: <FaBriefcase size={40} />,
      bg: "linear-gradient(135deg, #20c997, #0dcaf0)",
    },
    {
      title: "Saved Jobs",
      count: stats.saved,
      icon: <FaBookmark size={40} />,
      bg: "linear-gradient(135deg, #fd7e14, #ffc107)",
    },
    {
      title: "New Openings",
      count: stats.openings,
      icon: <FaClipboardCheck size={40} />,
      bg: "linear-gradient(135deg, #198754, #28a745)",
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <h2 className="fw-bold mb-4 text-center text-success">🎓 Student Dashboard</h2>
      <p className="text-center text-muted mb-5 fs-5">
        Track your applications, saved jobs, and profile progress here.
      </p>

      <div className="row g-4 justify-content-center">
        {cards.map((card, i) => (
          <div className="col-md-3" key={i}>
            <div
              style={{ ...cardStyle, background: card.bg }}
              className="text-center"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
              <div className="mb-3">{card.icon}</div>
              <h4 className="fw-bold">{card.count}</h4>
              <p className="mb-0">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
