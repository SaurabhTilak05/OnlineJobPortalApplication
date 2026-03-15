import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaBriefcase, FaUsers } from "react-icons/fa";
import Jobservice from "../service/Jobservice.js";

const normalizeStatus = (status) => (status || "pending").toLowerCase();

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
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Applicants By Job</span>
          <h1 className="hr-page-title">Candidates for this opening</h1>
          <p className="hr-page-subtitle">
            Review everyone who applied to this role and jump directly into their full applicant profile.
          </p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <div className="hr-page-chip">
            <FaUsers />
            <span>{applicants.length} applicants</span>
          </div>
          <button className="btn hr-outline-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft className="me-2" />
            Back
          </button>
        </div>
      </section>

      <section className="hr-surface-card hr-table-card">
        {msg && <div className="alert alert-danger">{msg}</div>}

        {applicants.length > 0 ? (
          <>
            <div className="table-responsive d-none d-md-block">
              <table className="table hr-jobs-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((app, idx) => (
                    <tr key={`${app.seeker_id}-${idx}`}>
                      <td>{idx + 1}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.phone}</td>
                      <td>
                        <span className={`hr-status-pill status-${normalizeStatus(app.status)}`}>
                          {app.status || "Pending"}
                        </span>
                      </td>
                      <td>
                        <Link to={`/hrdashboard/applicantProfile/${app.seeker_id}`} className="btn hr-inline-btn">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-md-none">
              {applicants.map((app, idx) => (
                <article key={`${app.seeker_id}-${idx}`} className="hr-item-card">
                  <div className="hr-item-card-head">
                    <div>
                      <h3>{idx + 1}. {app.name}</h3>
                      <p>{app.email}</p>
                    </div>
                    <span className={`hr-status-pill status-${normalizeStatus(app.status)}`}>
                      {app.status || "Pending"}
                    </span>
                  </div>
                  <div className="hr-item-card-body">
                    <p><strong>Phone:</strong> {app.phone}</p>
                    <p><strong>Job ID:</strong> {jobId}</p>
                  </div>
                  <Link to={`/hrdashboard/applicantProfile/${app.seeker_id}`} className="btn hr-inline-btn mt-2">
                    View Details
                  </Link>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="hr-empty-state">
            <FaBriefcase className="mb-3" />
            <p className="mb-0">No applicants found for this job.</p>
          </div>
        )}
      </section>
    </div>
  );
}
