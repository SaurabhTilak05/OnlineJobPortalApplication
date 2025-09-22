import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBriefcase, FaClipboardCheck } from "react-icons/fa";
import "./userdashbord.css"; // Custom CSS

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    applied: 0,
    saved: 0,
    openings: 0,
    profileCompletion: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.error("No token found");

        const res = await fetch("http://localhost:8080/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json();
          console.error("Error fetching stats:", errData.message);
          return;
        }

        const data = await res.json();
        setStats({
          applied: data.applied || 0,
          saved: data.saved || 0,
          openings: data.openings || 0,
          profileCompletion: data.profileCompletion || 0,
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Profile Completion",
      count: stats.profileCompletion + "%",
      icon: <FaUser size={50} />,
      bg: "linear-gradient(135deg, #0d6efd, #6610f2)",
      link: "/userProfile/view-profile",
    },
    {
      title: "Applied Jobs",
      count: stats.applied,
      icon: <FaBriefcase size={50} />,
      bg: "linear-gradient(135deg, #20c997, #0dcaf0)",
      link: "/userProfile/applied-jobs",
    },
    {
      title: "New Openings",
      count: stats.openings,
      icon: <FaClipboardCheck size={50} />,
      bg: "linear-gradient(135deg, #198754, #28a745)",
      link: "/userProfile/view-jobs",
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <h2 className="fw-bold mb-2 text-center text-primary">🎓 Student Dashboard</h2>
      <p className="text-center text-muted mb-5 fs-6">
        Track your applications, saved jobs, and profile progress all in one place.
      </p>

      <div className="row g-4 justify-content-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4"
            onClick={() => navigate(card.link)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="dashboard-card shadow-sm text-center p-4 mb-3"
              style={{ background: card.bg }}
            >
              <div className="icon mb-3">{card.icon}</div>
              <h4 className="fw-bold">{card.count}</h4>
              <p className="mb-0">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
