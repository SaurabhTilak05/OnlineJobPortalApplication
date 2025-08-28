import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";
import HRService from "../service/HrService.js";
import "./UpdateHrProfile.css";

export default function UpdateHRProfile() {
  const [formData, setFormData] = useState({
    hr_id: "",
    hr_name: "",
    email: "",
    phone: "",
    company_name: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const hrData = await HRService.getHRDetails();
        setFormData(hrData);
      } catch (err) {
        toast.error("Failed to load profile for editing ❌");
      }
    })();
  }, []);

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const id = formData.hr_id || formData.id || formData.hrId;
    if (!id) {
      toast.error("Missing HR id");
      return;
    }
    console.log(formData);
     navigate("/hrdashboard/profile");
    await HRService.updateHRProfile(id, formData);
    toast.success("Profile updated ✅");
    console.log("Run this logic ");
    
    // ✅ absolute navigation back
  } catch (err) {
    console.error("❌ Failed to update HR profile", err);
    toast.error("Update failed");
  }
};



  return (
    <div className="update-hr-container">
      <div className="update-hr-card">
        <h2 className="form-title">✏️ Update Profile</h2>
        <p className="form-subtitle">Edit your details and save changes</p>

        <form onSubmit={handleSubmit} className="row g-4 mt-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="hr_name"
              value={formData.hr_name || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Company</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary me-3"
              onClick={() => navigate("/hrdashboard/profile")}
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
