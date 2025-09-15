import React, { useEffect, useState } from "react";
import interviewserv from "../service/interviewserv";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ViewScheduleForUser() {
  const [schedule, setSchedule] = useState([]);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState(""); // Validation message

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const seekerId = localStorage.getItem("seeker_id");

  useEffect(() => {
    if (!seekerId) {
      setError("⚠️ Please login as a user first!");
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
        setError("❌ Failed to fetch schedule");
        setLoading(false);
      });
  }, [seekerId]);

  // ✅ Handle search with validation
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
      setSearchError("⚠️ Only letters and numbers are allowed.");
      setFilteredSchedule([]);
      return;
    }

    const filtered = schedule.filter((item) =>
      item.job_title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSchedule(filtered);
    setCurrentPage(1);

    if (filtered.length === 0) {
      setSearchError("❌ No matching jobs found.");
    } else {
      setSearchError("");
    }
  };

  if (loading)
    return <p className="text-center mt-5">⏳ Loading schedule...</p>;
  if (error)
    return <p className="text-center text-danger mt-5">{error}</p>;

  const totalPages = Math.ceil(filteredSchedule.length / itemsPerPage);
  const paginatedData = filteredSchedule.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-primary text-center mb-4">📅 My Schedule</h2>

      {/* Search Bar */}
      <div className="row justify-content-center mb-2">
        <div className="col-md-6">
          <input
            type="text"
            className={`form-control shadow-sm rounded-3 ${
              searchError ? "border-danger" : ""
            }`}
            placeholder="🔍 Search by Job Title..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Display validation or empty messages inside table/card area */}
      {searchError && (
        <div className="text-center text-danger fw-semibold my-3">
          {searchError}
        </div>
      )}

      {!searchError && paginatedData.length === 0 && (
        <p className="text-center mt-3">No schedule available</p>
      )}

      {/* Table for Desktop */}
      {!searchError && paginatedData.length > 0 && (
        <div className="table-responsive shadow-sm rounded-4 overflow-hidden d-none d-md-block">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-dark text-center">
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
                <tr key={index} className="text-center">
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.job_title}</td>
                  <td>{item.company}</td>
                  <td>
                    {new Date(`${item.interview_date}`).toLocaleDateString(
                      "en-IN",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}
                  </td>
                  <td>{item.interview_time}</td>
                  <td>{item.interview_mode || "Not Specified"}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Confirmed"
                          ? "bg-success"
                          : item.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card layout for Mobile */}
      {!searchError &&
        paginatedData.length > 0 &&
        paginatedData.map((item, index) => (
          <div key={index} className="card shadow-sm mb-3 d-block d-md-none">
            <div className="card-body">
              <h5 className="card-title fw-bold">{item.job_title}</h5>
              <p className="card-text mb-1">
                <strong>Company:</strong> {item.company}
              </p>
              <p className="card-text mb-1">
                <strong>Date:</strong>{" "}
                {new Date(`${item.interview_date}`).toLocaleDateString(
                  "en-IN",
                  { day: "2-digit", month: "short", year: "numeric" }
                )}
              </p>
              <p className="card-text mb-1">
                <strong>Time:</strong> {item.interview_time}
              </p>
              <p className="card-text mb-1">
                <strong>Mode:</strong> {item.interview_mode || "Not Specified"}
              </p>
              <p className="card-text mb-0">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    item.status === "Confirmed"
                      ? "bg-success"
                      : item.status === "Pending"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {item.status}
                </span>
              </p>
            </div>
          </div>
        ))}

      {/* Pagination Controls */}
      {!searchError && totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination pagination-sm flex-wrap">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &laquo;
              </button>
            </li>

            {[...Array(totalPages)].map((_, idx) => (
              <li
                key={idx}
                className={`page-item ${
                  currentPage === idx + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
