import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaDollarSign,
  FaLightbulb,
  FaMapMarkerAlt,
  FaTools,
  FaUserGraduate,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Jobservice from "../service/Jobservice.js";

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

const fieldLabels = {
  title: "Job title",
  company: "Company name",
  opening: "Openings",
  experience_required: "Experience",
  location: "Location",
  package: "Package",
  skills_required: "Skills required",
  description: "Job description",
  deadline: "Application deadline",
};

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
  const [errors, setErrors] = useState({});
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) error = "Job title is required";
        break;
      case "company":
        if (!value.trim()) error = "Company name is required";
        break;
      case "opening":
        if (!value) error = "Openings are required";
        else if (isNaN(value) || value <= 0) error = "Enter a positive number";
        break;
      case "experience_required":
        if (!value.trim()) error = "Experience is required";
        break;
      case "location":
        if (!value.trim()) error = "Location is required";
        break;
      case "package":
        if (!value.trim()) error = "Package is required";
        break;
      case "skills_required":
        if (!value.trim()) error = "Skills are required";
        break;
      case "description":
        if (!value.trim()) error = "Description is required";
        else if (value.length < 10) error = "Description must be at least 10 characters";
        break;
      case "deadline":
        if (!value) error = "Deadline is required";
        else {
          const today = new Date().toISOString().split("T")[0];
          if (value < today) error = "Past dates are not allowed";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "location") {
      const filtered = locationOptions.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));

    if (name === "location") {
      setTimeout(() => setLocationSuggestions([]), 120);
    }
  };

  const validateAll = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) nextErrors[key] = error;
    });
    return nextErrors;
  };

  const getValidationToastMessage = (nextErrors) => {
    const invalidFields = Object.keys(nextErrors).map(
      (field) => fieldLabels[field] || field
    );

    if (invalidFields.length === 1) {
      return `${invalidFields[0]} is invalid. ${nextErrors[Object.keys(nextErrors)[0]]}`;
    }

    const previewFields = invalidFields.slice(0, 3).join(", ");
    const remainingCount = invalidFields.length - 3;

    return remainingCount > 0
      ? `Please check these fields: ${previewFields}, and ${remainingCount} more.`
      : `Please check these fields: ${previewFields}.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateAll();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error(getValidationToastMessage(nextErrors), {
        autoClose: 2500,
      });
      return;
    }

    try {
      await Jobservice.addJob(formData);
      toast.success("Job posted successfully.", {
        autoClose: 2500,
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
      console.error(err);
      toast.error("Failed to post job.", {
        autoClose: 2500,
      });
    }
  };

  return (
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Recruitment</span>
          <h1 className="hr-page-title">Post a new job</h1>
          <p className="hr-page-subtitle">
            Create a polished opening with the right details so strong candidates know exactly what you need.
          </p>
        </div>
      </section>

      <section className="hr-form-layout">
        <div className="hr-surface-card hr-form-card">
          <form onSubmit={handleSubmit}>
            <div className="hr-form-grid">
              <div className="hr-form-group">
                <label className="form-label"><FaBriefcase /> Job Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} onBlur={handleBlur} placeholder="Frontend Developer" className={`form-control ${errors.title ? "is-invalid" : ""}`} />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>

              <div className="hr-form-group">
                <label className="form-label"><FaBuilding /> Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} onBlur={handleBlur} placeholder="QuickStart Technologies" className={`form-control ${errors.company ? "is-invalid" : ""}`} />
                {errors.company && <div className="invalid-feedback">{errors.company}</div>}
              </div>

              <div className="hr-form-group">
                <label className="form-label"><FaUserGraduate /> Openings</label>
                <input type="number" name="opening" value={formData.opening} onChange={handleChange} onBlur={handleBlur} placeholder="3" className={`form-control ${errors.opening ? "is-invalid" : ""}`} />
                {errors.opening && <div className="invalid-feedback">{errors.opening}</div>}
              </div>

              <div className="hr-form-group">
                <label className="form-label"><FaBriefcase /> Experience</label>
                <input type="text" name="experience_required" value={formData.experience_required} onChange={handleChange} onBlur={handleBlur} placeholder="2+ years" className={`form-control ${errors.experience_required ? "is-invalid" : ""}`} />
                {errors.experience_required && <div className="invalid-feedback">{errors.experience_required}</div>}
              </div>

              <div className="hr-form-group hr-form-group-location">
                <label className="form-label"><FaMapMarkerAlt /> Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} onBlur={handleBlur} placeholder="Pune" autoComplete="off" className={`form-control ${errors.location ? "is-invalid" : ""}`} />
                {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                {locationSuggestions.length > 0 && (
                  <ul className="hr-suggestion-list">
                    {locationSuggestions.map((loc) => (
                      <li key={loc} onMouseDown={() => { setFormData((prev) => ({ ...prev, location: loc })); setLocationSuggestions([]); }}>
                        {loc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="hr-form-group">
                <label className="form-label"><FaDollarSign /> Package</label>
                <input type="text" name="package" value={formData.package} onChange={handleChange} onBlur={handleBlur} placeholder="6 LPA" className={`form-control ${errors.package ? "is-invalid" : ""}`} />
                {errors.package && <div className="invalid-feedback">{errors.package}</div>}
              </div>

              <div className="hr-form-group hr-form-group-full">
                <label className="form-label"><FaTools /> Skills Required</label>
                <input type="text" name="skills_required" value={formData.skills_required} onChange={handleChange} onBlur={handleBlur} placeholder="React, Node.js, SQL" className={`form-control ${errors.skills_required ? "is-invalid" : ""}`} />
                {errors.skills_required && <div className="invalid-feedback">{errors.skills_required}</div>}
              </div>

              <div className="hr-form-group hr-form-group-full">
                <label className="form-label"><FaLightbulb /> Job Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} onBlur={handleBlur} rows="5" placeholder="Describe responsibilities, requirements, and expectations." className={`form-control ${errors.description ? "is-invalid" : ""}`} />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <div className="hr-form-group">
                <label className="form-label"><FaCalendarAlt /> Application Deadline</label>
                <input type="date" name="deadline" value={formData.deadline} min={new Date().toISOString().split("T")[0]} onChange={handleChange} onBlur={handleBlur} className={`form-control ${errors.deadline ? "is-invalid" : ""}`} />
                {errors.deadline && <div className="invalid-feedback">{errors.deadline}</div>}
              </div>
            </div>

            <div className="hr-form-actions">
              <button type="submit" className="btn hr-hero-primary hr-submit-btn">
                <FaCheckCircle className="me-2" />
                Post Job
              </button>
            </div>
          </form>
        </div>

        <aside className="hr-surface-card hr-side-note">
          <span className="hr-section-kicker">Publishing Tips</span>
          <h3>Make the role easier to say yes to.</h3>
          <ul className="hr-note-list">
            <li>Use a clear title and realistic experience requirement.</li>
            <li>Mention the exact skills you actually need for screening.</li>
            <li>Write a short, direct description instead of a long generic one.</li>
            <li>Set a deadline that gives candidates enough time to respond.</li>
          </ul>
        </aside>
      </section>
    </div>
  );
}
