import React, { useEffect, useState } from "react";
import { FaBuilding, FaEnvelope, FaPhone, FaSearch, FaTrash, FaUsers } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HRService from "../service/HrService.js";
import "./adminpanel.css";

export default function ViewHR() {
  const [hrList, setHrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    loadHRs();
  }, []);

  const loadHRs = async () => {
    try {
      setLoading(true);
      const data = await HRService.getAllHR();
      setHrList(data);
    } catch {
      setError("Failed to fetch HR data.");
    } finally {
      setLoading(false);
    }
  };

  const deleteHR = async (id) => {
    if (!window.confirm("Are you sure you want to delete this HR?")) return;
    try {
      await HRService.deleteHR(id);
      setHrList(hrList.filter((hr) => hr.hr_id !== id));
      toast.success("HR deleted successfully.");
    } catch {
      toast.error("Failed to delete HR.");
    }
  };

  const filteredHRs = hrList.filter((hr) =>
    hr.hr_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hr.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hr.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHRs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHRs.length / itemsPerPage);

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <span className="admin-section-kicker">HR Directory</span>
          <h1 className="admin-page-title">All HR accounts</h1>
          <p className="admin-page-subtitle">
            Review registered recruiters, confirm company details, and remove outdated accounts when needed.
          </p>
        </div>
        <div className="admin-chip">
          <FaUsers />
          <span>{filteredHRs.length} HRs</span>
        </div>
      </section>

      <section className="admin-card-grid admin-compact-stats">
        <article className="admin-info-card admin-summary-card">
          <span className="admin-summary-icon"><FaUsers /></span>
          <div>
            <h3>{filteredHRs.length}</h3>
            <p>Visible recruiters</p>
          </div>
        </article>
        <article className="admin-info-card admin-summary-card">
          <span className="admin-summary-icon"><FaBuilding /></span>
          <div>
            <h3>{new Set(filteredHRs.map((hr) => hr.company_name)).size}</h3>
            <p>Companies connected</p>
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
              placeholder="Search HR by name, email, or company"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {loading && <p className="admin-empty">Loading...</p>}
        {error && <p className="admin-empty text-danger">{error}</p>}

        {!loading && !error && currentItems.length > 0 && (
          <>
            <div className="table-responsive d-none d-lg-block">
              <table className="table admin-table align-middle">
                <thead>
                  <tr>
                    <th>HR</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((hr) => (
                    <tr key={hr.hr_id}>
                      <td>
                        <div className="admin-row-user">
                          <div className="admin-avatar">{hr.hr_name.charAt(0).toUpperCase()}</div>
                          <div>
                            <strong>{hr.hr_name}</strong>
                            <div className="admin-row-subtext">HR ID: {hr.hr_id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{hr.company_name}</td>
                      <td>{hr.email}</td>
                      <td>{hr.phone}</td>
                      <td>
                        <button className="btn admin-btn-danger" onClick={() => deleteHR(hr.hr_id)}>
                          <FaTrash className="me-2" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-card-grid d-lg-none">
              {currentItems.map((hr) => (
                <article key={hr.hr_id} className="admin-info-card admin-hr-card">
                  <div className="admin-hr-card-head">
                    <div className="admin-row-user">
                      <div className="admin-avatar">{hr.hr_name.charAt(0).toUpperCase()}</div>
                      <div>
                        <h3>{hr.hr_name}</h3>
                        <p>HR ID: {hr.hr_id}</p>
                      </div>
                    </div>
                    <button className="btn admin-btn-danger" onClick={() => deleteHR(hr.hr_id)}>
                      <FaTrash />
                    </button>
                  </div>
                  <div className="admin-hr-meta">
                    <p><FaBuilding /> <span>{hr.company_name}</span></p>
                    <p><FaEnvelope /> <span>{hr.email}</span></p>
                    <p><FaPhone /> <span>{hr.phone}</span></p>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center admin-pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                      Prev
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <li key={num} className={`page-item ${currentPage === num ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(num)}>
                        {num}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}

        {!loading && !error && currentItems.length === 0 && <p className="admin-empty">No HRs found.</p>}
      </section>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
