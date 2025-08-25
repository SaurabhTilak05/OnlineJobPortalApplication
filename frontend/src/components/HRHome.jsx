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
    <div className="container">
      <h2 className="mb-4">Welcome, HR!</h2>

      {/* Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card text-center shadow-sm border-0 rounded-3 bg-primary text-white p-3">
            <h6>Total Jobs</h6>
            <p className="fs-3">{jobs.length || 0}</p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-center shadow-sm border-0 rounded-3 bg-success text-white p-3">
            <h6>Applicants</h6>
            <p className="fs-3">
              {jobs.reduce((sum, job) => sum + (job.applicant_count || 0), 0)}
            </p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-center shadow-sm border-0 rounded-3 bg-warning text-dark p-3">
            <h6>Interviews Scheduled</h6>
            <p className="fs-3">0</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <h4 className="mb-3">Recent Job Posts</h4>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <div className="table-responsive shadow-sm rounded-3">
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
              jobs
                .slice(-5)
                .reverse()
                .map((job, idx) => (
                  <tr key={job.job_id || idx}>
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
                <td colSpan="5" className="text-center text-muted">
                  No jobs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
