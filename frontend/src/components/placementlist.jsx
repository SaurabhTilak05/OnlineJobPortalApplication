import React, { useEffect, useState } from "react";
import { getPlacements } from "../service/placementserv.js";

export default function PlacementList() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const data = await getPlacements(); // fetch all placements
      setPlacements(data);
    } catch (err) {
      console.error("Failed to load placements:", err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlacements = placements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(placements.length / itemsPerPage);

  if (loading) return <p>Loading placements...</p>;

  return (
    <div className="container mt-4">
      <h2>All Placed Jobseekers</h2>
      {placements.length === 0 ? (
        <p>No placements yet.</p>
      ) : (
        <>
          {/* Desktop / Laptop Table View */}
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
                {currentPlacements.map((p, index) => (
                  <tr key={p.placement_id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>
                      {p.profile_picture ? (
                        <img
                          src={`http://localhost:8080${p.profile_picture}`}
                          alt={p.seeker_name}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
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
                    <td>{p.placement_status}</td>
                    <td>{p.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="d-md-none">
            {currentPlacements.map((p, index) => (
              <div
                key={p.placement_id}
                className="card mb-3 shadow-sm"
              >
                <div className="card-body d-flex align-items-start gap-3">
                  {p.profile_picture ? (
                    <img
                      src={`http://localhost:8080${p.profile_picture}`}
                      alt={p.seeker_name}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                      }}
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
                    <p className="mb-0"><strong>Job:</strong> {p.job_title} - {p.company}</p>
                    <p className="mb-0"><strong>Date:</strong> {new Date(p.placement_date).toLocaleDateString()}</p>
                    <p className="mb-0"><strong>Status:</strong> {p.placement_status}</p>
                    <p className="mb-0"><strong>Remarks:</strong> {p.remarks || "-"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`btn btn-sm ${
                  currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
