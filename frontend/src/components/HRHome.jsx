import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaCalendarCheck,
  FaChartLine,
  FaClipboardCheck,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import HRService from "../service/HrService.js";

export default function HRHome() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await HRService.getRecentJobsByHR();
      setJobs(res.data || []);
    } catch {
      setMsg("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const totalJobs = jobs.length || 0;
  const totalApplicants = jobs.reduce(
    (sum, job) => sum + (job.applicant_count || 0),
    0
  );
  const totalInterviews = jobs.reduce(
    (sum, job) => sum + (job.interview_count || 0),
    0
  );
  const activeJobs = jobs.filter((job) => {
    if (!job.deadline) return false;
    return new Date(job.deadline) >= new Date();
  }).length;

  const statCards = [
    {
      title: "Total Jobs",
      value: totalJobs,
      meta: "Roles you've published",
      icon: <FaBriefcase />,
      tone: "sky",
      path: "/hrdashboard/job-history",
    },
    {
      title: "Applicants",
      value: totalApplicants,
      meta: "Candidates across all jobs",
      icon: <FaUsers />,
      tone: "mint",
      path: "/hrdashboard/view-applicants",
    },
    {
      title: "Interviews",
      value: totalInterviews,
      meta: "Scheduled conversations",
      icon: <FaCalendarCheck />,
      tone: "amber",
      path: "/hrdashboard/view-schedule",
    },
    {
      title: "Active Openings",
      value: activeJobs,
      meta: "Jobs still accepting applications",
      icon: <FaChartLine />,
      tone: "coral",
      path: "/hrdashboard/addjob",
    },
  ];

  return (
    <div className="hr-home-page">
      <section className="hr-hero-card">
        <div className="hr-hero-copy">
          <span className="hr-hero-tag">HR Dashboard</span>
          <h1>Build a hiring pipeline that feels fast, focused, and organized.</h1>
          <p>
            Track job activity, respond to applicants sooner, and keep your next interviews on schedule.
          </p>
          <div className="hr-hero-actions">
            <button
              type="button"
              className="btn hr-hero-primary"
              onClick={() => navigate("/hrdashboard/addjob")}
            >
              Post New Job
            </button>
            <button
              type="button"
              className="btn hr-hero-secondary"
              onClick={() => navigate("/hrdashboard/view-applicants")}
            >
              Review Applicants
            </button>
          </div>
        </div>

        <div className="hr-hero-panel">
          <div className="hr-hero-panel-header">
            <span>Today's hiring pulse</span>
            <FaClipboardCheck />
          </div>
          <div className="hr-pulse-metric">
            <strong>{activeJobs}</strong>
            <span>active openings live now</span>
          </div>
          <div className="hr-pulse-list">
            <div>
              <FaUsers />
              <span>{totalApplicants} applicants in pipeline</span>
            </div>
            <div>
              <FaClock />
              <span>{totalInterviews} interviews scheduled</span>
            </div>
            <div>
              <FaBriefcase />
              <span>{totalJobs} total jobs published</span>
            </div>
          </div>
        </div>
      </section>

      <section className="hr-stats-grid">
        {statCards.map((card) => (
          <button
            type="button"
            key={card.title}
            className={`hr-stat-card tone-${card.tone}`}
            onClick={() => navigate(card.path)}
          >
            <div className="hr-stat-icon">{card.icon}</div>
            <div className="hr-stat-content">
              <span>{card.title}</span>
              <strong>{card.value}</strong>
              <small>{card.meta}</small>
            </div>
            <span className="hr-stat-arrow">
              <FaArrowRight />
            </span>
          </button>
        ))}
      </section>

      <section className="hr-dashboard-grid">
        <div className="hr-surface-card hr-recent-jobs">
          <div className="hr-section-header">
            <div>
              <span className="hr-section-kicker">Latest activity</span>
              <h2>Recent job posts</h2>
            </div>
            <button
              type="button"
              className="btn hr-section-link"
              onClick={() => navigate("/hrdashboard/job-history")}
            >
              View all
            </button>
          </div>

          <div className="hr-job-list">
            <div className="table-responsive d-none d-md-block">
              <table className="table hr-jobs-table align-middle mb-0">
                <thead>
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
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No jobs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-md-none">
              {jobs.length > 0 ? (
                jobs
                  .slice(-5)
                  .reverse()
                  .map((job, idx) => (
                    <article key={job.job_id || idx} className="hr-job-card">
                      <div className="hr-job-card-top">
                        <h3>{job.title}</h3>
                        <span>{job.company}</span>
                      </div>
                      <div className="hr-job-card-meta">
                        <p>Applicants: {job.applicant_count || 0}</p>
                        <p>
                          Deadline:{" "}
                          {job.deadline
                            ? new Date(job.deadline).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "-"}
                        </p>
                      </div>
                    </article>
                  ))
              ) : (
                <p className="text-center text-muted py-3 mb-0">No jobs available</p>
              )}
            </div>
          </div>
        </div>

        <div className="hr-surface-card hr-quick-actions">
          <div className="hr-section-header">
            <div>
              <span className="hr-section-kicker">Shortcuts</span>
              <h2>Quick actions</h2>
            </div>
          </div>

          <div className="hr-action-stack">
            <button
              type="button"
              className="hr-action-card"
              onClick={() => navigate("/hrdashboard/addjob")}
            >
              <FaBriefcase />
              <div>
                <strong>Create a new job post</strong>
                <span>Publish fresh openings for candidates.</span>
              </div>
            </button>

            <button
              type="button"
              className="hr-action-card"
              onClick={() => navigate("/hrdashboard/view-applicants")}
            >
              <FaUsers />
              <div>
                <strong>Review applicants</strong>
                <span>Check profiles and resumes in one place.</span>
              </div>
            </button>

            <button
              type="button"
              className="hr-action-card"
              onClick={() => navigate("/hrdashboard/view-schedule")}
            >
              <FaCalendarCheck />
              <div>
                <strong>Manage interview schedule</strong>
                <span>Keep meetings organized and updated.</span>
              </div>
            </button>
          </div>

          <div className="hr-mini-summary">
            <p>Hiring summary</p>
            <strong>
              {totalApplicants > 0
                ? `${Math.round((totalInterviews / totalApplicants) * 100) || 0}% of applicants reached interview stage`
                : "No applicant activity yet"}
            </strong>
          </div>
        </div>
      </section>

      {msg && (
        <div className="alert alert-danger mt-4 shadow-sm rounded-4 text-center fs-6">
          {msg}
        </div>
      )}
    </div>
  );
}
