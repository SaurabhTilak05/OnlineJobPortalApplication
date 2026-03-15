import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBuilding, FaEdit, FaEnvelope, FaPhone, FaUserTie } from "react-icons/fa";
import HRService from "../service/HrService.js";
import "./HrProfile.css";

export default function HRProfile() {
  const [hr, setHR] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const hrData = await HRService.getHRDetails();
        setHR(hrData);
      } catch {
        toast.error("Failed to load HR profile data.");
      }
    })();
  }, []);

  return (
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Profile</span>
          <h1 className="hr-page-title">HR profile</h1>
          <p className="hr-page-subtitle">
            Keep your recruiter information current so students and admins always see the right contact details.
          </p>
        </div>
        <button className="btn hr-hero-primary" onClick={() => navigate("/hrdashboard/profile/update")}>
          <FaEdit className="me-2" />
          Edit Profile
        </button>
      </section>

      <section className="hr-profile-hero">
        <div className="hr-surface-card hr-profile-summary">
          <div className="hr-profile-avatar">
            <FaUserTie />
          </div>
          <div>
            <h2>{hr.hr_name || "HR Name"}</h2>
            <p>{hr.company_name || "Company Name"}</p>
          </div>
        </div>

        <div className="hr-surface-card hr-profile-grid">
          <div className="hr-profile-info-card">
            <FaUserTie />
            <div>
              <span>Name</span>
              <strong>{hr.hr_name || "N/A"}</strong>
            </div>
          </div>
          <div className="hr-profile-info-card">
            <FaEnvelope />
            <div>
              <span>Email</span>
              <strong>{hr.email || "N/A"}</strong>
            </div>
          </div>
          <div className="hr-profile-info-card">
            <FaPhone />
            <div>
              <span>Phone</span>
              <strong>{hr.phone || "N/A"}</strong>
            </div>
          </div>
          <div className="hr-profile-info-card">
            <FaBuilding />
            <div>
              <span>Company</span>
              <strong>{hr.company_name || "N/A"}</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
