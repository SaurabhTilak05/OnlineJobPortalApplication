import React, { useEffect, useState } from "react";
import { FaAward } from "react-icons/fa";
import { getPlacements } from "../service/placementserv.js";
import "./adminpanel.css";

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

  if (loading) return <div className="admin-page"><p className="admin-empty">Loading placements...</p></div>;

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <span className="admin-section-kicker">Placements</span>
          <h1 className="admin-page-title">All placed jobseekers</h1>
          <p className="admin-page-subtitle">
            Review successful outcomes across the platform and track final placement records.
          </p>
        </div>
        <div className="admin-chip">
          <FaAward />
          <span>{placements.length} placements</span>
        </div>
      </section>

      <section className="admin-surface admin-table-wrap">
        {placements.length === 0 ? (
          <p className="admin-empty">No placements yet.</p>
        ) : (
          <>
            <div className="table-responsive d-none d-md-block">
              <table className="table admin-table align-middle">
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
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        {p.profile_picture ? (
                          <img src={`http://localhost:8080${p.profile_picture}`} alt={p.seeker_name} style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
                        ) : (
                          <span className="admin-avatar" style={{ width: 50, height: 50, fontSize: "0.9rem" }}>N/A</span>
                        )}
                      </td>
                      <td>{p.seeker_name}</td>
                      <td>{p.seeker_email}</td>
                      <td>{p.job_title}</td>
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
                <article key={p.placement_id} className="admin-info-card">
                  <h3>{p.seeker_name}</h3>
                  <p><strong>Email:</strong> {p.seeker_email}</p>
                  <p><strong>Job:</strong> {p.job_title}</p>
                  <p><strong>Company:</strong> {p.company}</p>
                  <p><strong>Date:</strong> {new Date(p.placement_date).toLocaleDateString()}</p>
                  <p><strong>Remarks:</strong> {p.remarks || "-"}</p>
                  <span className={`admin-status-pill status-${normalizeStatus(p.placement_status)}`}>{p.placement_status}</span>
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
