import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Jobservice from "../service/Jobservice.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddJob.css";

// Predefined location suggestions
const locationOptions = [
  "Mumbai",
  "Pune",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
];

export default function AddJob() {
  const navigate = useNavigate();

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

  const [errors, setErrors] = useState({});
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  // Validate single field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) error = "Job Title is required";
        else if (value.length < 3) error = "Job Title must be at least 3 characters";
        break;

      case "company":
        if (!value.trim()) error = "Company name is required";
        else if (value.length < 2) error = "Company name must be at least 2 characters";
        break;

      case "opening":
        if (!value) error = "Number of openings is required";
        else if (isNaN(value) || value <= 0) error = "Openings must be a positive number";
        break;

      case "experience_required":
        if (!value.trim()) error = "Experience is required";
        else if (!/^(NA|[0-9]+)$/i.test(value)) error = "Enter valid experience (e.g. 2 or NA)";
        break;

      case "location":
        if (!value.trim()) error = "Location is required";
        else if (value.length < 2) error = "Enter a valid location";
        break;

      case "package":
        if (!value.trim()) error = "Package details are required";
        else if (!/^[0-9]+(\.[0-9]+)?(\s?(LPA|PA|K))?$/i.test(value)) error = "Enter valid package";
        break;

      case "skills_required":
        if (!value.trim()) error = "Skills are required";
        else if (value.split(",").length < 1) error = "Enter at least one skill";
        break;

      case "description":
        if (!value.trim()) error = "Job description is required";
        else if (value.length < 10) error = "Description must be at least 10 characters";
        break;

      case "deadline":
        if (!value) error = "Application deadline is required";
        else {
          const today = new Date().toISOString().split("T")[0];
          if (value < today) error = "Deadline cannot be before today";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    // Location suggestions
    if (name === "location") {
      if (!value.trim()) setLocationSuggestions([]);
      else {
        const filtered = locationOptions.filter((loc) =>
          loc.toLowerCase().includes(value.toLowerCase())
        );
        setLocationSuggestions(filtered);
      }
    }
  };

  // Handle blur validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });

    if (name === "location") {
      setTimeout(() => setLocationSuggestions([]), 100);
    }
  };

  // Validate all fields
  const validateAll = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateAll();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("⚠️ Please fix validation errors before submitting.");
      return;
    }

    try {
      const hrId = localStorage.getItem("hrId");
      if (!hrId) {
        toast.error("❌ You must be logged in as HR to post a job.");
        return;
      }

      const jobData = { ...formData, hr_id: Number(hrId) };
      await Jobservice.addJob(jobData);

      toast.success("✅ Job posted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

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
      toast.error("❌ Failed to save job. Try again!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-3 bg-light">
      <div className="add-job-card shadow-lg p-4 p-md-5 rounded-4 w-100" style={{ maxWidth: "900px" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Job Title */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                placeholder="Enter job title"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            {/* Company */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.company ? "is-invalid" : ""}`}
                placeholder="Enter company name"
              />
              {errors.company && <div className="invalid-feedback">{errors.company}</div>}
            </div>

            {/* Openings */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-bold">Openings</label>
              <input
                type="number"
                name="opening"
                value={formData.opening}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.opening ? "is-invalid" : ""}`}
                placeholder="No. of openings"
              />
              {errors.opening && <div className="invalid-feedback">{errors.opening}</div>}
            </div>

            {/* Experience */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-bold">Experience</label>
              <input
                type="text"
                name="experience_required"
                value={formData.experience_required}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.experience_required ? "is-invalid" : ""}`}
                placeholder="e.g. 2+ years"
              />
              {errors.experience_required && <div className="invalid-feedback">{errors.experience_required}</div>}
            </div>

            {/* Location with suggestions */}
            <div className="col-12 col-md-4 position-relative">
              <label className="form-label fw-bold">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.location ? "is-invalid" : ""}`}
                placeholder="Enter job location"
                autoComplete="off"
              />
              {errors.location && <div className="invalid-feedback">{errors.location}</div>}
              {locationSuggestions.length > 0 && (
                <ul
                  className="list-group position-absolute w-100"
                  style={{ zIndex: 1000, maxHeight: "150px", overflowY: "auto" }}
                >
                  {locationSuggestions.map((loc, idx) => (
                    <li
                      key={idx}
                      className="list-group-item list-group-item-action"
                      onMouseDown={() => {
                        setFormData({ ...formData, location: loc });
                        setLocationSuggestions([]);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Package */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Package</label>
              <input
                type="text"
                name="package"
                value={formData.package}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.package ? "is-invalid" : ""}`}
                placeholder="e.g. 6 LPA"
              />
              {errors.package && <div className="invalid-feedback">{errors.package}</div>}
            </div>

            {/* Skills */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Skills Required</label>
              <input
                type="text"
                name="skills_required"
                value={formData.skills_required}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.skills_required ? "is-invalid" : ""}`}
                placeholder="e.g. React, Java, SQL"
              />
              {errors.skills_required && <div className="invalid-feedback">{errors.skills_required}</div>}
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label fw-bold">Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="3"
                placeholder="Enter job description"
                style={{ border: "none", boxShadow: "none", outline: "none", resize: "none" }}
                className={errors.description ? "is-invalid" : ""}
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            {/* Deadline */}
            <div className="col-12">
              <label className="form-label fw-bold">Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.deadline ? "is-invalid" : ""}`}
                min={new Date().toISOString().split("T")[0]} // आज पासून select करता येईल
              />
              {errors.deadline && <div className="invalid-feedback">{errors.deadline}</div>}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary fw-bold w-100 py-2 mt-4"
            style={{ fontSize: "18px", borderRadius: "10px" }}
          >
            ➕ Post Job
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
