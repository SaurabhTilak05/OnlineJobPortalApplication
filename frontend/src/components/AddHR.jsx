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

  // field wise validation
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

  // onBlur वर validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // final form validation (on submit साठी)
  const validateForm = () => {
    let temp = {};
    Object.keys(formData).forEach((key) => {
      temp[key] = validateField(key, formData[key]);
    });
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await AdminAuthService.AddHR(formData);

      if (res.data.success) {
        toast.success(`HR Added Successfully: ${formData.email}`, {
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
            onBlur={handleBlur}
          />
          {errors.hr_name && <div className="invalid-feedback">{errors.hr_name}</div>}

          {/* Company Name */}
          <input
            type="text"
            name="company_name"
            placeholder="Enter Company Name"
            className={`form-control mb-2 ${errors.company_name ? "is-invalid" : ""}`}
            value={formData.company_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.company_name && <div className="invalid-feedback">{errors.company_name}</div>}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className={`form-control mb-2 ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            className={`form-control mb-3 ${errors.phone ? "is-invalid" : ""}`}
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Add HR
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
