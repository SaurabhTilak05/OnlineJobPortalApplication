import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers, FaBriefcase, FaUserPlus, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import AddJob from "./AddJob.jsx"; // Nested AddJob component
import AddJObService from "../service/addjobserv.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const navigate = useNavigate();

  const hrId = localStorage.getItem("hrId");
  const role = localStorage.getItem("role");

  // Redirect if not HR
  useEffect(() => {
    if (!hrId || role !== "hr") {
      navigate("/signup");
    }
  }, [navigate, hrId, role]);

  // Fetch jobs for this HR
  const fetchJobs = async () => {
    try {
      const res = await AddJObService.getAllJobs(); // Backend should filter by HR if needed
      setJobs(res.data);
    } catch (err) {
      setMsg("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("hrId");
    navigate("/signup");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-wrapper d-flex min-vh-100">
      {/* Sidebar */}
      <nav className={`sidebar bg-dark text-white p-3 ${sidebarOpen ? "open" : ""}`}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>HR Panel</h4>
          <button className="btn btn-light d-lg-none" onClick={toggleSidebar}><FaTimes /></button>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => setShowAddJob(false)}>
              <FaUsers className="me-2" /> Dashboard
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => setShowAddJob(true)}>
              <FaBriefcase className="me-2" /> Post a Job
            </button>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/view-applicants" className="nav-link text-white">
              <FaUserPlus className="me-2" /> View Applicants
            </NavLink>
          </li>
          <li className="nav-item mt-3">
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              <FaSignOutAlt className="me-1" /> Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4 position-relative">
        <button className="btn btn-dark mb-3 d-lg-none" onClick={toggleSidebar}>
          <FaBars /> Menu
        </button>

        {showAddJob ? (
          <AddJob onJobAdded={fetchJobs} /> // Render AddJob component
        ) : (
          <>
            <h2 className="mb-4">Welcome, HR!</h2>

            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div className="card shadow-sm text-center border-0 rounded-4 bg-primary text-white p-3">
                  <h6>Total Jobs</h6>
                  <p className="fs-3">{jobs.length || 0}</p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card shadow-sm text-center border-0 rounded-4 bg-success text-white p-3">
                  <h6>Applicants</h6>
                  <p className="fs-3">{jobs.reduce((sum, job) => sum + (job.applicants_count || 0), 0)}</p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card shadow-sm text-center border-0 rounded-4 bg-warning text-dark p-3">
                  <h6>Interviews Scheduled</h6>
                  <p className="fs-3">0</p>
                </div>
              </div>
            </div>

            <h4 className="mb-3">Recent Job Posts</h4>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <div className="table-responsive shadow-sm rounded-4 overflow-hidden">
              <table className="table table-striped mb-0">
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
                        <td>{new Date(job.deadline).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No jobs available</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Outlet />
            </div>
          </>
        )}
      </div>

      {sidebarOpen && <div className="overlay d-lg-none" onClick={toggleSidebar}></div>}

      <style>{`
        .dashboard-wrapper { display:flex; flex-direction:row; min-height:100vh; }
        .sidebar { width:250px; transition: transform 0.3s ease; min-height:100vh; }
        .sidebar.open { transform: translateX(0); }
        @media (max-width:991px) { .sidebar { position:fixed; left:0; top:0; transform:translateX(-100%); z-index:1050; width:200px; } }
        .main-content { flex-grow:1; width:100%; }
        .overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:1040; }
      `}</style>
    </div>
  );
}
