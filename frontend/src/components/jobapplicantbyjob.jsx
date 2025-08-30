import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Jobservice from "../service/Jobservice.js";

export default function JobApplicantsBYJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    Jobservice.getApplicantsByJob(jobId)
      .then((res) => setApplicants(res.data))
      .catch((err) => {
        console.error(err);
        setMsg("Failed to fetch applicants");
      });
  }, [jobId]);

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white rounded-top-4">
          <h4 className="mb-0">
            👥 Applicants for Job 
          </h4>
          {/* ✅ Back button */}
          <button 
            className="btn btn-light btn-sm fw-bold"
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </button>
        </div>

        <div className="card-body">
          {msg && <div className="alert alert-danger">{msg}</div>}

          {applicants.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((app, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.phone}</td>
                      <td>
                        <span 
                          className={`badge ${
                            app.status === "Applied" ? "bg-info text-dark" :
                            app.status === "Shortlisted" ? "bg-warning text-dark" :
                            app.status === "Hired" ? "bg-success" :
                            app.status === "Rejected" ? "bg-danger" : "bg-secondary"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted text-center">No applicants found for this job.</p>
          )}
        </div>
      </div>
    </div>
  );
}
