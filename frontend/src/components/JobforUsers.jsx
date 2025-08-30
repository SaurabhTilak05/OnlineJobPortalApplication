import React, { useEffect, useState } from "react";
import Jobservice from "../service/Jobservice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JobforUsers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJob, setExpandedJob] = useState(null);

  const seekerId = localStorage.getItem("seeker_id"); // stored at login
  const role = localStorage.getItem("role"); // "student" or "admin"

  // 🔹 Fetch all jobs
  useEffect(() => {
    Jobservice.getAllJobs()
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
        setLoading(false);
      });
  }, []);

  // 🚀 Apply for job
  const handleApply = (jobId, title) => {
    if (!seekerId) {
      toast.error("⚠️ Please login as a student first!");
      return;
    }

    Jobservice.applyJob(jobId, seekerId)
      .then((res) => {
        if (typeof res.data === "string") {
          if (res.data.toLowerCase().includes("success")) {
            toast.success(`✅ ${res.data}`);
          } else if (res.data.toLowerCase().includes("already")) {
            toast.warning(`⚠️ ${res.data}`);
          } else {
            toast.info(res.data);
          }
        } else {
          toast.info("ℹ️ Unexpected response from server");
        }
      })
      .catch((err) => {
        console.error("Error applying job:", err);
        toast.error("❌ Something went wrong. Try again!");
      });
  };

  if (loading) return <p className="text-center mt-5">⏳ Loading jobs...</p>;
  if (error) return <p className="text-center text-danger mt-5">❌ {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-primary text-center mb-4">💼 Available Jobs</h2>

      <div className="row g-4">
        {jobs.length === 0 ? (
          <p className="text-center">No jobs available</p>
        ) : (
          jobs.map((job) => (
            <div className="col-md-4" key={job.job_id}>
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text flex-grow-1">
                    📍 <strong>Location:</strong> {job.location} <br />
                    🏢 <strong>Openings:</strong> {job.opening || "N/A"} <br />
                    ⏳ <strong>Experience:</strong> {job.experience_required || "Fresher"} <br />
                    💰 <strong>Package:</strong> {job.package || "Not Disclosed"} <br />
                    🛠 <strong>Skills:</strong> {job.skills_required || "Not Specified"} <br />
                    📝 <strong>Description:</strong>{" "}
                    {expandedJob === job.job_id ? (
                      <>
                        {job.description}{" "}
                        <button className="btn btn-link p-0" onClick={() => setExpandedJob(null)}>
                          Show Less
                        </button>
                      </>
                    ) : (
                      <>
                        {job.description?.substring(0, 60)}...
                        <button className="btn btn-link p-0" onClick={() => setExpandedJob(job.job_id)}>
                          Read More
                        </button>
                      </>
                    )}
                    <br />
                    📅 <strong>Deadline:</strong> {job.deadline}
                  </p>

                  {/* 🚀 Apply Button only for students */}
                  {role === "user" && (
                    <button
                      className="btn btn-success w-100 mt-auto"
                      onClick={() => handleApply(job.job_id, job.title)}
                    >
                      🚀 Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
