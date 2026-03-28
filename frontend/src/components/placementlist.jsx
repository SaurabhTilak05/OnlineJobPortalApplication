import React, { useEffect, useState } from "react";
import {
  FaAward,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelope,
  FaUserGraduate,
} from "react-icons/fa";
import { getPlacements } from "../service/placementserv.js";
import "./adminpanel.css";
import "./placementlist.css";

const normalizeStatus = (status) => (status || "pending").toLowerCase();

export default function PlacementList() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const data = await getPlacements();
        setPlacements(data);
      } catch (err) {
        console.error("Failed to load placements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlacements();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlacements = placements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(placements.length / itemsPerPage);
  const uniqueCompanies = new Set(placements.map((item) => item.company).filter(Boolean)).size;
  const uniqueRoles = new Set(placements.map((item) => item.job_title).filter(Boolean)).size;
  const latestPlacement = placements.length
    ? [...placements]
        .filter((item) => item.placement_date)
        .sort((a, b) => new Date(b.placement_date) - new Date(a.placement_date))[0]
    : null;

  if (loading) return <div className="admin-page"><p className="admin-empty">Loading placements...</p></div>;

  return (
    <div className="admin-page">
      <section className="admin-page-header placementlist-hero">
        <div className="placementlist-hero-copy">
          <span className="admin-section-kicker">Placements</span>
          <h1 className="admin-page-title">Track every successful placement in one executive view</h1>
          <p className="admin-page-subtitle">
            Review final hiring outcomes, scan placement trends, and keep your success records clear,
            credible, and presentation-ready.
          </p>
          <div className="placementlist-hero-tags">
            <span>Placement records</span>
            <span>Outcome visibility</span>
            <span>Admin-ready reporting</span>
          </div>
        </div>
        <aside className="placementlist-hero-panel">
          <span className="placementlist-panel-kicker">Latest placement</span>
          <strong>{latestPlacement ? latestPlacement.seeker_name : "No record"}</strong>
          <p>
            {latestPlacement
              ? `${latestPlacement.job_title} at ${latestPlacement.company}`
              : "Placement insights will appear here once records are available."}
          </p>
          <div className="placementlist-panel-date">
            <FaCalendarAlt />
            <span>
              {latestPlacement?.placement_date
                ? new Date(latestPlacement.placement_date).toLocaleDateString()
                : "No date available"}
            </span>
          </div>
        </aside>
      </section>

      <section className="placementlist-metrics">
        <article className="placementlist-metric-card">
          <span className="placementlist-metric-icon"><FaAward /></span>
          <div>
            <strong>{placements.length}</strong>
            <p>Total placements</p>
          </div>
        </article>
        <article className="placementlist-metric-card">
          <span className="placementlist-metric-icon"><FaBuilding /></span>
          <div>
            <strong>{uniqueCompanies}</strong>
            <p>Hiring companies</p>
          </div>
        </article>
        <article className="placementlist-metric-card">
          <span className="placementlist-metric-icon"><FaBriefcase /></span>
          <div>
            <strong>{uniqueRoles}</strong>
            <p>Roles filled</p>
          </div>
        </article>
        <article className="placementlist-metric-card">
          <span className="placementlist-metric-icon"><FaCheckCircle /></span>
          <div>
            <strong>{Math.max(totalPages, 1)}</strong>
            <p>Pages of records</p>
          </div>
        </article>
      </section>

      <section className="admin-surface admin-table-wrap placementlist-surface">
        <div className="placementlist-toolbar">
          <div>
            <h2>Placement register</h2>
            <p>Showing verified outcomes across students, roles, and companies.</p>
          </div>
          <div className="placementlist-toolbar-chip">
            <FaUserGraduate />
            <span>Page {Math.min(currentPage, Math.max(totalPages, 1))} of {Math.max(totalPages, 1)}</span>
          </div>
        </div>

        {placements.length === 0 ? (
          <p className="admin-empty">No placements yet.</p>
        ) : (
          <>
            <div className="table-responsive d-none d-md-block">
              <table className="table admin-table align-middle placementlist-table">
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Placement Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPlacements.map((p, index) => (
                    <tr key={p.placement_id}>
                      <td>
                        <span className="placementlist-serial">{indexOfFirstItem + index + 1}</span>
                      </td>
                      <td>
                        {p.profile_picture ? (
                          <img
                            src={`http://localhost:8080${p.profile_picture}`}
                            alt={p.seeker_name}
                            className="placementlist-avatar"
                          />
                        ) : (
                          <span className="admin-avatar placementlist-avatar-fallback">
                            {p.seeker_name?.charAt(0)?.toUpperCase() || "N"}
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="placementlist-name-cell">
                          <strong>{p.seeker_name}</strong>
                          <span>Placement ID: {p.placement_id}</span>
                        </div>
                      </td>
                      <td>{p.seeker_email}</td>
                      <td>
                        <span className="placementlist-role-pill">{p.job_title}</span>
                      </td>
                      <td>{p.company}</td>
                      <td>{new Date(p.placement_date).toLocaleDateString()}</td>
                      <td><span className={`admin-status-pill status-${normalizeStatus(p.placement_status)}`}>{p.placement_status}</span></td>
                      <td>{p.remarks || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-card-grid d-md-none">
              {currentPlacements.map((p) => (
                <article key={p.placement_id} className="admin-info-card placementlist-mobile-card">
                  <div className="placementlist-mobile-head">
                    <div className="placementlist-mobile-person">
                      {p.profile_picture ? (
                        <img
                          src={`http://localhost:8080${p.profile_picture}`}
                          alt={p.seeker_name}
                          className="placementlist-avatar"
                        />
                      ) : (
                        <span className="admin-avatar placementlist-avatar-fallback">
                          {p.seeker_name?.charAt(0)?.toUpperCase() || "N"}
                        </span>
                      )}
                      <div>
                        <h3>{p.seeker_name}</h3>
                        <p>{p.job_title}</p>
                      </div>
                    </div>
                    <span className={`admin-status-pill status-${normalizeStatus(p.placement_status)}`}>{p.placement_status}</span>
                  </div>
                  <div className="placementlist-mobile-meta">
                    <p><FaEnvelope /> <span>{p.seeker_email}</span></p>
                    <p><FaBuilding /> <span>{p.company}</span></p>
                    <p><FaCalendarAlt /> <span>{new Date(p.placement_date).toLocaleDateString()}</span></p>
                  </div>
                  <div className="placementlist-mobile-remarks">
                    <strong>Remarks</strong>
                    <p>{p.remarks || "-"}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <ul className="pagination pagination-sm admin-pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>Prev</button>
                </li>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                  <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>Next</button>
                </li>
              </ul>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
