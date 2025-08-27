// src/components/UpdateJob.jsx
import React, { useState, useEffect } from "react";
import Jobservice from "../service/Jobservice.js"; 
 import "./UpdateJob.css"; // custom CSS

export default function UpdateJob({ job, onUpdated, onClose }) {
  const [formData, setFormData] = useState({
    job_id: "",
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

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        deadline: job.deadline ? job.deadline.split("T")[0] : "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      deadline: formData.deadline ? formData.deadline.split("T")[0] : null,
    };

    Jobservice.updateJob(formData.job_id, formattedData)
      .then(() => {
        onUpdated(formattedData);
        onClose();
      })
      .catch((err) => {
        console.error("Failed to update job ❌", err);
      });
  };

  return (
    <div className="update-job-container">
      <div className="update-job-card shadow-lg">
        <h4 className="text-center mb-4">✏️ Update Job Details</h4>
        <form onSubmit={handleUpdate}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Openings</label>
              <input
                type="number"
                name="opening"
                value={formData.opening}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Experience Required</label>
              <input
                type="text"
                name="experience_required"
                value={formData.experience_required}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Package</label>
              <input
                type="text"
                name="package"
                value={formData.package}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Skills Required</label>
              <input
                type="text"
                name="skills_required"
                value={formData.skills_required}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary me-2 px-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4">
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
