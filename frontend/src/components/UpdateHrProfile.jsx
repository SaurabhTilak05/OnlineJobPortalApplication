import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaSave } from "react-icons/fa";
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
      } catch {
        toast.error("Failed to load profile for editing.");
      }
    })();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = formData.hr_id || formData.id || formData.hrId;
      if (!id) {
        toast.error("Missing HR ID.");
        return;
      }

      await HRService.updateHRProfile(id, formData);
      toast.success("Profile updated successfully.");
      navigate("/hrdashboard/profile");
    } catch (err) {
      console.error("Failed to update HR profile", err);
      toast.error("Update failed.");
    }
  };

  return (
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Profile</span>
          <h1 className="hr-page-title">Update profile</h1>
          <p className="hr-page-subtitle">
            Refresh your recruiter details so your dashboard and communication stay accurate.
          </p>
        </div>
      </section>

      <section className="hr-surface-card hr-form-card hr-form-card-narrow">
        <form onSubmit={handleSubmit}>
          <div className="hr-form-grid">
            <div className="hr-form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="hr_name" value={formData.hr_name || ""} onChange={handleChange} className="form-control" required />
            </div>

            <div className="hr-form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" value={formData.email || ""} onChange={handleChange} className="form-control" required />
            </div>

            <div className="hr-form-group">
              <label className="form-label">Phone</label>
              <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} className="form-control" />
            </div>

            <div className="hr-form-group">
              <label className="form-label">Company</label>
              <input type="text" name="company_name" value={formData.company_name || ""} onChange={handleChange} className="form-control" />
            </div>
          </div>

          <div className="hr-form-actions">
            <button type="button" className="btn hr-outline-btn" onClick={() => navigate("/hrdashboard/profile")}>
              <FaArrowLeft className="me-2" />
              Cancel
            </button>
            <button type="submit" className="btn hr-hero-primary hr-submit-btn">
              <FaSave className="me-2" />
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
