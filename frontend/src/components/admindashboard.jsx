import React, { useEffect, useState } from "react";
import { FaUsers, FaUserGraduate, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ hrs: 0, students: 0, applications: 0 });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [hrRes, stRes, appRes] = await Promise.all([
          fetch("http://localhost:8080/count/hr"),
          fetch("http://localhost:8080/count/students"),
          fetch("http://localhost:8080/count/applications"),
        ]);
        const hr = await hrRes.json();
        const students = await stRes.json();
        const apps = await appRes.json();
        setCounts({
          hrs: hr.total || 0,
          students: students.total || 0,
          applications: apps.total || 0,
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchCounts();
  }, []);

  const cards = [
    { title: "HRs Registered", count: counts.hrs, icon: <FaUsers size={50} />, bg: "primary", path: "viewshr" },
    { title: "Students Enrolled", count: counts.students, icon: <FaUserGraduate size={50} />, bg: "success", path: "register-student" },
    { title: "Applications Received", count: counts.applications, icon: <FaClipboardList size={50} />, bg: "warning", path: "view-jobs" },
  ];

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center text-primary fw-bold mb-3">Admin Dashboard</h2>
      <p className="text-center text-muted fs-5 mb-5">Overview of HRs, Students, and Applications</p>
      <div className="row g-4 justify-content-center">
        {cards.map((c, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div
              className={`card text-white text-center bg-${c.bg} shadow-lg dashboard-card`}
              onClick={() => navigate(`/adminhome/${c.path}`)}
            >
              <div className="mb-3">{c.icon}</div>
              <h3 className="fw-bold">{c.count}</h3>
              <p className="fs-5">{c.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
