import { useState, useEffect, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import Jobservice from "../service/Jobservice.js";
import UpdateJob from "./updateJob.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewAllJob.css";

export default function ViewAllJob() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");
  const [expanded, setExpanded] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const currentHrId = localStorage.getItem("hrId");

  const fetchJobs = useCallback(() => {
    Jobservice.getAllJobs()
      .then((result) => {
        const hrJobs = result.data.filter((job) => job.hr_id == currentHrId);
        setJobs(hrJobs);
      })
      .catch((err) => {
        setMsg("Failed to fetch jobs.");
        console.error(err);
      });
  }, [currentHrId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

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
        toast.success("Job deleted successfully.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete job.");
      }
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      fetchJobs();
      return;
    }

    Jobservice.searchJobs(value)
      .then((result) => {
        const hrJobs = result.data.filter((job) => job.hr_id == currentHrId);
        setJobs(hrJobs);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Search failed.");
      });
  };

  const limit = 120;

  return (
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Job History</span>
          <h1 className="hr-page-title">Manage posted jobs</h1>
          <p className="hr-page-subtitle">
            Review every opening you’ve published, update details, and quickly jump to applicant lists.
          </p>
        </div>
        <div className="hr-page-chip">
          <span>{jobs.length} active records</span>
        </div>
      </section>

      <section className="hr-surface-card hr-table-card">
        <div className="hr-table-toolbar">
          <div className="hr-search-wrap">
            <FaSearch />
            <input
              type="text"
              className="form-control hr-search-input"
              placeholder="Search by title, company, location, or skills"
              value={searchTerm}
              onChange={handleSearch}
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
                    : `${job.description.slice(0, limit)}...`
                  : job.description || "";

              return (
                <div className="col-12 col-md-6 col-xl-4" key={job.job_id ?? index}>
                  <article className="hr-job-history-card">
                    <div className="hr-job-history-top">
                      <div>
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                      </div>
                      <span className="hr-soft-badge">
                        <FaMapMarkerAlt className="me-2" />
                        {job.location}
                      </span>
                    </div>

                    <div className="hr-job-tag-row">
                      <span className="hr-soft-badge">{job.opening} openings</span>
                      <span className="hr-soft-badge">{job.experience_required} exp</span>
                      <span className="hr-soft-badge">₹ {job.package}</span>
                    </div>

                    <p className="hr-job-description">
                      {description}
                      {job.description && job.description.length > limit && (
                        <button className="btn btn-link p-0 ms-1 text-decoration-none" onClick={() => toggleDescription(index)}>
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                    </p>

                    <div className="hr-skill-list">
                      {job.skills_required ? (
                        job.skills_required.split(",").map((skill, idx) => (
                          <span key={idx} className="hr-skill-pill">
                            {skill.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">No skills specified</span>
                      )}
                    </div>

                    <div className="hr-job-history-meta">
                      <p><strong>Applicants:</strong> {job.applicant_count ?? 0}</p>
                      <p>
                        <strong>Deadline:</strong>{" "}
                        {new Date(job.deadline).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="hr-card-actions">
                      <Link to={`applicants/${job.job_id}`} className="btn hr-inline-btn">
                        View Applicants
                      </Link>
                      <button className="btn hr-outline-btn" onClick={() => setSelectedJob(job)}>
                        Update
                      </button>
                      <button className="btn hr-danger-btn" onClick={() => handleDelete(job.job_id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                </div>
              );
            })
          ) : (
            <div className="hr-empty-state">No jobs found.</div>
          )}
        </div>
      </section>

      {selectedJob && (
        <div className="modal fade show d-block hr-modal-backdrop" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered hr-update-modal-dialog" role="document">
            <div className="modal-content rounded-4 shadow-lg border-0 hr-custom-modal">
              <div className="modal-header hr-custom-modal-header">
                <h5 className="modal-title">Update job</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedJob(null)}></button>
              </div>
              <div className="modal-body hr-custom-modal-body">
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

      <Outlet />
    </div>
  );
}
