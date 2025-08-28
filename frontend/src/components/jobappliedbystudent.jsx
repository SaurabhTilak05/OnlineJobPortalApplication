import React, { useEffect, useState } from "react";
import JobService from "../service/Jobservice";

export default function jobappliedbystudent() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const seekerId = localStorage.getItem("seeker_id"); // logged-in student ID

  useEffect(() => {
    if (!seekerId) {
      setError("⚠️ Please login first");
      setLoading(false);
      return;
    }

    // Fetch applied jobs using service
    JobService.getAppliedJobs(seekerId)
      .then((res) => {
        if (res.data.message) {
          setJobs([]); // no jobs applied
        } else {
          setJobs(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job history:", err);
        setError("❌ Failed to load job history");
        setLoading(false);
      });
  }, [seekerId]);

  if (loading) return <p className="text-center mt-5">⏳ Loading job history...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary text-center mb-4">🕒 Job History</h2>
      {jobs.length === 0 ? (
        <p className="text-center">You have not applied to any jobs yet.</p>
      ) : (
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-md-4" key={job.application_id}>
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text flex-grow-1">
                    📍 <strong>Location:</strong> {job.location} <br />
                    💰 <strong>Package:</strong> {job.package || "Not Disclosed"} <br />
                    🛠 <strong>Skills:</strong> {job.skills_required || "Not Specified"} <br />
                    ⏳ <strong>Experience:</strong> {job.experience_required || "Fresher"} <br />
                    📝 <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        job.status === "applied"
                          ? "bg-primary"
                          : job.status === "shortlisted"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {job.status}
                    </span>{" "}
                    <br />
                    📅 <strong>Applied At:</strong>{" "}
                    {new Date(job.applied_at).toLocaleString()} <br />
                    ⏰ <strong>Deadline:</strong> {job.deadline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
