import React, { useState } from "react";
import { FaBuilding, FaEnvelope, FaPhone, FaUserPlus, FaUserTie } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAuthService from "../service/AdminAuthService.js";
import "./adminpanel.css";

export default function AddHR() {
  const [formData, setFormData] = useState({
    hr_name: "",
    company_name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "hr_name":
        if (!value.trim()) error = "HR name is required";
        else if (!/^[A-Za-z\s]{3,}$/.test(value)) error = "Enter a valid name";
        break;
      case "company_name":
        if (!value.trim()) error = "Company name is required";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) error = "Enter a valid email";
        break;
      case "phone":
        if (!value) error = "Phone number is required";
        else if (!/^[0-9]{10,15}$/.test(value)) error = "Enter a valid phone number";
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      nextErrors[key] = validateField(key, formData[key]);
    });
    setErrors(nextErrors);
    return Object.values(nextErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await AdminAuthService.AddHR(formData);
      if (res.data.success) {
        toast.success(`HR added successfully: ${formData.email}`);
        setFormData({ hr_name: "", company_name: "", email: "", phone: "" });
        setErrors({});
      }
    } catch (err) {
      console.error("Error adding HR:", err);
      toast.error(err.response?.data?.message || "Failed to add HR.");
    }
  };

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <span className="admin-section-kicker">Admin Actions</span>
          <h1 className="admin-page-title">Add HR account</h1>
          <p className="admin-page-subtitle">
            Register a new recruiter profile so they can post jobs, review candidates, and manage interviews.
          </p>
        </div>
      </section>

      <section className="admin-form-layout">
        <div className="admin-surface admin-form">
          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <div>
                <label className="form-label"><FaUserTie /> HR Name</label>
                <input type="text" name="hr_name" className={`form-control ${errors.hr_name ? "is-invalid" : ""}`} value={formData.hr_name} onChange={handleChange} onBlur={handleBlur} />
                {errors.hr_name && <div className="invalid-feedback">{errors.hr_name}</div>}
              </div>
              <div>
                <label className="form-label"><FaBuilding /> Company Name</label>
                <input type="text" name="company_name" className={`form-control ${errors.company_name ? "is-invalid" : ""}`} value={formData.company_name} onChange={handleChange} onBlur={handleBlur} />
                {errors.company_name && <div className="invalid-feedback">{errors.company_name}</div>}
              </div>
              <div>
                <label className="form-label"><FaEnvelope /> Email Address</label>
                <input type="email" name="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={formData.email} onChange={handleChange} onBlur={handleBlur} />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div>
                <label className="form-label"><FaPhone /> Phone Number</label>
                <input type="text" name="phone" className={`form-control ${errors.phone ? "is-invalid" : ""}`} value={formData.phone} onChange={handleChange} onBlur={handleBlur} />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="btn admin-btn-primary">
                <FaUserPlus className="me-2" />
                Add HR
              </button>
            </div>
          </form>
        </div>

        <aside className="admin-surface">
          <span className="admin-section-kicker">Admin Tips</span>
          <h2 className="mt-2 mb-3" style={{ color: "var(--admin-brand-strong)" }}>Before you create the account</h2>
          <div className="admin-info-card">
            <p>Use the recruiter’s official company email.</p>
            <p>Double-check phone number formatting before submitting.</p>
            <p>Keep company names consistent to make filtering easier later.</p>
          </div>
        </aside>
      </section>
      <ToastContainer />
    </div>
  );
}
