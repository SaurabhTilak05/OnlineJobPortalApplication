import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaChartLine,
  FaMapMarkerAlt,
  FaSearch,
  FaTools,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import UserJobservice from "../service/userJobServ.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./jobforusers.css";

export default function JobforUsers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJob, setExpandedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const seekerId = localStorage.getItem("seeker_id");
  const role = localStorage.getItem("role");
  const isAdminView = role === "admin";
  const isUserView = role === "user";

  useEffect(() => {
    UserJobservice.getAllJobsuser()
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (seekerId && isUserView) {
      UserJobservice.getProfileCompletion(seekerId)
        .then((res) => {
          setProfileCompletion(res.data.completion || 0);
        })
        .catch((err) => {
          console.error("Error fetching profile completion:", err);
          setProfileCompletion(0);
        });
    }
  }, [seekerId, isUserView]);

  const handleApply = (jobId) => {
    if (!seekerId) {
      toast.error("Please login as a student first!");
      return;
    }

    if (profileCompletion < 30) {
      toast.warning("Complete at least 30% of your profile to apply!");
      return;
    }

    UserJobservice.applyJob(jobId)
      .then((res) => {
        if (res.data.success) {
          toast[res.data.message.toLowerCase().includes("already") ? "warning" : "success"](
            res.data.message
          );
          setAppliedJobs((prev) => [...prev, jobId]);
        } else {
          toast.warning(res.data.message || "Cannot apply for this job");
        }
      })
      .catch((err) => {
        console.error("Error applying job:", err);
        toast.error("Something went wrong. Try again!");
      });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.trimStart();
    if (value.length > 30) {
      toast.warning("Search term too long (max 50 characters)");
      return;
    }

    const validPattern = /^[a-zA-Z0-9\s.,-]*$/;
    if (!validPattern.test(value)) {
      toast.error("Invalid character in search");
      return;
    }

    setSearchTerm(value);
  };

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;

    return (
      job.title?.toLowerCase().includes(searchLower) ||
      job.company?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower) ||
      job.skills_required?.toLowerCase().includes(searchLower)
    );
  });

  const totalOpenings = jobs.reduce((sum, job) => sum + Number(job.opening || 0), 0);
  const uniqueCompanies = new Set(jobs.map((job) => job.company).filter(Boolean)).size;
  const searchResultsLabel =
    filteredJobs.length === jobs.length
      ? `${jobs.length} live roles`
      : `${filteredJobs.length} filtered roles`;

  if (loading) return <p className="text-center mt-5">Loading jobs...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className={`jobs-page ${isAdminView ? "jobs-page-admin" : ""}`}>
      <section className="jobs-hero">
        <div className="jobs-hero-copy">
          <span className="jobs-kicker">{isAdminView ? "Admin Job Board" : "Career Openings"}</span>
          <h1>{isAdminView ? "Monitor live roles across the platform" : "Discover roles that fit your skills"}</h1>
          <p>
            Search by title, company, location, or skills and review every opening from one focused workspace.
          </p>
        </div>
        <div className="jobs-hero-badge">
          <span>Visible now</span>
          <strong>{searchResultsLabel}</strong>
        </div>
      </section>

      <section className="jobs-metrics">
        <article className="jobs-metric-card">
          <div className="jobs-metric-icon">
            <FaBriefcase />
          </div>
          <div>
            <span>Total jobs</span>
            <strong>{jobs.length}</strong>
          </div>
        </article>
        <article className="jobs-metric-card">
          <div className="jobs-metric-icon jobs-metric-accent">
            <FaBuilding />
          </div>
          <div>
            <span>Companies hiring</span>
            <strong>{uniqueCompanies}</strong>
          </div>
        </article>
        <article className="jobs-metric-card">
          <div className="jobs-metric-icon jobs-metric-highlight">
            <FaUsers />
          </div>
          <div>
            <span>Total openings</span>
            <strong>{totalOpenings}</strong>
          </div>
        </article>
        {isUserView && (
          <article className="jobs-metric-card">
            <div className="jobs-metric-icon jobs-metric-soft">
              <FaChartLine />
            </div>
            <div>
              <span>Profile completion</span>
              <strong>{profileCompletion}%</strong>
            </div>
          </article>
        )}
      </section>

      <section className="jobs-surface">
        <div className="jobs-toolbar">
          <div className="jobs-search-wrap">
            <FaSearch />
            <input
              type="text"
              className="form-control jobs-search-input"
              placeholder="Search jobs by title, company, skills, or location"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="jobs-grid">
          {filteredJobs.length === 0 ? (
            <p className="jobs-empty">No jobs found</p>
          ) : (
            filteredJobs.map((job) => (
              <article className="jobs-card" key={job.job_id}>
                <div className="jobs-card-top">
                  <div>
                    <span className="jobs-card-eyebrow">Role #{job.job_id}</span>
                    <h3>{job.title}</h3>
                  </div>
                  <span className="jobs-company-pill">{job.company}</span>
                </div>

                <div className="jobs-meta">
                  <p>
                    <FaMapMarkerAlt />
                    <span>{job.location || "Location not specified"}</span>
                  </p>
                  <p>
                    <FaUsers />
                    <span>{job.opening || "N/A"} openings</span>
                  </p>
                  <p>
                    <FaUserGraduate />
                    <span>{job.experience_required || "Fresher"}</span>
                  </p>
                  <p>
                    <FaCalendarAlt />
                    <span>Deadline: {job.deadline || "Open until filled"}</span>
                  </p>
                </div>

                <div className="jobs-skill-chip">
                  <FaTools />
                  <span>{job.skills_required || "Skills not specified"}</span>
                </div>

                <div className="jobs-package-row">
                  <span>Package</span>
                  <strong>{job.package || "Not disclosed"}</strong>
                </div>

                <div className="jobs-description">
                  <span>Description</span>
                  <p>
                    {expandedJob === job.job_id ? (
                      <>
                        {job.description || "No description provided."}{" "}
                        <button type="button" className="jobs-inline-btn" onClick={() => setExpandedJob(null)}>
                          Show less
                        </button>
                      </>
                    ) : (
                      <>
                        {job.description
                          ? `${job.description.substring(0, 110)}${job.description.length > 110 ? "..." : ""}`
                          : "No description provided."}{" "}
                        {job.description?.length > 110 && (
                          <button
                            type="button"
                            className="jobs-inline-btn"
                            onClick={() => setExpandedJob(job.job_id)}
                          >
                            Read more
                          </button>
                        )}
                      </>
                    )}
                  </p>
                </div>

                {isUserView && (
                  appliedJobs.includes(job.job_id) ? (
                    <button className="btn jobs-apply-btn jobs-apply-btn-disabled mt-auto" disabled>
                      Applied
                    </button>
                  ) : (
                    <button
                      className="btn jobs-apply-btn mt-auto"
                      onClick={() => handleApply(job.job_id)}
                    >
                      Apply now
                    </button>
                  )
                )}
              </article>
            ))
          )}
        </div>
      </section>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
