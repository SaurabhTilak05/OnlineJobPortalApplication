import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import interviewServ from "../service/interviewserv.js";
import "./ViewSchedule.css"; // custom CSS

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

  const handleNextProcess = (interview) => {
    navigate(`/hrdashboard/interviewstatus/${interview.interview_id}`, { state: interview });
  };

  // 🔍 Search filter
  const filteredSchedules = schedules.filter((s) => {
    const search = searchTerm.toLowerCase();
    return (
      s.job_title?.toLowerCase().includes(search) ||
      s.seeker_name?.toLowerCase().includes(search) ||
      s.status?.toLowerCase().includes(search) ||
      s.interview_mode?.toLowerCase().includes(search)
    );
  });

  // Pagination
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredSchedules.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredSchedules.length / recordsPerPage);
  const numbers = [...Array(npage).keys()].map((i) => i + 1);

  if (loading)
    return (
      <div className="loader-container">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading schedules...</p>
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-gradient-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📅 Your Scheduled Interviews</h5>
          <span className="badge bg-warning text-dark fs-6">
            Total: {filteredSchedules.length}
          </span>
        </div>

        <div className="card-body">
          {/* 🔍 Search */}
          <div className="d-flex justify-content-end mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="🔍 Search by Job, Seeker, Status, Mode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredSchedules.length === 0 ? (
            <div className="alert alert-info text-center">
              No matching schedules found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle text-center custom-table">
                <thead className="table-dark">
                  <tr>
                    <th>Sr.NO</th>
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
                      <td>
                        <span className="badge bg-info">{s.interview_mode}</span>
                      </td>
                      <td>{formatDate(s.interview_date)}</td>
                      <td>{formatTime(s.interview_time)}</td>
                      <td>
                        {s.interview_mode === "Offline"
                          ? s.location
                          : s.interview_link}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            s.status === "Scheduled"
                              ? "bg-success"
                              : s.status === "Selected"
                              ? "bg-primary"
                              : s.status === "Rejected"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => handleNextProcess(s)}
                        >
                          Next →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {npage > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    ⬅ Prev
                  </button>
                </li>
                {numbers.map((n) => (
                  <li
                    key={n}
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(n)}
                    >
                      {n}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === npage ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next ➡
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
