// src/components/Applications.jsx
import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";

export default function ApplicationsToAdmin() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

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

  // pagination calculations
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = apps.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(apps.length / recordsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary text-center">Job Applications</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : apps.length === 0 ? (
        <p className="text-danger text-center">No applications found.</p>
      ) : (
        <>
          {/* Responsive Table */}
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-striped table-hover align-middle text-nowrap">
              <thead className="table-dark text-center">
                <tr>
                  <th>Sr.No</th>
                  <th>Seeker Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Job Title</th>
                  <th>Status</th>
                  <th>Applied At</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentRecords.map((a, idx) => (
                  <tr key={a.application_id}>
                    <td>{indexOfFirstRecord + idx + 1}</td>
                    <td>{a.seeker_name}</td>
                    <td>{a.email}</td>
                    <td>{a.phone}</td>
                    <td>{a.job_title}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          a.status === "applied" ? "info" : "success"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td>{new Date(a.applied_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="d-flex flex-wrap justify-content-center mt-3">
            <nav>
              <ul className="pagination pagination-sm flex-wrap">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
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
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
