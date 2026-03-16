import React, { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaSearch, FaUserGraduate } from "react-icons/fa";
import AdminAuthService from "../service/AdminAuthService";
import "./adminpanel.css";

export default function JobSeekers() {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadSeekers();
  }, []);

  const loadSeekers = async () => {
    try {
      const data = await AdminAuthService.getAllSeekers();
      setSeekers(data);
    } catch (error) {
      console.error("Error loading seekers:", error);
    } finally {
      setLoading(false);
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredSeekers = seekers.filter((s) => {
    if (!normalizedSearch) return true;
    return (
      s.name?.toLowerCase().includes(normalizedSearch) ||
      s.email?.toLowerCase().includes(normalizedSearch) ||
      s.phone?.toLowerCase().includes(normalizedSearch) ||
      s.address?.toLowerCase().includes(normalizedSearch)
    );
  });

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredSeekers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSeekers.length / recordsPerPage);

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <span className="admin-section-kicker">Students</span>
          <h1 className="admin-page-title">Registered job seekers</h1>
          <p className="admin-page-subtitle">
            Browse all registered students and quickly search by name, email, phone, or address.
          </p>
        </div>
        <div className="admin-chip">
          <FaUserGraduate />
          <span>{filteredSeekers.length} students</span>
        </div>
      </section>

      <section className="admin-card-grid admin-compact-stats">
        <article className="admin-info-card admin-summary-card">
          <span className="admin-summary-icon"><FaUserGraduate /></span>
          <div>
            <h3>{filteredSeekers.length}</h3>
            <p>Visible job seekers</p>
          </div>
        </article>
        <article className="admin-info-card admin-summary-card">
          <span className="admin-summary-icon"><FaMapMarkerAlt /></span>
          <div>
            <h3>{new Set(filteredSeekers.map((seeker) => seeker.address)).size}</h3>
            <p>Locations represented</p>
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
              placeholder="Search by name, email, phone, or address"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {loading ? (
          <p className="admin-empty">Loading...</p>
        ) : filteredSeekers.length === 0 ? (
          <p className="admin-empty">No job seekers found.</p>
        ) : (
          <>
            <div className="table-responsive d-none d-lg-block">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((seeker, ind) => (
                    <tr key={seeker.seeker_id}>
                      <td>
                        <div className="admin-row-user">
                          <div className="admin-avatar">{seeker.name?.charAt(0)?.toUpperCase() || "S"}</div>
                          <div>
                            <strong>{seeker.name}</strong>
                          </div>
                        </div>
                      </td>
                      <td>{seeker.email}</td>
                      <td>{seeker.phone}</td>
                      <td>{seeker.address}</td>
                      <td>{new Date(seeker.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-card-grid d-lg-none">
              {currentRecords.map((seeker, ind) => (
                <article key={seeker.seeker_id} className="admin-info-card admin-seeker-card">
                  <div className="admin-row-user mb-3">
                    <div className="admin-avatar">{seeker.name?.charAt(0)?.toUpperCase() || "S"}</div>
                    <div>
                      <h3>{seeker.name}</h3>
                    </div>
                  </div>
                  <div className="admin-hr-meta">
                    <p><FaEnvelope /> <span>{seeker.email}</span></p>
                    <p><FaPhone /> <span>{seeker.phone}</span></p>
                    <p><FaMapMarkerAlt /> <span>{seeker.address}</span></p>
                  </div>
                  <p className="mt-3 mb-0"><strong>Joined:</strong> {new Date(seeker.created_at).toLocaleDateString()}</p>
                </article>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <ul className="pagination pagination-sm mb-0 admin-pagination">
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
