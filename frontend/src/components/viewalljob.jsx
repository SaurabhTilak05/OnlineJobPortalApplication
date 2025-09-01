import { useState, useEffect } from "react";
import Jobservice from "../service/Jobservice.js";
import UpdateJob from "./updateJob.jsx";
import { Outlet, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewAllJob.css";

export default function ViewAllJob() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");
  const [expanded, setExpanded] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    Jobservice.getAllJobs()
      .then((result) => setJobs(result.data))
      .catch((err) => {
        setMsg("Failed to fetch jobs");
        console.error(err);
      });
  };

  const toggleDescription = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs((prev) =>
      prev.map((job) => (job.job_id === updatedJob.job_id ? updatedJob : job))
    );
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await Jobservice.deleteJob(jobId);
        setJobs((prev) => prev.filter((job) => job.job_id !== jobId));
        toast.success("Job deleted successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete job.");
      }
    }
  };

  // ✅ Search handler (calls backend)
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      fetchJobs(); // Reload all jobs if cleared
    } else {
      Jobservice.searchJobs(value)
        .then((result) => setJobs(result.data))
        .catch((err) => {
          console.error(err);
          toast.error("Search failed!");
        });
    }
  };

  const limit = 20;

  return (
    <div
      className="job-container py-5"
      style={{ background: "linear-gradient(135deg, #f8fafc, #e2e8f0)" }}
    >
      <div className="container">
        <h2 className="text-center fw-bold text-dark mb-4">
          <span role="img" aria-label="pin">
            📌
          </span>{" "}
          Posted Jobs
        </h2>

        {/* ✅ Search Box */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control rounded-3 shadow-sm"
              placeholder="🔍 Search by title, company, location, or skills..."
              value={searchTerm}
              onChange={handleSearch} // ✅ calls backend search
            />
          </div>
        </div>

        {msg && <div className="alert alert-danger text-center">{msg}</div>}

        <div className="row g-4">
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
                  <div
                    className="card job-card shadow-lg border-0 rounded-4 h-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold text-primary mb-2">
                        {job.title}
                      </h5>

                      <p className="text-muted small mb-2">
                        <i className="bi bi-building me-1"></i> {job.company}{" "}
                        <br />
                        <i className="bi bi-geo-alt me-1"></i> {job.location}
                      </p>

                      <div className="mb-2">
                        <span className="badge bg-info text-dark me-2">
                          {job.opening} Openings
                        </span>
                        <span className="badge bg-warning text-dark me-2">
                          {job.experience_required} yrs Exp
                        </span>
                        <span className="badge bg-secondary">
                          ₹ {job.package} LPA
                        </span>
                      </div>

                      <p className="mb-2 small">
                        <strong>Applied:</strong>{" "}
                        <span className="badge bg-success">
                          {job.applicant_count ?? 0} Candidates
                        </span>
                      </p>

                      <div className="mb-2 small">
                        <strong>Skills:</strong>{" "}
                        {job.skills_required ? (
                          job.skills_required.split(",").map((skill, idx) => (
                            <span
                              key={idx}
                              className="badge bg-light text-dark border me-1 mb-1"
                            >
                              {skill.trim()}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted">Not specified</span>
                        )}
                      </div>

                      <p className="small text-justify">
                        <strong>Description:</strong>{" "}
                        <span className="desc-text">{description}</span>
                        {job.description && job.description.length > limit && (
                          <button
                            className="btn btn-link p-0 ms-1 text-decoration-none"
                            onClick={() => toggleDescription(index)}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}
                      </p>

                      <div className="mt-auto">
                        <p className="deadline-text fw-semibold small mb-3 text-danger">
                          <i className="bi bi-calendar-event me-2"></i>
                          Deadline:{" "}
                          {new Date(job.deadline).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p>
                          <Link
                            to={`applicants/${job.job_id}`}
                            className="btn-outline-success rounded-3"
                          >
                            👥 View Applicants
                          </Link>
                        </p>

                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-outline-primary flex-fill rounded-3"
                            onClick={() => setSelectedJob(job)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-outline-danger flex-fill rounded-3"
                            onClick={() => handleDelete(job.job_id)}
                          >
                            Delete
                          </button>
                        </div>
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

      {/* ✅ Modal */}
      {selectedJob && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content rounded-4 shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">✏️ Update Job</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedJob(null)}
                ></button>
              </div>
              <div className="modal-body">
                <UpdateJob
                  job={selectedJob}
                  onClose={() => setSelectedJob(null)}
                  onUpdated={handleJobUpdated}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <Outlet /> {/* 👈 required for nested routes */}
      </div>
    </div>
  );
}
