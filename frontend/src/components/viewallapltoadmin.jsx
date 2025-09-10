// src/components/Applications.jsx
import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import { FaSearch, FaUser, FaBriefcase, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ApplicationsToAdmin() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // search state
  const [searchTerm, setSearchTerm] = useState("");

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await AdminAuthService.getAllApplications();
      setApps(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 filter logic with trim + validation
  const normalizedSearch = searchTerm.trim().toLowerCase(); // remove spaces
  const filteredApps = apps.filter((a) => {
    if (!normalizedSearch) return true; // if empty, return all
    return (
      a.seeker_name?.toLowerCase().includes(normalizedSearch) ||
      a.email?.toLowerCase().includes(normalizedSearch) ||
      a.phone?.toLowerCase().includes(normalizedSearch) ||
      a.job_title?.toLowerCase().includes(normalizedSearch)
    );
  });

  // pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredApps.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredApps.length / recordsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">📄 Job Applications</h2>
        <p className="text-muted">Track and manage all received applications</p>
      </div>

      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group shadow-sm rounded overflow-hidden">
            <span className="input-group-text bg-white border-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search by name, email, phone, or job title..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        
        </div>
      </div>

      {loading ? (
        <p className="text-center">⏳ Loading...</p>
      ) : filteredApps.length === 0 ? (
        <p className="text-danger text-center">❌ No applications found</p>
      ) : (
        <>
          {/* Card Grid Layout */}
          <div className="row g-4">
            {currentRecords.map((a) => (
              <div key={a.application_id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <h5 className="card-title text-primary d-flex align-items-center">
                      <FaUser className="me-2" /> {a.seeker_name}
                    </h5>
                    <p className="card-text mb-1">
                      <FaEnvelope className="me-2 text-muted" />
                      {a.email}
                    </p>
                    <p className="card-text mb-1">
                      <FaPhone className="me-2 text-muted" />
                      {a.phone}
                    </p>
                    <p className="card-text mb-2">
                      <FaBriefcase className="me-2 text-muted" />
                      {a.job_title}
                    </p>

                    {/* Status */}
                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        a.status === "applied"
                          ? "bg-info"
                          : a.status === "shortlisted"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {a.status}
                    </span>

                    {/* Applied Date */}
                    <div className="text-muted small mt-2">
                      Applied At: {new Date(a.applied_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <ul className="pagination pagination-sm">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  ⬅ Prev
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages && "disabled"
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next ➡
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
