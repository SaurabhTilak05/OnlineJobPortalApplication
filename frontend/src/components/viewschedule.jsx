import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import interviewServ from "../service/interviewserv.js";
import "./ViewSchedule.css";

const normalizeStatus = (status) => (status || "pending").toLowerCase();

export default function ViewSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const recordsPerPage = 7;
  const hrId = localStorage.getItem("hrId");
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const date = new Date(`1970-01-01T${timeStr}Z`);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await interviewServ.getInterviewByHR(hrId);
        setSchedules(res.data);
      } catch (err) {
        console.error("Error fetching schedules:", err);
      } finally {
        setLoading(false);
      }
    };

    if (hrId) fetchSchedules();
  }, [hrId]);

  const filteredSchedules = schedules.filter((s) => {
    const search = searchTerm.toLowerCase();
    return (
      s.job_title?.toLowerCase().includes(search) ||
      s.seeker_name?.toLowerCase().includes(search) ||
      s.status?.toLowerCase().includes(search) ||
      s.interview_mode?.toLowerCase().includes(search)
    );
  });

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredSchedules.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredSchedules.length / recordsPerPage);
  const numbers = [...Array(npage).keys()].map((i) => i + 1);

  return (
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Interview Schedule</span>
          <h1 className="hr-page-title">Scheduled interviews</h1>
          <p className="hr-page-subtitle">
            Track upcoming interviews, scan statuses quickly, and continue the next hiring step from one table.
          </p>
        </div>
        <div className="hr-page-chip">
          <FaCalendarAlt />
          <span>{filteredSchedules.length} records</span>
        </div>
      </section>

      <section className="hr-surface-card hr-table-card">
        <div className="hr-table-toolbar">
          <div className="hr-search-wrap">
            <FaSearch />
            <input
              type="text"
              className="form-control hr-search-input"
              placeholder="Search by job, seeker, status, or mode"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="hr-empty-state">Loading schedules...</div>
        ) : filteredSchedules.length === 0 ? (
          <div className="hr-empty-state">No matching schedules found.</div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table hr-jobs-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Job Title</th>
                    <th>Seeker</th>
                    <th>Mode</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Link / Location</th>
                    <th>Status</th>
                    <th>Next</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((s, index) => (
                    <tr key={s.interview_id}>
                      <td>{firstIndex + index + 1}</td>
                      <td>{s.job_title}</td>
                      <td>{s.seeker_name}</td>
                      <td>{s.interview_mode}</td>
                      <td>{formatDate(s.interview_date)}</td>
                      <td>{formatTime(s.interview_time)}</td>
                      <td>{s.interview_mode === "Offline" ? s.location : s.interview_link}</td>
                      <td>
                        <span className={`hr-status-pill status-${normalizeStatus(s.status)}`}>
                          {s.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn hr-inline-btn"
                          onClick={() =>
                            navigate(`/hrdashboard/interviewstatus/${s.interview_id}`, {
                              state: s,
                            })
                          }
                        >
                          Next
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {npage > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center hr-pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                      Prev
                    </button>
                  </li>
                  {numbers.map((n) => (
                    <li key={n} className={`page-item ${currentPage === n ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(n)}>
                        {n}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === npage ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  );
}
