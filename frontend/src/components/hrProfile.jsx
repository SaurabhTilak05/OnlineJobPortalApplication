import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HRService from "../service/HrService.js";
import "./HrProfile.css";

import {
  FaUserTie,
  FaEnvelope,
  FaBuilding,
  FaPhone,
  FaEdit,
} from "react-icons/fa";

export default function HRProfile() {
  const [hr, setHR] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hrData = await HRService.getHRDetails();
        setHR(hrData);
      } catch (error) {
        toast.error("Failed to load HR profile data");
      }
    };
    fetchData();
  }, []);

  const handleUpdate = () => {
    toast.info("Update button clicked! (Open modal here)");
  };

  return (
    <div className="hr-profile-container">
      <div className="hr-profile-card">

        {/* Header Section */}
        <div className="hr-header">
          <div className="hr-header-left">
            <div className="hr-avatar">
              <FaUserTie size={32} />
            </div>
            <div>
              <h2>{hr.hr_name || "HR Name"}</h2>
              <p>{hr.company_name || "Company Name"}</p>
            </div>
          </div>

          <button onClick={handleUpdate} className="edit-btn">
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Contact Info Section */}
        <div className="contact-section">
          <h3>Contact Information</h3>
          <div className="contact-grid">

            <div className="contact-card">
              <div className="contact-icon"><FaUserTie /></div>
              <div>
                <p className="label">Name</p>
                <p className="value">{hr.hr_name || "N/A"}</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon"><FaEnvelope /></div>
              <div>
                <p className="label">Email</p>
                <p className="value">{hr.email || "N/A"}</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon"><FaPhone /></div>
              <div>
                <p className="label">Phone</p>
                <p className="value">{hr.phone || "N/A"}</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon"><FaBuilding /></div>
              <div>
                <p className="label">Company</p>
                <p className="value">{hr.company_name || "N/A"}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
