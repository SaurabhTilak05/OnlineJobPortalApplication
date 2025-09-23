import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBriefcase, FaClipboardCheck } from "react-icons/fa";
import "./userdashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    applied: 0,
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
      bg: "linear-gradient(135deg, #1E3C72, #2A5298)",
      link: "/userProfile/view-profile",
    },
    {
      title: "Applied Jobs",
      count: stats.applied,
      icon: <FaBriefcase size={50} />,
      bg: "linear-gradient(135deg, #FF416C, #FF4B2B)",
      link: "/userProfile/applied-jobs",
    },
    {
      title: "New Openings",
      count: stats.openings,
      icon: <FaClipboardCheck size={50} />,
      bg: "linear-gradient(135deg, #11998E, #38EF7D)",
      link: "/userProfile/view-jobs",
    },
  ];


  const tips = [
    "Complete your profile to increase chances of getting hired.",
    "Apply to at least 5 jobs per week for better visibility.",
    "Keep your resume updated with latest skills.",
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome Back, 🎓 Student!</h2>
        <p>Track your profile progress, applied jobs, and new opportunities.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="cards-wrapper">
        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            style={{ background: card.bg }}
            onClick={() => navigate(card.link)}
          >
            <div className="card-icon">{card.icon}</div>
            <h3 className="card-count">{card.count}</h3>
            <p className="card-title">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Profile Progress Section */}
      <div className="profile-progress-section">
        <h3>Profile Completion</h3>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${stats.profileCompletion}%` }}
          >
            {stats.profileCompletion}%
          </div>
        </div>
        <p>Complete your profile to increase your chances of getting hired!</p>
      </div>

      
      

      {/* Tips / Recommendations */}
      <div className="tips-section">
        <h3>Tips for Success</h3>
        <ul>
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
