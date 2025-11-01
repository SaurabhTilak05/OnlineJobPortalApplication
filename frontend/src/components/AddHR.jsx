import React, { useState } from "react";
import AdminAuthService from "../service/AdminAuthService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        else if (!/^[A-Za-z\s]{3,}$/.test(value))
          error = "Enter a valid name (min 3 letters)";
        break;

      case "company_name":
        if (!value.trim()) error = "Company name is required";
        else if (value.length < 2)
          error = "Company name must be at least 2 characters";
        break;

      case "email":
        if (!value) error = "Email is required";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
          error = "Enter a valid email address";
        break;

      case "phone":
        if (!value) error = "Phone number is required";
        else if (!/^[0-9]{10,15}$/.test(value))
          error = "Enter a valid phone number (10–15 digits)";
        break;

      default:
        break;
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let temp = {};
    Object.keys(formData).forEach((key) => {
      temp[key] = validateField(key, formData[key]);
    });
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await AdminAuthService.AddHR(formData);

      if (res.data.success) {
        toast.success(`✅ HR Added Successfully: ${formData.email}`, {
          position: "top-center",
          autoClose: 3000,
        });

        setFormData({
          hr_name: "",
          company_name: "",
          email: "",
          phone: "",
        });
        setErrors({});
      }
    } catch (err) {
      console.error("Error adding HR:", err);

      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 4000,
        });
      } else {
        toast.error("Failed to add HR ❌", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "15px",
          animation: "slideUp 0.6s ease",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">Add HR</h3>
        <form onSubmit={handleSubmit}>
          {/* HR Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">HR Name</label>
            <input
              type="text"
              name="hr_name"
              placeholder="Enter HR Name"
              className={`form-control ${errors.hr_name ? "is-invalid" : ""}`}
              value={formData.hr_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.hr_name && (
              <div className="invalid-feedback">{errors.hr_name}</div>
            )}
          </div>

          {/* Company Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Company Name</label>
            <input
              type="text"
              name="company_name"
              placeholder="Enter Company Name"
              className={`form-control ${
                errors.company_name ? "is-invalid" : ""
              }`}
              value={formData.company_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.company_name && (
              <div className="invalid-feedback">{errors.company_name}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #6a11cb, #2575fc)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #667eea, #764ba2)")
            }
          >
            Add HR
          </button>
        </form>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}
