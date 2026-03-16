import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaClipboardList,
  FaEnvelope,
  FaPhoneAlt,
  FaSearch,
  FaUserTie,
} from "react-icons/fa";
import AdminAuthService from "../service/AdminAuthService";
import "./adminpanel.css";
import "./viewallapltoadmin.css";

const normalizeStatus = (status) => (status || "pending").toLowerCase();
const statusOptions = ["all", "pending", "shortlisted", "selected", "rejected", "placed"];

export default function ApplicationsToAdmin() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredApps = apps.filter((a) => {
    const matchesStatus =
      statusFilter === "all" || normalizeStatus(a.status) === statusFilter;

    const matchesSearch = !normalizedSearch || (
      a.seeker_name?.toLowerCase().includes(normalizedSearch) ||
      a.email?.toLowerCase().includes(normalizedSearch) ||
      a.phone?.toLowerCase().includes(normalizedSearch) ||
      a.job_title?.toLowerCase().includes(normalizedSearch)
    );

    return matchesStatus && matchesSearch;
  });

  const totalPending = apps.filter((a) => normalizeStatus(a.status) === "pending").length;
  const totalShortlisted = apps.filter((a) => normalizeStatus(a.status) === "shortlisted").length;
  const totalSelected = apps.filter((a) => ["selected", "placed"].includes(normalizeStatus(a.status))).length;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredApps.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredApps.length / recordsPerPage);

  return (
    <div className="admin-page">
      <section className="admin-page-header admin-app-hero">
        <div className="admin-app-hero-copy">
          <span className="admin-section-kicker">Application Control Room</span>
          <h1 className="admin-page-title">Review every applicant from one clean workspace</h1>
          <p className="admin-page-subtitle">
            Search by candidate details, narrow by status, and keep the latest submissions easy to scan.
          </p>
        </div>
        <div className="admin-app-hero-badge">
          <span className="admin-app-hero-badge-label">Showing</span>
          <strong>{filteredApps.length}</strong>
          <span>applications</span>
        </div>
      </section>

      <section className="admin-app-metrics">
        <article className="admin-app-metric-card metric-total">
          <div className="admin-app-metric-icon">
            <FaClipboardList />
          </div>
          <div>
            <span>Total applications</span>
            <strong>{apps.length}</strong>
          </div>
        </article>
        <article className="admin-app-metric-card metric-pending">
          <div className="admin-app-metric-icon">
            <FaCalendarAlt />
          </div>
          <div>
            <span>Pending review</span>
            <strong>{totalPending}</strong>
          </div>
        </article>
        <article className="admin-app-metric-card metric-shortlisted">
          <div className="admin-app-metric-icon">
            <FaUserTie />
          </div>
          <div>
            <span>Shortlisted</span>
            <strong>{totalShortlisted}</strong>
          </div>
        </article>
        <article className="admin-app-metric-card metric-selected">
          <div className="admin-app-metric-icon">
            <FaBriefcase />
          </div>
          <div>
            <span>Selected / placed</span>
            <strong>{totalSelected}</strong>
          </div>
        </article>
      </section>

      <section className="admin-surface admin-table-wrap">
        <div className="admin-table-toolbar">
          <div className="admin-search-wrap">
            <FaSearch />
            <input
              type="text"
              className="form-control admin-search-input"
              placeholder="Search by name, email, phone, or job title"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="admin-app-filter-row">
            {statusOptions.map((status) => (
              <button
                key={status}
                type="button"
                className={`admin-app-filter-pill ${statusFilter === status ? "active" : ""}`}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="admin-empty">Loading...</p>
        ) : filteredApps.length === 0 ? (
          <p className="admin-empty">No applications found.</p>
        ) : (
          <>
            <div className="admin-card-grid">
              {currentRecords.map((a) => (
                <article key={a.application_id} className="admin-info-card admin-app-card">
                  <div className="admin-app-card-top">
                    <div>
                      <span className="admin-app-card-id">Application #{a.application_id}</span>
                      <h3>{a.seeker_name}</h3>
                    </div>
                    <span className={`admin-status-pill status-${normalizeStatus(a.status)}`}>
                      {a.status}
                    </span>
                  </div>

                  <div className="admin-app-role">
                    <FaBriefcase />
                    <span>{a.job_title}</span>
                  </div>

                  <div className="admin-app-card-meta">
                    <p>
                      <FaEnvelope />
                      <span>{a.email}</span>
                    </p>
                    <p>
                      <FaPhoneAlt />
                      <span>{a.phone || "No phone shared"}</span>
                    </p>
                    <p>
                      <FaCalendarAlt />
                      <span>{new Date(a.applied_at).toLocaleString()}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <ul className="pagination pagination-sm admin-pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                    Prev
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
