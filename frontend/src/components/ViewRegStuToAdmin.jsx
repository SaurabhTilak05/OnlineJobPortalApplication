// src/components/JobSeekers.jsx
import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import { FaSearch, FaUsers } from "react-icons/fa";

export default function JobSeekers() {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  // Search
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

  // 🔍 Search filter
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

  // Pagination logic
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredSeekers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSeekers.length / recordsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="container py-5">
      {/* Card Layout */}
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary d-flex justify-content-center align-items-center gap-2">
              <FaUsers /> Registered Job Seekers
            </h2>
            <p className="text-muted">
              Manage and track all registered job seekers in one place
            </p>
          </div>

          {/* Search Bar */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <div className="input-group shadow-sm rounded-pill overflow-hidden">
                <span className="input-group-text bg-white border-0">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search by name, email, phone, or address..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <p className="text-center py-4">⏳ Loading...</p>
          ) : filteredSeekers.length === 0 ? (
            <p className="text-danger text-center py-4">
              ❌ No job seekers found.
            </p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-primary text-center">
                    <tr>
                      <th>Sr.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {currentRecords.map((seeker, ind) => (
                      <tr key={seeker.seeker_id}>
                        <td>{indexOfFirst + ind + 1}</td>
                        <td className="fw-semibold">{seeker.name}</td>
                        <td>{seeker.email}</td>
                        <td>{seeker.phone}</td>
                        <td>{seeker.address}</td>
                      
                          <td>{new Date(seeker.created_at).toLocaleDateString()}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-center mt-4">
                <ul className="pagination pagination-sm mb-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
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
                      currentPage === totalPages ? "disabled" : ""
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
      </div>
    </div>
  );
}
