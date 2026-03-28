import React, { useEffect, useMemo, useState } from "react";
import interviewserv from "../service/interviewserv";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaVideo,
} from "react-icons/fa";
import "./viewscheduleforuser.css";

const normalizeStatus = (status) => (status || "pending").toLowerCase();

export default function ViewScheduleForUser() {
  const [schedule, setSchedule] = useState([]);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const seekerId = localStorage.getItem("seeker_id");

  useEffect(() => {
    if (!seekerId) {
      setError("Please login as a user first!");
      setLoading(false);
      return;
    }

    interviewserv
      .getInterviewBySeeker(seekerId)
      .then((res) => {
        setSchedule(res.data);
        setFilteredSchedule(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching schedule:", err);
        setError("Failed to fetch schedule");
        setLoading(false);
      });
  }, [seekerId]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredSchedule(schedule);
      setSearchError("");
      setCurrentPage(1);
      return;
    }

    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!regex.test(value)) {
      setSearchError("Only letters and numbers are allowed.");
      setFilteredSchedule([]);
      return;
    }

    const filtered = schedule.filter((item) =>
      item.job_title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSchedule(filtered);
    setCurrentPage(1);
    setSearchError(filtered.length === 0 ? "No matching jobs found." : "");
  };

  const metrics = useMemo(() => {
    const confirmed = schedule.filter((item) => normalizeStatus(item.status) === "confirmed").length;
    const pending = schedule.filter((item) => normalizeStatus(item.status) === "pending").length;
    const companies = new Set(schedule.map((item) => item.company).filter(Boolean)).size;

    return {
      total: schedule.length,
      confirmed,
      pending,
      companies,
    };
  }, [schedule]);

  if (loading) return <p className="text-center mt-5">Loading schedule...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  const totalPages = Math.ceil(filteredSchedule.length / itemsPerPage);
  const paginatedData = filteredSchedule.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const latestInterview = schedule.length
    ? [...schedule]
        .filter((item) => item.interview_date)
        .sort((a, b) => new Date(a.interview_date) - new Date(b.interview_date))[0]
    : null;

  return (
    <div className="user-schedule-page">
      <section className="user-schedule-hero">
        <div className="user-schedule-hero-copy">
          <span className="user-schedule-kicker">Interview Tracker</span>
          <h1>Keep every interview schedule visible and organized from one place.</h1>
          <p>
            Review upcoming interviews, track statuses, and search by job title so you never miss an
            important interview slot.
          </p>
          <div className="user-schedule-tags">
            <span>{metrics.total} interviews scheduled</span>
            <span>{metrics.confirmed} confirmed</span>
          </div>
        </div>

        <aside className="user-schedule-hero-panel">
          <span className="user-schedule-panel-label">Nearest interview</span>
          <strong>{latestInterview ? latestInterview.job_title : "No interview yet"}</strong>
          <p>{latestInterview ? latestInterview.company : "Upcoming interview details will appear here."}</p>
          {latestInterview && (
            <span className="user-schedule-panel-date">
              {new Date(latestInterview.interview_date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </aside>
      </section>

      <section className="user-schedule-metrics">
        <article className="user-schedule-metric-card">
          <span className="user-schedule-metric-icon"><FaCalendarAlt /></span>
          <div>
            <strong>{metrics.total}</strong>
            <p>Total interviews</p>
          </div>
        </article>
        <article className="user-schedule-metric-card">
          <span className="user-schedule-metric-icon accent-confirmed"><FaCheckCircle /></span>
          <div>
            <strong>{metrics.confirmed}</strong>
            <p>Confirmed</p>
          </div>
        </article>
        <article className="user-schedule-metric-card">
          <span className="user-schedule-metric-icon accent-pending"><FaClock /></span>
          <div>
            <strong>{metrics.pending}</strong>
            <p>Pending</p>
          </div>
        </article>
        <article className="user-schedule-metric-card">
          <span className="user-schedule-metric-icon accent-company"><FaBuilding /></span>
          <div>
            <strong>{metrics.companies}</strong>
            <p>Companies</p>
          </div>
        </article>
      </section>

      <section className="user-schedule-surface">
        <div className="user-schedule-toolbar">
          <div className="user-schedule-toolbar-copy">
            <h2>My schedule</h2>
            <p>Search interviews by job title and review all upcoming schedule details.</p>
          </div>

          <div className="user-schedule-search-wrap">
            <FaSearch />
            <input
              type="text"
              className={`form-control user-schedule-search-input ${searchError ? "is-invalid" : ""}`}
              placeholder="Search by job title..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {searchError && (
          <div className="user-schedule-feedback error">{searchError}</div>
        )}

        {!searchError && paginatedData.length === 0 && (
          <p className="user-schedule-empty">No schedule available.</p>
        )}

        {!searchError && paginatedData.length > 0 && (
          <>
            <div className="table-responsive shadow-sm rounded-4 overflow-hidden d-none d-md-block">
              <table className="table user-schedule-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Schedule Date</th>
                    <th>Time</th>
                    <th>Mode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.job_title}</td>
                      <td>{item.company}</td>
                      <td>
                        {new Date(item.interview_date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>{item.interview_time}</td>
                      <td>{item.interview_mode || "Not specified"}</td>
                      <td>
                        <span className={`user-schedule-status status-${normalizeStatus(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="user-schedule-card-list d-md-none">
              {paginatedData.map((item, index) => (
                <article key={index} className="user-schedule-card">
                  <div className="user-schedule-card-head">
                    <div>
                      <span className="user-schedule-card-id">
                        Interview #{(currentPage - 1) * itemsPerPage + index + 1}
                      </span>
                      <h3>{item.job_title}</h3>
                      <p>{item.company}</p>
                    </div>
                    <span className={`user-schedule-status status-${normalizeStatus(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="user-schedule-card-meta">
                    <p><FaCalendarAlt /> <span>{new Date(item.interview_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}</span></p>
                    <p><FaClock /> <span>{item.interview_time}</span></p>
                    <p><FaVideo /> <span>{item.interview_mode || "Not specified"}</span></p>
                    <p><FaBuilding /> <span>{item.company}</span></p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {!searchError && totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination pagination-sm flex-wrap user-schedule-pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  &laquo;
                </button>
              </li>

              {[...Array(totalPages)].map((_, idx) => (
                <li key={idx} className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </section>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
