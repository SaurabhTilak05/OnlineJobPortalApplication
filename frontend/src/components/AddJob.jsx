import React, { useState, useEffect } from "react";
import AddJobService from "../service/addjobserv.js";

export default function AddJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    opening: "",
    experience_required: "",
    location: "",
    package: "",
    skills_required: "",
    description: "",
    deadline: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hrId = localStorage.getItem("hrId");
      if (!hrId) {
        setErrorMsg("❌ You must be logged in as HR to post a job.");
        return;
      }

      const jobData = { ...formData, hr_id: Number(hrId) };
      await AddJobService.addJob(jobData);

      setSuccessMsg("✅ Job posted successfully!");
      setErrorMsg("");

      setFormData({
        title: "",
        company: "",
        opening: "",
        experience_required: "",
        location: "",
        package: "",
        skills_required: "",
        description: "",
        deadline: "",
      });
    } catch (err) {
      console.error("Error saving job:", err.response?.data || err.message);
      setErrorMsg("❌ Failed to save job. Try again!");
    }
  };

  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setErrorMsg("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 px-3"
      style={{
        background: "linear-gradient(135deg, #1d2b64 0%, #f8cdda 100%)",
        overflow: "hidden",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      {/* Alerts */}
      {successMsg && (
        <div className="alert alert-success text-center w-100 fade show mb-3">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="alert alert-danger text-center w-100 fade show mb-3">
          {errorMsg}
        </div>
      )}

      {/* Form Container */}
      <div
        className="p-4 p-md-5 shadow-lg w-100"
        style={{
          maxWidth: "900px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(15px)",
          color: "#fff",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">🚀 Add New Job</h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label fw-bold">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter job title"
                required
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label className="form-label fw-bold">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="col-12 col-md-4 mb-3">
              <label className="form-label fw-bold">Openings</label>
              <input
                type="number"
                name="opening"
                value={formData.opening}
                onChange={handleChange}
                className="form-control"
                placeholder="No. of openings"
                required
              />
            </div>

            <div className="col-12 col-md-4 mb-3">
              <label className="form-label fw-bold">Experience</label>
              <input
                type="text"
                name="experience_required"
                value={formData.experience_required}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 2+ years"
                required
              />
            </div>

            <div className="col-12 col-md-4 mb-3">
              <label className="form-label fw-bold">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
                placeholder="Job location"
                required
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label className="form-label fw-bold">Package</label>
              <input
                type="text"
                name="package"
                value={formData.package}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 6 LPA"
                required
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label className="form-label fw-bold">Skills Required</label>
              <input
                type="text"
                name="skills_required"
                value={formData.skills_required}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. React, Java, SQL"
                required
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label fw-bold">Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Enter job description"
                required
              ></textarea>
            </div>

            <div className="col-12 mb-4">
              <label className="form-label fw-bold">Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-light fw-bold w-100 py-2"
            style={{ borderRadius: "10px", fontSize: "18px" }}
          >
            ➕ Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
