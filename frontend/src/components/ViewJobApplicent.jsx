import React, { useEffect, useState } from "react";
import ApplicantService from "../servise/applicantServ.js"; 

export default function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    ApplicantService
      .getApplicants() 
      .then((res) => {
        setApplicants(res);
        setLoading(false);
      })
      .catch((err) => {
        setMsg("⚠️ Failed to fetch applicants");
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4 text-center">📋 View Applicants</h2>

        {msg && <div className="alert alert-danger">{msg}</div>}

        {loading ? (
          <div className="text-center">Loading applicants...</div>
        ) : applicants.length === 0 ? (
          <div className="alert alert-info">No applicants found</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Applied Job</th>
                  <th>Resume</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((app, index) => (
                  <tr key={app.id}>
                    <td>{index + 1}</td>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>{app.phone}</td>
                    <td>{app.title}</td>
                    <td>
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View Resume
                      </a>
                    </td>
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
        )}
      </div>
    </section>
  );
}
