import React, { useEffect, useState } from "react";
import UserJobservice from "../service/userJobServ.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JobforUsers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJob, setExpandedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const seekerId = localStorage.getItem("seeker_id");
  const role = localStorage.getItem("role");

  // Fetch all jobs
  useEffect(() => {
    UserJobservice.getAllJobsuser()
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

  // Fetch profile completion %
  useEffect(() => {
    if (seekerId && role === "user") {
      UserJobservice.getProfileCompletion(seekerId)
        .then((res) => {
          // Backend should return { completion: number }
          setProfileCompletion(res.data.completion || 0);
        })
        .catch((err) => {
          console.error("Error fetching profile completion:", err);
          setProfileCompletion(0);
        });
    }
  }, [seekerId, role]);

  // Apply for job
  const handleApply = (jobId) => {
    if (!seekerId) {
      toast.error(" Please login as a student first!");
      return;
    }

    if (profileCompletion < 30) {
      toast.warning("Complete at least 30% of your profile to apply!");
      return;
    }

    UserJobservice.applyJob(jobId, seekerId)
      .then((res) => {
        console.log("Apply Job Response:", res.data);

        if (res.data.success) {
          toast[res.data.message.toLowerCase().includes("already") ? "warning" : "success"](
            res.data.message
          );
          setAppliedJobs((prev) => [...prev, jobId]);
        } else {
          toast.warning(res.data.message || " Cannot apply for this job");
        }
      })
      .catch((err) => {
        console.error("Error applying job:", err);
        toast.error("❌ Something went wrong. Try again!");
      });
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value.trimStart();
    if (value.length > 30) {
      toast.warning("Search term too long (max 50 characters)");
      return;
    }
    const validPattern = /^[a-zA-Z0-9\s.,-]*$/;
    if (!validPattern.test(value)) {
      toast.error("❌ Invalid character in search");
      return;
    }
    setSearchTerm(value);
  };

  // Filter jobs based on search
  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;
    return (
      job.title?.toLowerCase().includes(searchLower) ||
      job.company?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower) ||
      job.skills_required?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <p className="text-center mt-5">⏳ Loading jobs...</p>;
  if (error) return <p className="text-center text-danger mt-5">❌ {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-primary text-center mb-4">💼 Available Jobs</h2>

    

      {/* Search Field */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="🔍 Search jobs by title, company, skills or location..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="row g-4">
        {filteredJobs.length === 0 ? (
          <p className="text-center">No jobs found</p>
        ) : (
          filteredJobs.map((job) => (
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

                  {role === "user" && (
                    appliedJobs.includes(job.job_id) ? (
                      <button className="btn btn-secondary w-100 mt-auto" disabled>
                        ✅ Applied
                      </button>
                    ) : (
                      <button
                        className="btn btn-success w-100 mt-auto"
                        onClick={() => handleApply(job.job_id)}
                      >
                        🚀 Apply Now
                      </button>
                    )
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
