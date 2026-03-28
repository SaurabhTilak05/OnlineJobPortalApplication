import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaClipboardCheck,
  FaCompass,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
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
        if (!token) return;

        const res = await fetch("http://localhost:8080/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
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
      count: `${stats.profileCompletion}%`,
      description: "Keep your profile sharp so recruiters can trust your application faster.",
      icon: <FaUser />,
      accent: "profile",
      link: "/userprofile/view-profile",
    },
    {
      title: "Applied Jobs",
      count: stats.applied,
      description: "Review every role you have already applied to and track your activity.",
      icon: <FaBriefcase />,
      accent: "applied",
      link: "/userprofile/applied-jobs",
    },
    {
      title: "New Openings",
      count: stats.openings,
      description: "Discover fresh opportunities that match your current job search goals.",
      icon: <FaClipboardCheck />,
      accent: "openings",
      link: "/userprofile/view-jobs",
    },
  ];

  const quickActions = [
    {
      title: "View profile",
      text: "Check your public student profile and confirm every detail looks complete.",
      link: "/userprofile/view-profile",
      icon: <FaUser />,
    },
    {
      title: "Upload resume",
      text: "Keep your latest resume ready before applying to more companies.",
      link: "/userprofile/upload-resume",
      icon: <FaFileAlt />,
    },
    {
      title: "Browse jobs",
      text: "Explore available openings and apply while your profile is fresh.",
      link: "/userprofile/view-jobs",
      icon: <FaCompass />,
    },
  ];

  const tips = [
    "Complete your profile details before applying to improve recruiter confidence.",
    "Update your resume whenever you add a project, internship, or certification.",
    "Review new openings regularly so you can apply early to relevant roles.",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const stagger = {
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <motion.div
      className="student-dashboard"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <motion.section className="student-hero" variants={fadeUp}>
        <div className="student-hero-copy">
          <span className="student-kicker">Student Workspace</span>
          <h1>Stay on top of your profile, applications, and next opportunities.</h1>
          <p>
            This dashboard gives you a clean snapshot of your progress so you can focus on applying,
            improving, and moving closer to placement.
          </p>
          <div className="student-hero-badges">
            <span>Profile progress: {stats.profileCompletion}%</span>
            <span>Applications sent: {stats.applied}</span>
          </div>
        </div>

        <aside className="student-hero-panel">
          <span className="student-hero-panel-label">Current focus</span>
          <strong>{stats.openings} active openings</strong>
          <p>Explore available roles and keep your application momentum going this week.</p>
          <button
            type="button"
            className="student-hero-cta"
            onClick={() => navigate("/userprofile/view-jobs")}
          >
            Explore jobs
            <FaArrowRight />
          </button>
        </aside>
      </motion.section>

      <motion.section className="student-stats-grid" variants={stagger}>
        {cards.map((card) => (
          <motion.article
            key={card.title}
            className={`student-stat-card ${card.accent}`}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            onClick={() => navigate(card.link)}
          >
            <div className="student-stat-top">
              <span className="student-stat-icon">{card.icon}</span>
              <span className="student-stat-arrow"><FaArrowRight /></span>
            </div>
            <strong>{card.count}</strong>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </motion.article>
        ))}
      </motion.section>

      <section className="student-dashboard-grid">
        <motion.article className="student-panel student-progress-panel" variants={fadeUp}>
          <div className="student-panel-head">
            <div>
              <span className="student-panel-kicker">Progress</span>
              <h2>Profile strength</h2>
            </div>
            <span className="student-progress-value">{stats.profileCompletion}%</span>
          </div>

          <div className="student-progress-track">
            <motion.div
              className="student-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${stats.profileCompletion}%` }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </div>

          <p className="student-panel-text">
            A complete profile makes it easier for recruiters to trust your application and understand
            your strengths quickly.
          </p>

          <button
            type="button"
            className="student-panel-link"
            onClick={() => navigate("/userprofile/update-profile")}
          >
            Update profile
            <FaArrowRight />
          </button>
        </motion.article>

        <motion.article className="student-panel" variants={fadeUp}>
          <div className="student-panel-head">
            <div>
              <span className="student-panel-kicker">Quick Actions</span>
              <h2>Move faster</h2>
            </div>
          </div>

          <div className="student-action-list">
            {quickActions.map((action) => (
              <button
                key={action.title}
                type="button"
                className="student-action-item"
                onClick={() => navigate(action.link)}
              >
                <span className="student-action-icon">{action.icon}</span>
                <span className="student-action-copy">
                  <strong>{action.title}</strong>
                  <small>{action.text}</small>
                </span>
                <FaArrowRight className="student-action-arrow" />
              </button>
            ))}
          </div>
        </motion.article>
      </section>

      <motion.section className="student-panel student-tips-panel" variants={fadeUp}>
        <div className="student-panel-head">
          <div>
            <span className="student-panel-kicker">Tips</span>
            <h2>Stay recruiter-ready</h2>
          </div>
        </div>

        <div className="student-tip-list">
          {tips.map((tip, index) => (
            <div key={tip} className="student-tip-item">
              <span className="student-tip-number">0{index + 1}</span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
