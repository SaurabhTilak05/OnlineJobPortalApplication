import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUsers, FaBriefcase, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

export default function HRDashboard() {
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
                  <p className="card-text fs-3">12</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-white bg-success shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="card-title">Applicants</h5>
                  <p className="card-text fs-3">45</p>
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
                <tr>
                  <td>Software Engineer</td>
                  <td>TechCorp</td>
                  <td>20</td>
                  <td>25 Aug 2025</td>
                </tr>
                <tr>
                  <td>Frontend Developer</td>
                  <td>Webify</td>
                  <td>12</td>
                  <td>30 Aug 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
