import React, { useEffect, useState } from "react";
import interviewServ from "../service/interviewserv.js";

export default function ViewSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const hrId = localStorage.getItem("hrId");

  
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
};

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const date = new Date(`1970-01-01T${timeStr}Z`);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
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

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!schedules.length)
    return (
      <div className="alert alert-info mt-4">
        No interviews scheduled yet.
      </div>
    );

  // Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = schedules.slice(firstIndex, lastIndex);
  const npage = Math.ceil(schedules.length / recordsPerPage);
  const numbers = [...Array(npage).keys()].map((i) => i + 1);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📅 Your Scheduled Interviews</h5>
          <span className="badge bg-warning text-dark">
            Total: {schedules.length}
          </span>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Sr.No</th>
                  <th>Job Title</th>
                  <th>Seeker Name</th>
                  <th>Mode</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Link / Location / Phone</th>
                  <th>Status</th>
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
                            : "bg-secondary"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
              <li
                className={`page-item ${
                  currentPage === npage ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next ➡
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
