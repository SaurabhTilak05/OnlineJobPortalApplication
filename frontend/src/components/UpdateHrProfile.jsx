// src/components/UpdateHRProfile.jsx
import React, { useState, useEffect } from "react";
import HRService from "../service/HrService.js";
import "./UpdateHrProfile.css";

export default function UpdateHRProfile({ hr, onUpdated, onClose }) {
  const [formData, setFormData] = useState({
    hr_id: "",
    hr_name: "",
    email: "",
    phone: "",
    company_name: "",
  });

  useEffect(() => {
    if (hr) {
      setFormData({ ...hr });
    }
  }, [hr]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    HRService.updateHRProfile(formData.hr_id, formData)
      .then(() => {
        onUpdated(formData); // send updated data back
        onClose(); // close modal
      })
      .catch((err) => {
        console.error("Failed to update HR profile ❌", err);
      });
  };

  return (
    <div className="update-hr-container">
      <div className="update-hr-card shadow-lg">
        <h4 className="mb-3 text-center">✏️ Update HR Profile</h4>
        <form onSubmit={handleSubmit} className="row g-3">

          <div className="col-md-6">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="hr_name"
              value={formData.hr_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Company</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="form-control"
            />
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
