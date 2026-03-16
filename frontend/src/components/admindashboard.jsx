import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaUserGraduate, FaUsers } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AdminDashboardService from "../service/admindashboardserv.js";
import "./adminpanel.css";

function useCountAnimation(target, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 30 || 1);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 30);

    return () => clearInterval(interval);
  }, [target, duration]);

  return count;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    hrs: 0,
    students: 0,
    applications: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const result = await AdminDashboardService.getAllCounts();
        setCounts(result);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    }
    fetchCounts();
  }, []);

  const animatedCounts = {
    hrs: useCountAnimation(counts.hrs, 1200),
    students: useCountAnimation(counts.students, 1200),
    applications: useCountAnimation(counts.applications, 1200),
  };

  const cards = [
    {
      title: "HRs Registered",
      count: counts.hrs,
      animatedCount: animatedCounts.hrs,
      icon: <FaUsers />,
      gradient: "linear-gradient(135deg, #1f5c4f, #2b7d6b)",
      path: "viewshr",
    },
    {
      title: "Students Enrolled",
      count: counts.students,
      animatedCount: animatedCounts.students,
      icon: <FaUserGraduate />,
      gradient: "linear-gradient(135deg, #db6f42, #f1a05f)",
      path: "jobseekers",
    },
    {
      title: "Applications",
      count: counts.applications,
      animatedCount: animatedCounts.applications,
      icon: <FaClipboardList />,
      gradient: "linear-gradient(135deg, #355c7d, #4f7da5)",
      path: "application",
    },
  ];

  const pieData = [
    { name: "HRs", value: counts.hrs, color: "#1f5c4f" },
    { name: "Students", value: counts.students, color: "#db6f42" },
    { name: "Applications", value: counts.applications, color: "#355c7d" },
  ];

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <span className="admin-section-kicker">Admin Dashboard</span>
          <h1 className="admin-page-title">Platform overview</h1>
          <p className="admin-page-subtitle">
            Monitor growth, activity, and placement operations across HR users, job seekers, and applications.
          </p>
        </div>
      </section>

      <section className="admin-stats-grid">
        {cards.map((card) => (
          <article
            key={card.title}
            className="admin-stat-card"
            style={{ background: card.gradient }}
            onClick={() => navigate(`/adminhome/${card.path}`)}
          >
            <div className="admin-stat-icon">{card.icon}</div>
            <h3>{card.animatedCount}</h3>
            <p>{card.title}</p>
          </article>
        ))}
      </section>

      <section className="admin-split-grid" style={{ gridTemplateColumns: "minmax(0, 1.15fr) minmax(320px, 0.85fr)" }}>
        <div className="admin-surface">
          <span className="admin-section-kicker">Quick Summary</span>
          <h2 className="mt-2 mb-3" style={{ color: "var(--admin-brand-strong)" }}>Key activity snapshot</h2>
          <div className="admin-card-grid">
            <div className="admin-info-card">
              <h3>Total HR Accounts</h3>
              <p>{counts.hrs} HR professionals are active in the system.</p>
            </div>
            <div className="admin-info-card">
              <h3>Total Students</h3>
              <p>{counts.students} job seekers have registered profiles.</p>
            </div>
            <div className="admin-info-card">
              <h3>Total Applications</h3>
              <p>{counts.applications} applications have been submitted so far.</p>
            </div>
          </div>
        </div>

        <div className="admin-surface">
          <span className="admin-section-kicker">Distribution</span>
          <h2 className="mt-2 mb-3" style={{ color: "var(--admin-brand-strong)" }}>System breakdown</h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
