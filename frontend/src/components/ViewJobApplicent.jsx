import React, { useEffect, useState } from "react";
import ApplicantService from "../service/applicantServ.js";

export default function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    ApplicantService.getApplicants()
      .then((res) => {
        setApplicants(res);
        setLoading(false);
      })
      .catch(() => {
        setMsg("⚠️ Failed to fetch applicants");
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-4 px-3">
      <div className="container-fluid">
        <h2 className="mb-4 text-center fw-bold text-primary">
          📋 View Applicants
        </h2>

        {msg && <div className="alert alert-danger text-center">{msg}</div>}

        {loading ? (
          <div className="text-center">Loading applicants...</div>
        ) : applicants.length === 0 ? (
          <div className="alert alert-info text-center">
            No applicants found
          </div>
        ) : (
          <>
            {/* ✅ Table layout for laptop & tablet */}
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
                  </tr>
                </thead>
                <tbody className="text-center">
                  {applicants.map((app, index) => (
                    <tr key={app.id}>
                      <td>{index + 1}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Card layout for mobile */}
            <div className="d-md-none">
              {applicants.map((app, index) => (
                <div
                  key={app.id}
                  className="card shadow-sm mb-3 border-0 rounded-3"
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-primary">
                      {index + 1}. {app.name}
                    </h5>
                    <p className="mb-1">
                      <strong>Email:</strong> {app.email}
                    </p>
                    <p className="mb-1">
                      <strong>Phone:</strong> {app.phone}
                    </p>
                    <p className="mb-1">
                      <strong>Applied Job:</strong> {app.title}
                    </p>
                    <p className="mb-1">
                      <strong>Resume:</strong>{" "}
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Resume
                      </a>
                    </p>
                    <p className="mb-0">
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
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
