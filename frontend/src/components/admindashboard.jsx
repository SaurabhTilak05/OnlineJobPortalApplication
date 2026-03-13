import React, { useEffect, useState } from "react";
import { FaUsers, FaUserGraduate, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import AdminDashboardService from "../service/admindashboardserv.js";

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

  // Updated 2026-03-13: call hooks at the component top level to follow React hook rules.
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
      icon: <FaUsers size={50} />,
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
      path: "viewshr",
      tooltip: "View all registered HRs",
      color: "#667eea",
    },
    {
      title: "Students Enrolled",
      count: counts.students,
      animatedCount: animatedCounts.students,
      icon: <FaUserGraduate size={50} />,
      gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
      path: "jobseekers",
      tooltip: "View all registered students",
      color: "#43e97b",
    },
    {
      title: "Applications Received",
      count: counts.applications,
      animatedCount: animatedCounts.applications,
      icon: <FaClipboardList size={50} />,
      gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
      path: "application",
      tooltip: "View all job applications",
      color: "#f7971e",
    },
  ];

  const pieData = [
    { name: "HRs", value: counts.hrs, color: "#667eea" },
    { name: "Students", value: counts.students, color: "#43e97b" },
    { name: "Applications", value: counts.applications, color: "#f7971e" },
  ];

  const colors = pieData.map((d) => d.color);
  const maxCount = Math.max(...cards.map((card) => card.count), 1);

  return (
    <div className="container-fluid mt-5">
      <h2 className="text-center text-primary fw-bold mb-3">Admin Dashboard</h2>
      <p className="text-center text-muted fs-5 mb-5">
        Overview of HRs, Students, and Applications
      </p>

      <div className="row g-4 justify-content-center">
        {cards.map((c, idx) => (
          <div className="col-12 col-sm-6 col-lg-4" key={idx}>
            <div
              className="dashboard-card shadow-lg text-white text-center p-4"
              onClick={() => navigate(`/adminhome/${c.path}`)}
              style={{
                cursor: "pointer",
                borderRadius: "20px",
                background: c.gradient,
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              title={c.tooltip}
            >
              <div className="icon mb-3">{c.icon}</div>
              <h3 className="fw-bold display-5">{c.animatedCount}</h3>
              <p className="fs-5 mt-2">{c.title}</p>

              <div
                className="progress mt-3"
                style={{ height: "8px", borderRadius: "5px" }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${Math.min((c.animatedCount / maxCount) * 100, 100)}%`,
                    backgroundColor: "#ffffff99",
                    transition: "width 1s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-5 justify-content-center">
        <div className="col-12 col-md-6">
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </div>

      <style jsx>{`
        .dashboard-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3) !important;
        }

        .dashboard-card .icon {
          transition: transform 0.3s;
        }

        .dashboard-card:hover .icon {
          transform: scale(1.2) rotate(10deg);
        }

        @media (max-width: 576px) {
          .dashboard-card {
            padding: 30px 15px;
          }
          .display-5 {
            font-size: 2rem;
          }
        }

        @media (min-width: 577px) and (max-width: 768px) {
          .display-5 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
