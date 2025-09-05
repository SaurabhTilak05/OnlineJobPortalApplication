import React, { useState } from "react";
import AdminAuthService from "../service/AdminAuthService.js";

export default function AddHR() {
  const [formData, setFormData] = useState({
    hr_name: "",
    company_name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
  };

  // validation
  const validate = () => {
    let temp = {};

    if (!formData.hr_name.trim()) {
      temp.hr_name = "HR name is required";
    } else if (!/^[A-Za-z\s]{3,}$/.test(formData.hr_name)) {
      temp.hr_name = "Enter a valid name (min 3 letters)";
    }

    if (!formData.company_name.trim()) {
      temp.company_name = "Company name is required";
    } else if (formData.company_name.length < 2) {
      temp.company_name = "Company name must be at least 2 characters";
    }

    if (!formData.email) {
      temp.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      temp.email = "Enter a valid email address";
    }

    if (!formData.phone) {
      temp.phone = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      temp.phone = "Enter a valid phone number (10–15 digits)";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await AdminAuthService.AddHR(formData);

      alert(`HR Added Successfully ✅\nEmail sent to ${formData.email}`);

      // reset
      setFormData({
        hr_name: "",
        company_name: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      console.error("Error adding HR:", err);
      alert("Failed to add HR ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Add HR</h3>
        <form onSubmit={handleSubmit}>
          {/* HR Name */}
          <input
            type="text"
            name="hr_name"
            placeholder="Enter HR Name"
            className={`form-control mb-2 ${errors.hr_name ? "is-invalid" : ""}`}
            value={formData.hr_name}
            onChange={handleChange}
          />
          {errors.hr_name && (
            <div className="invalid-feedback">{errors.hr_name}</div>
          )}

          {/* Company Name */}
          <input
            type="text"
            name="company_name"
            placeholder="Enter Company Name"
            className={`form-control mb-2 ${
              errors.company_name ? "is-invalid" : ""
            }`}
            value={formData.company_name}
            onChange={handleChange}
          />
          {errors.company_name && (
            <div className="invalid-feedback">{errors.company_name}</div>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className={`form-control mb-2 ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            className={`form-control mb-3 ${errors.phone ? "is-invalid" : ""}`}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Add HR
          </button>
        </form>
      </div>
    </div>
  );
}
