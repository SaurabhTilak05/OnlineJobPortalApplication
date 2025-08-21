import React, { useEffect, useState } from "react";
import ApplicantService from "../service/applicantServ.js";

export default function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = async () => {
    try {
      setLoading(true);
      const data = await ApplicantService.getApplicants();
      setApplicants(data);
    } catch (err) {
      setError("Failed to fetch applicants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-4 px-3">
      <div className="container-fluid">
        <div className="row justify-content-center">
          {/* Main content in Admin Dashboard */}
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body">
                <h2 className="text-center fw-bold mb-4 text-primary">
                  📋 Job Applicants
                </h2>

                {loading && (
                  <p className="text-center text-muted">Loading...</p>
                )}
                {error && (
                  <p className="text-center text-danger">{error}</p>
                )}

                {!loading && !error && (
                  <>
                    {/* Table for Desktop & Laptop */}
                    <div className="table-responsive d-none d-md-block">
                      <table className="table table-hover table-striped align-middle">
                        <thead className="table-dark">
                          <tr>
                            <th>Sr.No</th>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Applied Job</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applicants.length > 0 ? (
                            applicants.map((app, index) => (
                              <tr key={app.application_id}>
                                <td>{index + 1}</td>
                                <td>{app.name}</td>
                                <td>{app.email}</td>
                                <td>{app.phone}</td>
                                <td>{app.title}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      app.status === "Shortlisted"
                                        ? "bg-success"
                                        : app.status === "Rejected"
                                        ? "bg-danger"
                                        : "bg-warning text-dark"
                                    }`}
                                  >
                                    {app.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No applicants found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Card Layout for Mobile & Tabs */}
                    <div className="d-md-none">
                      {applicants.length > 0 ? (
                        applicants.map((app, index) => (
                          <div
                            key={app.application_id}
                            className="card mb-3 shadow-sm border-0 rounded-3"
                          >
                            <div className="card-body">
                              <h5 className="card-title fw-bold text-primary">
                                {app.name}
                              </h5>
                              <p className="card-text mb-1">
                                <strong>Email:</strong> {app.email}
                              </p>
                              <p className="card-text mb-1">
                                <strong>Phone:</strong> {app.phone}
                              </p>
                              <p className="card-text mb-1">
                                <strong>Applied Job:</strong> {app.title}
                              </p>
                              <p className="card-text">
                                <strong>Status:</strong>{" "}
                                <span
                                  className={`badge ${
                                    app.status === "Shortlisted"
                                      ? "bg-success"
                                      : app.status === "Rejected"
                                      ? "bg-danger"
                                      : "bg-warning text-dark"
                                  }`}
                                >
                                  {app.status}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center">No applicants found</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
