import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Jobservice from "../service/Jobservice.js";

export default function JobApplicantsBYJob() {
  const { jobId } = useParams();
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
      <h3 className="fw-bold mb-4 text-center">
        👥 Applicants for Job #{jobId}
      </h3>
      {msg && <div className="alert alert-danger">{msg}</div>}

      {applicants.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app, idx) => (
                <tr key={idx}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted text-center">No applicants found for this job.</p>
      )}
    </div>
  );
}
