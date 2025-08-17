import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUsers, FaBriefcase, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import AddJObService from "../service/addjobserv.js"; // ✅ check path

export default function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    AddJObService.getAllJobs()
      .then((res) => {
        setJobs(res.data); 
      })
      .catch((err) => {
        setMsg("Failed to fetch jobs");
        console.error(err);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100 p-3">
          <h3 className="mb-4 text-center">HR Dashboard</h3>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <NavLink to="/hr-dashboard" className="nav-link text-white">
                <FaUsers className="me-2" /> Dashboard
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/addjob" className="nav-link text-white">
                <FaBriefcase className="me-2" /> Post a Job
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/manage-jobs" className="nav-link text-white">
                <FaBriefcase className="me-2" /> Manage Jobs
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/view-applicants" className="nav-link text-white">
                <FaUserPlus className="me-2" /> View Applicants
              </NavLink>
            </li>
            <li className="nav-item mt-3">
              <NavLink to="/logout" className="nav-link text-danger">
                <FaSignOutAlt className="me-2" /> Logout
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h2 className="mb-4">Welcome, HR!</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card text-white bg-primary shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="card-title">Total Jobs</h5>
                  <p className="card-text fs-3">{jobs.length}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-white bg-success shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="card-title">Applicants</h5>
                  <p className="card-text fs-3">
                    {/* sum of applicants_count */}
                    {jobs.reduce((sum, job) => sum + (job.applicants_count || 0), 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-white bg-warning shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="card-title">Interviews Scheduled</h5>
                  <p className="card-text fs-3">8</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h4>Recent Job Posts</h4>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Applicants</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length > 0 ? (
                  jobs
                    .slice(-5) // ✅ show only latest 5 jobs
                    .reverse()
                    .map((job) => (
                      <tr key={job.id}>
                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.applicants_count || 0}</td>
                        <td>{job.deadline}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No jobs available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
