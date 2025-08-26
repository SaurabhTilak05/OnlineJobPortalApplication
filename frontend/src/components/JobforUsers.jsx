// src/components/ViewJobs.jsx
import React, { useEffect, useState } from "react";
import  AdminAuthService from "../service/AdminAuthService.js";

export default function JobforUsers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJob, setExpandedJob] = useState(null);

  useEffect(() => {
    AdminAuthService.getAllJobs()
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch jobs");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">⏳ Loading jobs...</p>;
  if (error) return <p className="text-center text-danger mt-5">❌ {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-primary text-center mb-4">💼 Available Jobs</h2>
      

      <div className="row g-4">
        {jobs.length === 0 ? (
          <p className="text-center">No jobs available</p>
        ) : (
          jobs.map((job) => (
            <div className="col-md-4" key={job.job_id}>
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text flex-grow-1">
                    📍 <strong>Location:</strong> {job.location} <br />
                    🏢 <strong>Openings:</strong> {job.opening || "N/A"} <br />
                    ⏳ <strong>Experience:</strong>{" "}
                    {job.experience_required
                      ? `${job.experience_required} years`
                      : "Fresher"}{" "}
                    <br />
                    💰 <strong>Package:</strong> {job.package || "Not Disclosed"} <br />
                    🛠 <strong>Skills:</strong> {job.skills_required || "Not Specified"} <br />
                    📝 <strong>Description:</strong>{" "}
                    {expandedJob === job.job_id ? (
                      <>
                        {job.description}{" "}
                        <button
                          className="btn btn-link p-0"
                          onClick={() => setExpandedJob(null)}
                        >
                          Show Less
                        </button>
                      </>
                    ) : (
                      <>
                        {job.description?.substring(0, 60)}...
                        <button
                          className="btn btn-link p-0"
                          onClick={() => setExpandedJob(job.job_id)}
                        >
                          Read More
                        </button>
                      </>
                    )}
                    <br />
                    📅 <strong>Deadline:</strong> {job.deadline}
                  </p>
                  <button className="btn btn-success w-100 mt-auto">
                    🚀 Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
