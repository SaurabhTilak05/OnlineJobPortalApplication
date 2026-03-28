import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaClock,
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

      UserJobservice.getAppliedJobs(seekerId)
        .then((res) => {
          const appliedList = Array.isArray(res.data)
            ? res.data.map((job) => job.job_id)
            : [];
          setAppliedJobs(appliedList);
        })
        .catch((err) => {
          console.error("Error fetching applied jobs:", err);
          setAppliedJobs([]);
        });
    }
  }, [seekerId, isUserView]);

  const getDaysUntilDeadline = (deadline) => {
    if (!deadline) return null;

    const today = new Date();
    const [year, month, day] = String(deadline).split("-").map(Number);
    const deadlineDate =
      year && month && day
        ? new Date(year, month - 1, day)
        : new Date(deadline);

    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    if (Number.isNaN(deadlineDate.getTime())) {
      return null;
    }

    return Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  };

  const getDeadlineState = (deadline) => {
    const daysLeft = getDaysUntilDeadline(deadline);

    if (daysLeft === null) {
      return "open";
    }

    if (daysLeft < 0) {
      return "expired";
    }

    if (daysLeft <= 3) {
      return "close";
    }

    return "open";
  };

  const formatDeadline = (deadline) => {
    if (!deadline) {
      return "Open until filled";
    }

    const [year, month, day] = String(deadline).split("T")[0].split("-").map(Number);
    const parsedDate =
      year && month && day
        ? new Date(year, month - 1, day)
        : new Date(deadline);

    if (Number.isNaN(parsedDate.getTime())) {
      return deadline;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleApply = (job) => {
    const deadlineState = getDeadlineState(job.deadline);

    if (deadlineState === "close" || deadlineState === "expired") {
      toast.warning("Deadline is close. You don't apply for this job.");
      return;
    }

    if (!seekerId) {
      toast.error("Please login as a student first!");
      return;
    }

    if (profileCompletion < 30) {
      toast.warning("Complete at least 30% of your profile to apply!");
      return;
    }

    UserJobservice.applyJob(job.job_id)
      .then((res) => {
        if (res.data.success) {
          toast[res.data.message.toLowerCase().includes("already") ? "warning" : "success"](
            res.data.message
          );
          setAppliedJobs((prev) =>
            prev.includes(job.job_id) ? prev : [...prev, job.job_id]
          );
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
  const latestDeadline = jobs
    .map((job) => job.deadline)
    .filter(Boolean)
    .sort()[0];

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
          <div className="jobs-hero-tags">
            <span>{uniqueCompanies} companies hiring</span>
            <span>{totalOpenings} openings available</span>
            {isUserView && <span>Profile completion: {profileCompletion}%</span>}
          </div>
        </div>
        <aside className="jobs-hero-badge">
          <span>Visible now</span>
          <strong>{searchResultsLabel}</strong>
          <p>{latestDeadline ? `Nearest deadline: ${latestDeadline}` : "Fresh roles are ready to explore."}</p>
        </aside>
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
          <div className="jobs-toolbar-copy">
            <h2>{isAdminView ? "Role directory" : "Browse live opportunities"}</h2>
            <p>
              {isAdminView
                ? "Review all roles posted across the platform."
                : "Search smartly, compare openings, and apply to roles that match your profile."}
            </p>
          </div>
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
                {getDeadlineState(job.deadline) === "close" && (
                  <div className="jobs-status-chip jobs-status-chip-warning">
                    <FaClock />
                    <span>Deadline close</span>
                  </div>
                )}

                {getDeadlineState(job.deadline) === "expired" && (
                  <div className="jobs-status-chip jobs-status-chip-expired">
                    <FaClock />
                    <span>Deadline expired</span>
                  </div>
                )}

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
                    <span>Deadline: {formatDeadline(job.deadline)}</span>
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

                <div className="jobs-card-footer-note">
                  <FaCheckCircle />
                  <span>{isUserView ? "Apply once your profile is ready." : "Visible to all active students."}</span>
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
                  ) : getDeadlineState(job.deadline) === "close" || getDeadlineState(job.deadline) === "expired" ? (
                    <button
                      type="button"
                      className="btn jobs-apply-btn jobs-apply-btn-warning mt-auto"
                      onClick={() => handleApply(job)}
                    >
                      <FaClock />
                      Deadline Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn jobs-apply-btn mt-auto"
                      onClick={() => handleApply(job)}
                    >
                      Apply now
                      <FaArrowRight />
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
