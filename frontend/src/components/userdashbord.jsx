import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  // 🔹 Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <motion.div
      className="dashboard-container"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {/* Welcome Section */}
      <motion.div variants={fadeUp} className="welcome-section">
        <h2>Welcome Back, 🎓 Student!</h2>
        <p>Track your profile progress, applied jobs, and new opportunities.</p>
      </motion.div>

      {/* Dashboard Cards */}
      <motion.div className="cards-wrapper" variants={stagger}>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="dashboard-card"
            style={{ background: card.bg }}
            variants={fadeUp}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(card.link)}
          >
            <motion.div
              className="card-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
            >
              {card.icon}
            </motion.div>
            <h3 className="card-count">{card.count}</h3>
            <p className="card-title">{card.title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Profile Progress Section */}
      <motion.div variants={fadeUp} className="profile-progress-section">
        <h3>Profile Completion</h3>
        <div className="progress-bar-bg">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${stats.profileCompletion}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {stats.profileCompletion}%
          </motion.div>
        </div>
        <p>Complete your profile to increase your chances of getting hired!</p>
      </motion.div>

      {/* Tips / Recommendations */}
      <motion.div variants={fadeUp} className="tips-section">
        <h3>Tips for Success</h3>
        <motion.ul variants={stagger}>
          {tips.map((tip, index) => (
            <motion.li
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.03, color: "#007bff" }}
            >
              {tip}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
