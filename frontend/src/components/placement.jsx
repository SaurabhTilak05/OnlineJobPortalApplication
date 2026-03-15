import React, { useEffect, useState } from "react";
import { FaAward } from "react-icons/fa";
import { getAllPlacements } from "../service/placementserv.js";

const normalizeStatus = (status) => (status || "pending").toLowerCase();

export default function PlacementList() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const hrId = localStorage.getItem("hrId");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const data = await getAllPlacements(hrId);
        setPlacements(data);
      } catch (err) {
        console.error("Failed to load placements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, [hrId]);

  const totalPages = Math.ceil(placements.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = placements.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div className="hr-page-shell"><div className="hr-empty-state">Loading placements...</div></div>;
  }

  return (
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Placement Records</span>
          <h1 className="hr-page-title">Placed candidates</h1>
          <p className="hr-page-subtitle">
            Review successful outcomes, track selected candidates, and keep placement records visible for the team.
          </p>
        </div>
        <div className="hr-page-chip">
          <FaAward />
          <span>{placements.length} total placements</span>
        </div>
      </section>

      <section className="hr-surface-card hr-table-card">
        {placements.length === 0 ? (
          <div className="hr-empty-state">No placements yet.</div>
        ) : (
          <>
            <div className="table-responsive d-none d-md-block">
              <table className="table hr-jobs-table align-middle mb-0">
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
                  {currentItems.map((p, index) => (
                    <tr key={p.placement_id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        {p.profile_picture ? (
                          <img src={`http://localhost:8080${p.profile_picture}`} alt={p.seeker_name} className="hr-avatar-thumb" />
                        ) : (
                          <span className="hr-avatar-fallback">N/A</span>
                        )}
                      </td>
                      <td>{p.seeker_name}</td>
                      <td>{p.seeker_email}</td>
                      <td>{p.job_title}</td>
                      <td>{p.company}</td>
                      <td>{new Date(p.placement_date).toLocaleDateString()}</td>
                      <td>
                        <span className={`hr-status-pill status-${normalizeStatus(p.placement_status)}`}>
                          {p.placement_status}
                        </span>
                      </td>
                      <td>{p.remarks || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-md-none">
              {currentItems.map((p) => (
                <article key={p.placement_id} className="hr-item-card">
                  <div className="hr-item-card-head">
                    <div className="d-flex align-items-center gap-3">
                      {p.profile_picture ? (
                        <img src={`http://localhost:8080${p.profile_picture}`} alt={p.seeker_name} className="hr-avatar-thumb" />
                      ) : (
                        <span className="hr-avatar-fallback">N/A</span>
                      )}
                      <div>
                        <h3>{p.seeker_name}</h3>
                        <p>{p.job_title}</p>
                      </div>
                    </div>
                    <span className={`hr-status-pill status-${normalizeStatus(p.placement_status)}`}>
                      {p.placement_status}
                    </span>
                  </div>
                  <div className="hr-item-card-body">
                    <p><strong>Email:</strong> {p.seeker_email}</p>
                    <p><strong>Company:</strong> {p.company}</p>
                    <p><strong>Date:</strong> {new Date(p.placement_date).toLocaleDateString()}</p>
                    <p><strong>Remarks:</strong> {p.remarks || "-"}</p>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center hr-pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                      Prev
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
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
