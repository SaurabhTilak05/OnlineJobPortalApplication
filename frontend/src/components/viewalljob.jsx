import React, { useEffect, useState } from "react";
import AddJobService from "../service/addjobserv.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewAllJob.css"; // custom styles

export default function ViewAllJob() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    AddJobService.getAllJobs()
      .then((result) => setJobs(result.data))
      .catch((err) => {
        setMsg("Failed to fetch jobs");
        console.error(err);
      });
  }, []);

  const toggleDescription = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const limit = 20; 

  return (
    <div className="job-container container py-5">
      <h2 className="text-center fw-bold text-primary mb-5">📌 Posted Jobs</h2>
      {msg && <div className="alert alert-danger text-center">{msg}</div>}

      {/* align-items-start prevents columns from stretching to the tallest */}
      <div className="row g-4 align-items-start">
        {jobs.length > 0 ? (
          jobs.map((job, index) => {
            const isExpanded = !!expanded[index];
            const description =
              job.description && job.description.length > limit
                ? isExpanded
                  ? job.description
                  : job.description.slice(0, limit) + "..."
                : job.description || "";

            return (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={job.job_id ?? index}
              >
                <div className="job-card card shadow-sm border-0 rounded-4">
                  {/* keep flex-column so mt-auto will push deadline+button to bottom of this card only */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark fw-bold mb-2">
                      {job.title}
                    </h5>

                    <p className="card-text small">
                      <strong>Company:</strong> {job.company}
                      <br />
                      <strong>Location:</strong> {job.location}
                    </p>

                    <p className="card-text small">
                      <span className="badge bg-info text-dark me-2">
                        {job.opening} Openings
                      </span>
                      <span className="badge bg-warning text-dark me-2">
                        {job.experience_required} yrs Exp
                      </span>
                      <span className="badge bg-secondary">
                        Package {job.package}L
                      </span>
                    </p>

                    <p className="card-text small">
                      <strong>Skills:</strong> {job.skills_required}
                    </p>

                    <p className="card-text small">
                      <strong>Description:</strong>{" "}
                      <span className="desc-text">{description}</span>
                      {job.description && job.description.length > limit && (
                        <button
                          className="btn btn-link p-0 ms-1 text-primary"
                          onClick={() => toggleDescription(index)}
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>

                    {/* mt-auto keeps these at the bottom of THIS card only */}
                    <div className="mt-auto">
                      <p className="deadline-text fw-semibold small mb-2">
                        <i className="bi bi-calendar-event me-2"></i>
                        <strong>Deadline:</strong>{" "}
                        {new Date(job.deadline).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                      <button className="btn btn-primary w-100 rounded-3">
                        ✏️ Update Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted">No jobs found</p>
        )}
      </div>
    </div>
  );
}
