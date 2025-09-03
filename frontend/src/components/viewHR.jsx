import React, { useEffect, useState } from "react";
import HRService from "../service/HrService.js";
import "./ViewHR.css";

export default function ViewHR() {
  const [hrList, setHrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } catch (err) {
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
    } catch (err) {
      alert("Failed to delete HR");
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hrList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(hrList.length / itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="view-hr-container">
      <h2 className="view-hr-title">👥 All HRs</h2>

      {loading && <p className="text-center text-muted">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && currentItems.length > 0 && (
        <>
          <div className="hr-grid">
            {currentItems.map((hr, index) => (
              <div key={hr.hr_id} className="hr-card">
                <div className="hr-card-header">
                  <h5>{hr.hr_name}</h5>
                </div>
                <div className="hr-card-body">
                  <p><strong>Email:</strong> {hr.email}</p>
                  <p><strong>Company:</strong> {hr.company_name}</p>
                  <p><strong>Phone:</strong> {hr.phone}</p>
                </div>
                <div className="hr-card-footer">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHR(hr.hr_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                &laquo; Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => goToPage(num)}
                  className={`pagination-btn ${currentPage === num ? "active" : ""}`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next &raquo;
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && currentItems.length === 0 && (
        <p className="text-center no-hr">No HRs found</p>
      )}
    </div>
  );
}
