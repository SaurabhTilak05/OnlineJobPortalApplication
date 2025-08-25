// src/components/HRHome.jsx
import React, { useEffect, useState } from "react";
import AddJObService from "../service/addjobserv.js";

export default function HRHome() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await AddJObService.getAllJobs();
      setJobs(res.data || []);
    } catch (err) {
      setMsg("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div
      className="min-vh-100 py-4 px-3 px-md-5"
      style={{
        background: "linear-gradient(135deg, #f0f4ff, #e6f7f7)",
      }}
    >
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-primary">Welcome, HR 👋</h2>
          <p className="text-muted mb-0">
            Manage your job postings and applicants here.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card text-center shadow-sm border-0 rounded-4 bg-primary text-white p-3 h-100">
            <h6 className="mb-1">Total Jobs</h6>
            <p className="fs-3 fw-bold mb-0">{jobs.length || 0}</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card text-center shadow-sm border-0 rounded-4 bg-success text-white p-3 h-100">
            <h6 className="mb-1">Total Applicants</h6>
            <p className="fs-3 fw-bold mb-0">
              {jobs.reduce((sum, job) => sum + (job.applicant_count || 0), 0)}
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card text-center shadow-sm border-0 rounded-4 bg-warning text-dark p-3 h-100">
            <h6 className="mb-1">Interviews Scheduled</h6>
            <p className="fs-3 fw-bold mb-0">0</p>
          </div>
        </div>
      </div>

      {/* Recent Job Posts Table */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-header bg-primary text-white fw-semibold rounded-top-4">
          Recent Job Posts
        </div>
        <div className="table-responsive">
          <table className="table table-striped mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Job Title</th>
                <th scope="col">Company</th>
                <th scope="col">Applicants</th>
                <th scope="col">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs
                  .slice(-5)
                  .reverse()
                  .map((job, idx) => (
                    <tr key={job.job_id || idx}>
                      <td>{idx + 1}</td>
                      <td className="fw-semibold text-primary">{job.title}</td>
                      <td>{job.company}</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {job.applicant_count || 0}
                        </span>
                      </td>
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
      </div>

      {/* Error Message */}
      {msg && (
        <div className="alert alert-danger mt-3 shadow-sm rounded-3">
          {msg}
        </div>
      )}
    </div>
  );
}
