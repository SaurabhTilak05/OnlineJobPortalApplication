import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";   // ✅ added useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import AddJObService from "../service/addjobserv.js";
import { FaUsers, FaBriefcase, FaUserPlus, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export default function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();  // ✅ initialize navigate

  useEffect(() => {
    AddJObService.getAllJobs()
      .then((res) => setJobs(res.data))
      .catch(() => setMsg("Failed to fetch jobs"));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => {
    if (window.innerWidth < 992) setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signup");   // ✅ will redirect properly
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <nav className={`sidebar bg-dark text-white ${isSidebarOpen ? "open" : ""}`}>
        <div className="d-flex justify-content-between align-items-center p-3 mb-4">
          <h4 className="m-0">HR Panel</h4>
          <button className="btn btn-sm btn-outline-light d-lg-none" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="nav flex-column p-2">
          <li className="nav-item mb-2">
            <NavLink to="/hrdashboard" className="nav-link text-white" onClick={closeSidebar}>
              <FaUsers className="me-2" /> Dashboard
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/addjob" className="nav-link text-white" onClick={closeSidebar}>
              <FaBriefcase className="me-2" /> Post a Job
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/manage-jobs" className="nav-link text-white" onClick={closeSidebar}>
              <FaBriefcase className="me-2" /> Manage Jobs
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/view-applicants" className="nav-link text-white" onClick={closeSidebar}>
              <FaUserPlus className="me-2" /> View Applicants
            </NavLink>
          </li>
          <li className="nav-item mt-3">
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              <FaSignOutAlt className="me-1" /> Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content p-4">
        {/* Mobile Toggle */}
        <button className="btn btn-dark mb-3 d-lg-none" onClick={toggleSidebar}>
          <FaBars /> Menu
        </button>

        <h2 className="mb-4">Welcome, HR!</h2>

        {/* Dashboard Cards */}
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card text-white bg-primary shadow-sm rounded-4">
              <div className="card-body text-center">
                <h6>Total Jobs</h6>
                <p className="fs-3">{jobs.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card text-white bg-success shadow-sm rounded-4">
              <div className="card-body text-center">
                <h6>Applicants</h6>
                <p className="fs-3">{jobs.reduce((sum, job) => sum + (job.applicants_count || 0), 0)}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card text-white bg-warning shadow-sm rounded-4">
              <div className="card-body text-center">
                <h6>Interviews Scheduled</h6>
                <p className="fs-3">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs Table */}
        <div className="mt-5">
          <h4>Recent Job Posts</h4>
          {msg && <div className="alert alert-danger">{msg}</div>}
          <div className="table-responsive">
            <table className="table table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Sr.No</th>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Applicants</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length > 0 ? (
                  jobs.slice(-5).reverse().map((job, index) => (
                    <tr key={job.job_id}>
                      <td>{index + 1}</td>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.applicants_count || 0}</td>
                      <td>{new Date(job.deadline).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No jobs available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay d-lg-none" onClick={toggleSidebar}></div>}

      {/* CSS */}
      <style>{`
        .dashboard-wrapper {
          display: flex;
          min-height: 100vh;
        }
        .sidebar {
          width: 250px;
          min-height: 100vh;
          transition: transform 0.3s ease-in-out;
        }
        .main-content {
          flex-grow: 1;
          width: 100%;
        }
        @media (max-width: 991px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 200px;
            height: 100%;
            transform: translateX(-100%);
            z-index: 1050;
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-content {
            width: 100%;
          }
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.4);
            z-index: 1040;
          }
        }
      `}</style>
    </div>
  );
}
