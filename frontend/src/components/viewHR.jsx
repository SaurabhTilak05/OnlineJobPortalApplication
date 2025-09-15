import React, { useEffect, useState } from "react";
import HRService from "../service/HrService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewHR.css";

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
       toast.success("✅ HR deleted successfully");
    } catch (err) {
      alert("Failed to delete HR");
    }
  };

  
  const handleSearchChange = (e) => {
    let value = e.target.value;
    
    value = value.replace(/^\s+/, "");
    
    if (value.length > 50) {
      toast.warning("⚠️ Search term too long (max 50 characters)");
      return;
    }

    const validPattern = /^[a-zA-Z0-9\s.,-]*$/;
    if (!validPattern.test(value)) {
      toast.error("❌ Invalid character in search");
      return;
    }

    setSearchTerm(value);
    setCurrentPage(1); // Reset to page 1 after search
  };

  // Filter HRs
  const filteredHRs = hrList.filter((hr) =>
    hr.hr_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hr.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hr.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHRs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHRs.length / itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="view-hr-container">
      <h2 className="view-hr-title">👥 All HRs</h2>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search HR by name, email, or company"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && currentItems.length > 0 && (
        <>
          <div className="hr-grid">
            {currentItems.map((hr) => (
              <div key={hr.hr_id} className="hr-card">
                <div className="hr-avatar">
                  {hr.hr_name.charAt(0).toUpperCase()}
                </div>
                <div className="hr-info">
                  <h5>{hr.hr_name}</h5>
                  <p><strong>Email:</strong> {hr.email}</p>
                  <p><strong>Company:</strong> {hr.company_name}</p>
                  <p><strong>Phone:</strong> {hr.phone}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteHR(hr.hr_id)}
                >
                  Delete
                </button>
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
                &laquo;
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
                &raquo;
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && currentItems.length === 0 && (
        <p className="no-hr">No HRs found</p>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
