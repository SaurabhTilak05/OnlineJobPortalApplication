import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaSave,
  FaTimes,
  FaTools,
  FaUserGraduate,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Jobservice from "../service/Jobservice.js";
import "./UpdateJob.css";

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      deadline: formData.deadline ? formData.deadline.split("T")[0] : null,
    };

    Jobservice.updateJob(formData.job_id, formattedData)
      .then(() => {
        toast.success("Job updated successfully.");
        onUpdated(formattedData);
        onClose();
      })
      .catch((err) => {
        console.error("Failed to update job", err);
        toast.error("Failed to update job.");
      });
  };

  return (
    <div className="update-job-shell">
      <div className="update-job-header">
        <div>
          <span className="update-job-kicker">Edit Opening</span>
          <h3>Update job details</h3>
          <p>Refine the opening before candidates continue applying.</p>
        </div>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="update-job-grid">
          <div className="update-job-field">
            <label className="form-label"><FaBriefcase /> Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required />
          </div>

          <div className="update-job-field">
            <label className="form-label"><FaBuilding /> Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-control" required />
          </div>

          <div className="update-job-field">
            <label className="form-label"><FaUserGraduate /> Openings</label>
            <input type="number" name="opening" value={formData.opening} onChange={handleChange} className="form-control" required />
          </div>

          <div className="update-job-field">
            <label className="form-label"><FaBriefcase /> Experience Required</label>
            <input type="text" name="experience_required" value={formData.experience_required} onChange={handleChange} className="form-control" />
          </div>

          <div className="update-job-field">
            <label className="form-label"><FaMapMarkerAlt /> Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" />
          </div>

          <div className="update-job-field">
            <label className="form-label"><FaDollarSign /> Package</label>
            <input type="text" name="package" value={formData.package} onChange={handleChange} className="form-control" />
          </div>

          <div className="update-job-field update-job-field-full">
            <label className="form-label"><FaTools /> Skills Required</label>
            <input type="text" name="skills_required" value={formData.skills_required} onChange={handleChange} className="form-control" />
          </div>

          <div className="update-job-field">
            <label className="form-label"><FaCalendarAlt /> Deadline</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="form-control" />
          </div>

          <div className="update-job-field update-job-field-full">
            <label className="form-label"><FaBriefcase /> Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="4" />
          </div>
        </div>

        <div className="update-job-actions">
          <button type="button" className="btn update-job-cancel" onClick={onClose}>
            <FaTimes className="me-2" />
            Cancel
          </button>
          <button type="submit" className="btn update-job-save">
            <FaSave className="me-2" />
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
}
