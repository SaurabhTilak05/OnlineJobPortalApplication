import React, { useEffect, useMemo, useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaTools,
} from "react-icons/fa";
import JobService from "../service/Jobservice";
import "./jobappliedbystudent.css";

const normalizeStatus = (status) => (status || "applied").toLowerCase();

export default function JobAppliedByStudent() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const seekerId = localStorage.getItem("seeker_id");

  useEffect(() => {
    if (!seekerId) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    JobService.getAppliedJobs(seekerId)
      .then((res) => {
        if (res.data.message) {
          setJobs([]);
        } else {
          setJobs(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job history:", err);
        setError("Failed to load job history");
        setLoading(false);
      });
  }, [seekerId]);

  const metrics = useMemo(() => {
    const shortlisted = jobs.filter((job) => normalizeStatus(job.status) === "shortlisted").length;
    const applied = jobs.filter((job) => normalizeStatus(job.status) === "applied").length;
    const companies = new Set(jobs.map((job) => job.company).filter(Boolean)).size;

    return {
      total: jobs.length,
      shortlisted,
      applied,
      companies,
    };
  }, [jobs]);

  const latestApplication = jobs.length
    ? [...jobs]
        .filter((job) => job.applied_at)
        .sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at))[0]
    : null;

  if (loading) return <p className="text-center mt-5">Loading job history...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="applied-jobs-page">
      <section className="applied-jobs-hero">
        <div className="applied-jobs-hero-copy">
          <span className="applied-jobs-kicker">Application History</span>
          <h1>Track every role you have already applied for in one clean workspace.</h1>
          <p>
            Review your application journey, monitor statuses, and keep a clear record of the companies
            and roles you have pursued.
          </p>
          <div className="applied-jobs-hero-tags">
            <span>{metrics.total} total applications</span>
            <span>{metrics.shortlisted} shortlisted</span>
          </div>
        </div>

        <aside className="applied-jobs-hero-panel">
          <span className="applied-jobs-hero-label">Latest application</span>
          <strong>{latestApplication ? latestApplication.title : "No applications yet"}</strong>
          <p>{latestApplication ? latestApplication.company : "Your recently applied role will appear here."}</p>
          {latestApplication && (
            <span className="applied-jobs-hero-date">
              {new Date(latestApplication.applied_at).toLocaleString()}
            </span>
          )}
        </aside>
      </section>

      <section className="applied-jobs-metrics">
        <article className="applied-jobs-metric-card">
          <span className="applied-jobs-metric-icon"><FaBriefcase /></span>
          <div>
            <strong>{metrics.total}</strong>
            <p>Total applied roles</p>
          </div>
        </article>
        <article className="applied-jobs-metric-card">
          <span className="applied-jobs-metric-icon accent-shortlisted"><FaCheckCircle /></span>
          <div>
            <strong>{metrics.shortlisted}</strong>
            <p>Shortlisted roles</p>
          </div>
        </article>
        <article className="applied-jobs-metric-card">
          <span className="applied-jobs-metric-icon accent-progress"><FaClock /></span>
          <div>
            <strong>{metrics.applied}</strong>
            <p>Applications in review</p>
          </div>
        </article>
        <article className="applied-jobs-metric-card">
          <span className="applied-jobs-metric-icon accent-company"><FaBuilding /></span>
          <div>
            <strong>{metrics.companies}</strong>
            <p>Companies reached</p>
          </div>
        </article>
      </section>

      <section className="applied-jobs-surface">
        <div className="applied-jobs-toolbar">
          <div>
            <h2>Your applied jobs</h2>
            <p>Keep an eye on role details, deadlines, and current application status.</p>
          </div>
        </div>

        {jobs.length === 0 ? (
          <p className="applied-jobs-empty">You have not applied to any jobs yet.</p>
        ) : (
          <div className="applied-jobs-grid">
            {jobs.map((job) => (
              <article className="applied-jobs-card" key={job.application_id}>
                <div className="applied-jobs-card-head">
                  <div>
                    <span className="applied-jobs-card-id">Application #{job.application_id}</span>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                  <span className={`applied-jobs-status status-${normalizeStatus(job.status)}`}>
                    {job.status}
                  </span>
                </div>

                <div className="applied-jobs-meta">
                  <p><FaMapMarkerAlt /> <span>{job.location || "Location not specified"}</span></p>
                  <p><FaBuilding /> <span>{job.company || "Company not specified"}</span></p>
                  <p><FaCalendarAlt /> <span>Applied: {new Date(job.applied_at).toLocaleString()}</span></p>
                  <p><FaClock /> <span>Deadline: {job.deadline || "Open until filled"}</span></p>
                </div>

                <div className="applied-jobs-detail-box">
                  <strong>Package</strong>
                  <span>{job.package || "Not disclosed"}</span>
                </div>

                <div className="applied-jobs-detail-box">
                  <strong>Experience</strong>
                  <span>{job.experience_required || "Fresher"}</span>
                </div>

                <div className="applied-jobs-skills">
                  <FaTools />
                  <span>{job.skills_required || "Skills not specified"}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
