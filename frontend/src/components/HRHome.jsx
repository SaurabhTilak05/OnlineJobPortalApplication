// src/components/HRHome.jsx
import React, { useEffect, useState } from "react";
import HRService from "../service/HrService.js";
import { FaBriefcase, FaUsers, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HRHome() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await HRService.getRecentJobsByHR();
      setJobs(res.data || []); // backend returns array
    } catch (err) {
      setMsg("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div
      className="min-vh-100 py-4 px-2 px-md-5"
      style={{
        background: "linear-gradient(135deg, #f8f9fbff, #fefefeff)",
      }}
    >
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1 fs-4 fs-md-2">Welcome, HR 👋</h2>
          <p className="text-muted mb-0 fs-6">
            Manage your job postings and applicants here.
          </p>
        </div>
      </div>

      {/* Stats with Navigation */}
      <div className="row g-3 g-md-4 mb-4">
        {/* Total Jobs */}
        <div
          className="col-6 col-md-4"
          onClick={() => navigate("/hrdashboard/job-history")}
          style={{ cursor: "pointer" }}
        >
          <div className="card text-center border-0 shadow-sm rounded-4 p-3 p-md-4 h-100 bg-white hover-shadow">
            <div className="text-primary mb-1 mb-md-2">
              <FaBriefcase size={28} />
            </div>
            <h6 className="mb-1 text-muted fs-7 fs-md-6">Total Jobs</h6>
            <p className="fs-5 fw-bold text-dark mb-0">{jobs.length || 0}</p>
          </div>
        </div>

        {/* Applicants */}
        <div
          className="col-6 col-md-4"
          onClick={() => navigate("/hrdashboard/view-applicants")}
          style={{ cursor: "pointer" }}
        >
          <div className="card text-center border-0 shadow-sm rounded-4 p-3 p-md-4 h-100 bg-white hover-shadow">
            <div className="text-success mb-1 mb-md-2">
              <FaUsers size={28} />
            </div>
            <h6 className="mb-1 text-muted fs-7 fs-md-6">Applicants</h6>
            <p className="fs-5 fw-bold text-dark mb-0">
              {jobs.reduce((sum, job) => sum + (job.applicant_count || 0), 0)}
            </p>
          </div>
        </div>

        {/* Interviews */}
        <div
          className="col-12 col-md-4"
          onClick={() => navigate("/hrdashboard/view-schedule")}
          style={{ cursor: "pointer" }}
        >
          <div className="card text-center border-0 shadow-sm rounded-4 p-3 p-md-4 h-100 bg-white hover-shadow">
            <div className="text-warning mb-1 mb-md-2">
              <FaCalendarCheck size={28} />
            </div>
            <h6 className="mb-1 text-muted fs-7 fs-md-6">Interviews</h6>
            <p className="fs-5 fw-bold text-dark mb-0">
              {jobs.reduce((sum, job) => sum + (job.interview_count || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Jobs List - Mobile Cards & Desktop Table */}
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="card-header bg-dark text-white fw-semibold fs-6 fs-md-5">
          Recent Job Posts
        </div>

        {/* Desktop Table */}
        <div className="table-responsive d-none d-md-block p-3">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
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
                jobs
                  .slice(-5)
                  .reverse()
                  .map((job, idx) => (
                    <tr
                      key={job.job_id || idx}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/hr/job/${job.job_id}`)}
                    >
                      <td>{idx + 1}</td>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.applicant_count || 0}</td>
                      <td>
                        {job.deadline
                          ? new Date(job.deadline).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No jobs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="d-md-none p-2">
          {jobs.length > 0 ? (
            jobs
              .slice(-5)
              .reverse()
              .map((job, idx) => (
                <div
                  key={job.job_id || idx}
                  className="border rounded-3 shadow-sm bg-white p-3 mb-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/hr/job/${job.job_id}`)}
                >
                  <h6 className="fw-bold text-primary mb-1">{job.title}</h6>
                  <p className="text-muted mb-1 small">{job.company}</p>
                  <div className="d-flex justify-content-between small">
                    <span>Applicants: {job.applicant_count || 0}</span>
                    <span>
                      Deadline:{" "}
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center text-muted py-3 mb-0">No jobs available</p>
          )}
        </div>
      </div>

      {/* Error */}
      {msg && (
        <div className="alert alert-danger mt-4 shadow-sm rounded-3 text-center fs-6">
          {msg}
        </div>
      )}
    </div>
  );
}
