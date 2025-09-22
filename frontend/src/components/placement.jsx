import React, { useEffect, useState } from "react";
import { getAllPlacements } from "../service/placementserv.js";

export default function PlacementList() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  const hrId = localStorage.getItem("hrId"); // logged-in HR

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPlacements();
  }, []);

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

  const totalPages = Math.ceil(placements.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = placements.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Function to return badge color based on status
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "placed":
        return <span className="badge bg-success">{status}</span>;
      case "pending":
        return <span className="badge bg-warning text-dark">{status}</span>;
      case "rejected":
        return <span className="badge bg-danger">{status}</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (loading) return <p>Loading placements...</p>;

  return (
    <div className="container mt-4">
      <h2>Placed Jobseekers</h2>
      {placements.length === 0 ? (
        <p>No placements yet.</p>
      ) : (
        <>
          {/* Desktop / Laptop Table */}
          <div className="d-none d-md-block">
            <table className="table table-striped mt-3">
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
                        <img
                          src={`http://localhost:8080${p.profile_picture}`}
                          alt={p.seeker_name}
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>{p.seeker_name}</td>
                    <td>{p.seeker_email}</td>
                    <td>{p.job_title}</td>
                    <td>{p.company}</td>
                    <td>{new Date(p.placement_date).toLocaleDateString()}</td>
                    <td>{getStatusBadge(p.placement_status)}</td>
                    <td>{p.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Card View */}
          <div className="d-md-none">
            {currentItems.map((p, index) => (
              <div key={p.placement_id} className="card mb-3 shadow-sm">
                <div className="card-body d-flex align-items-start gap-3">
                  {p.profile_picture ? (
                    <img
                      src={`http://localhost:8080${p.profile_picture}`}
                      alt={p.seeker_name}
                      style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                      }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">{p.seeker_name}</h5>
                    <p className="mb-0"><strong>Email:</strong> {p.seeker_email}</p>
                    <p className="mb-0">
                      <strong>Job:</strong> {p.job_title} - {p.company}
                    </p>
                    <p className="mb-0">
                      <strong>Date:</strong> {new Date(p.placement_date).toLocaleDateString()}
                    </p>
                    <p className="mb-0"><strong>Status:</strong> {getStatusBadge(p.placement_status)}</p>
                    <p className="mb-0"><strong>Remarks:</strong> {p.remarks || "-"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center flex-wrap">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={handlePrev}>Prev</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={handleNext}>Next</button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
