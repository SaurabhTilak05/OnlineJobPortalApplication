import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome, FaBriefcase, FaFileAlt, FaUser, FaSignOutAlt } from "react-icons/fa";

// Example service call (replace URL with your API endpoint)
const fetchJobs = async () => {
  const res = await fetch("http://localhost:8080/viewAllJobs"); //  adjust API
  return res.json();
};

export default function UserDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white vh-100 p-3">
          <h4 className="text-center mb-4">User Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <NavLink className="nav-link text-white" to="/user/home">
                <FaHome className="me-2" /> Home
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link text-white" to="/user/jobs">
                <FaBriefcase className="me-2" /> View Jobs
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link text-white" to="/user/applications">
                <FaFileAlt className="me-2" /> My Applications
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link text-white" to="/user/profile">
                <FaUser className="me-2" /> Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/logout">
                <FaSignOutAlt className="me-2" /> Logout
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h2>Available Jobs</h2>
          <div className="row">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.job_id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{job.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {job.company}
                      </h6>
                      <p className="card-text">
                        <strong>Location:</strong> {job.location} <br />
                        <strong>Experience:</strong> {job.experience_required} yrs <br />
                        <strong>Package:</strong> {job.package} LPA <br />
                        <strong>Deadline:</strong>{" "}
                        {new Date(job.deadline).toLocaleDateString()}
                      </p>
                      <button className="btn btn-primary w-100">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No jobs available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
