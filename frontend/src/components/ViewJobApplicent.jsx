import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicantService from "../service/applicantServ.js";

export default function ViewApplicants() {
  const [allApplicants, setAllApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    ApplicantService.getApplicants()
      .then((res) => {
        setAllApplicants(res); 
        setLoading(false);
      })
      .catch(() => {
        setMsg("⚠️ Failed to fetch applicants");
        setLoading(false);
      });
  }, []);

  // ✅ Filter by job title only
  const filteredApplicants = allApplicants.filter((app) =>
    app.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentApplicants = filteredApplicants.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);

  return (
    <section className="py-4 px-3">
      <div className="container-fluid">
        <h2 className="mb-4 text-center fw-bold text-primary">
          📋 View Applicants
        </h2>

        {/* ✅ Search Box */}
        <div className="d-flex justify-content-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="🔍 Search by job title"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {msg && <div className="alert alert-danger text-center">{msg}</div>}

        {loading ? (
          <div className="text-center">Loading applicants...</div>
        ) : filteredApplicants.length === 0 ? (
          <div className="alert alert-info text-center">No applicants found</div>
        ) : (
          <>
            {/* ✅ Table layout */}
            <div className="table-responsive d-none d-md-block">
              <table className="table table-striped table-hover align-middle shadow-sm rounded">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Applied Job</th>
                    <th>Status</th>
                    <th>View Details</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentApplicants.map((app, index) => (
                    <tr key={app.application_id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.phone}</td>
                      <td>{app.title}</td>
                      <td>
                        <span
                          className={`badge ${
                            app.status === "Selected"
                              ? "bg-success"
                              : app.status === "Rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {app.status || "Pending"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            navigate(`/hrdashboard/applicantProfile/${app.seeker_id}`)
                          }
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Card layout (mobile) */}
            <div className="d-md-none">
              {currentApplicants.map((app, index) => (
                <div
                  key={app.application_id}
                  className="card shadow-sm mb-3 border-0 rounded-3"
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-primary">
                      {indexOfFirst + index + 1}. {app.name}
                    </h5>
                    <p><strong>Email:</strong> {app.email}</p>
                    <p><strong>Phone:</strong> {app.phone}</p>
                    <p><strong>Applied Job:</strong> {app.title}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          app.status === "Selected"
                            ? "bg-success"
                            : app.status === "Rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {app.status || "Pending"}
                      </span>
                    </p>
                    <button
                      className="btn btn-sm btn-outline-primary mt-2"
                      onClick={() =>
                        navigate(`/hrdashboard/applicantProfile/${app.seeker_id}`)
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Pagination */}
            {totalPages > 1 && (
              <nav className="mt-3">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
