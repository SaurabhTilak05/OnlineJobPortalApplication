import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaSearch, FaUsers } from "react-icons/fa";
import ApplicantService from "../service/applicantServ.js";

const normalizeStatus = (status) => (status || "Pending").toLowerCase();

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
        setMsg("Failed to fetch applicants.");
        setLoading(false);
      });
  }, []);

  const filteredApplicants = allApplicants.filter((app) =>
    app.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentApplicants = filteredApplicants.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);

  return (
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Applicants</span>
          <h1 className="hr-page-title">View applicants</h1>
          <p className="hr-page-subtitle">
            Review candidates by job title and open detailed profiles whenever you’re ready to move them forward.
          </p>
        </div>
        <div className="hr-page-chip">
          <FaUsers />
          <span>{filteredApplicants.length} applicants</span>
        </div>
      </section>

      <section className="hr-surface-card hr-table-card">
        <div className="hr-table-toolbar">
          <div className="hr-search-wrap">
            <FaSearch />
            <input
              type="text"
              className="form-control hr-search-input"
              placeholder="Search by job title"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {msg && <div className="alert alert-danger text-center">{msg}</div>}

        {loading ? (
          <div className="hr-empty-state">Loading applicants...</div>
        ) : filteredApplicants.length === 0 ? (
          <div className="hr-empty-state">No applicants found.</div>
        ) : (
          <>
            <div className="table-responsive d-none d-md-block">
              <table className="table hr-jobs-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Applied Job</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {currentApplicants.map((app, index) => (
                    <tr key={app.application_id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.phone}</td>
                      <td>{app.title}</td>
                      <td>
                        <span className={`hr-status-pill status-${normalizeStatus(app.status)}`}>
                          {app.status || "Pending"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn hr-inline-btn"
                          onClick={() => navigate(`/hrdashboard/applicantProfile/${app.seeker_id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-md-none">
              {currentApplicants.map((app, index) => (
                <article key={app.application_id} className="hr-item-card">
                  <div className="hr-item-card-head">
                    <div>
                      <h3>{indexOfFirst + index + 1}. {app.name}</h3>
                      <p>{app.title}</p>
                    </div>
                    <span className={`hr-status-pill status-${normalizeStatus(app.status)}`}>
                      {app.status || "Pending"}
                    </span>
                  </div>
                  <div className="hr-item-card-body">
                    <p><strong>Email:</strong> {app.email}</p>
                    <p><strong>Phone:</strong> {app.phone}</p>
                  </div>
                  <button
                    className="btn hr-inline-btn mt-2"
                    onClick={() => navigate(`/hrdashboard/applicantProfile/${app.seeker_id}`)}
                  >
                    View Details <FaArrowRight className="ms-2" />
                  </button>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center hr-pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
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
