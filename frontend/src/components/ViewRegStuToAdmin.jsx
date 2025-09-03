// src/components/JobSeekers.jsx
import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";

export default function JobSeekers() {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

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

  // Pagination logic
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = seekers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(seekers.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary text-center">📋 Registered Job Seekers</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : seekers.length === 0 ? (
        <p className="text-danger text-center">No job seekers found.</p>
      ) : (
        <>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark text-center">
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
                    <td>{seeker.name}</td>
                    <td>{seeker.email}</td>
                    <td>{seeker.phone}</td>
                    <td>{seeker.address}</td>
                    <td>{new Date(seeker.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              className="btn btn-primary"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              ⬅ Prev
            </button>

            <span>
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>

            <button
              className="btn btn-primary"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
