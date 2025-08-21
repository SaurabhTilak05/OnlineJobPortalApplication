// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { FaUsers, FaUserGraduate, FaClipboardList } from "react-icons/fa";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ hrs: 0, students: 0, applications: 0 });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [hrRes, studentRes, appRes] = await Promise.all([
          fetch("http://localhost:8080/count/hr"),
          fetch("http://localhost:8080/count/students"),
          fetch("http://localhost:8080/count/applications"),
        ]);
        const hr = await hrRes.json();
        const students = await studentRes.json();
        const apps = await appRes.json();
        setCounts({
          hrs: hr.total || 0,
          students: students.total || 0,
          applications: apps.total || 0,
        });
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    }
    fetchCounts();
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
      title: "HRs Registered",
      count: counts.hrs,
      icon: <FaUsers size={40} />,
      bg: "linear-gradient(135deg, #0d6efd, #6610f2)",
    },
    {
      title: "Students Enrolled",
      count: counts.students,
      icon: <FaUserGraduate size={40} />,
      bg: "linear-gradient(135deg, #20c997, #0dcaf0)",
    },
    {
      title: "Applications Received",
      count: counts.applications,
      icon: <FaClipboardList size={40} />,
      bg: "linear-gradient(135deg, #fd7e14, #ffc107)",
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <h2 className="fw-bold mb-4 text-center text-primary">📊 Admin Dashboard</h2>
      <p className="text-center text-muted mb-5 fs-5">
        Overview of HRs, Students, and Applications in your portal.
      </p>

      <div className="row g-4 justify-content-center">
        {cards.map((card, i) => (
          <div className="col-md-4" key={i}>
            <div
              style={{ ...cardStyle, background: card.bg }}
              className="text-center"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
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
