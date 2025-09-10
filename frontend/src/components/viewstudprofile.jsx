import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

export default function ViewStudProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await AdminAuthService.getProfile();
        setProfile(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load profile. Try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return <h3 className="text-center mt-5">⏳ Loading profile...</h3>;
  if (error) return <h3 className="text-danger text-center mt-5">{error}</h3>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      {profile ? (
        <div
          className="card shadow-lg border-0 p-4 w-100"
          style={{ maxWidth: "900px", borderRadius: "16px" }}
        >
          {/* Header Section */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">{profile.name || "Student"}</h2>
            <p className="text-muted mb-1">
              <FaUserGraduate className="me-2 text-success" />
              Student
            </p>
            <span className="badge bg-success px-3 py-2">
              {profile.branch || "Branch Not Assigned"}
            </span>
          </div>

          {/* Section: Basic Info */}
          <h5 className="fw-bold mb-3 section-title">Basic Information</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <p>
                <FaEnvelope className="text-success me-2" /> <b>Email:</b>{" "}
                {profile.email}
              </p>
              <p>
                <FaPhone className="text-success me-2" /> <b>Phone:</b>{" "}
                {profile.phone || "N/A"}
              </p>
              <p>
                <FaMapMarkerAlt className="text-success me-2" /> <b>Address:</b>{" "}
                {profile.address || "N/A"}
              </p>
              <p>
                <b>Date of Birth:</b>{" "}
                {profile.dob
                  ? new Date(profile.dob).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      timeZone: "Asia/Kolkata",
                    })
                  : "N/A"}
              </p>
              <p>
                <b>Gender:</b> {profile.gender || "N/A"}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <b>Qualification:</b> {profile.qualification || "N/A"}
              </p>
              <p>
                <b>College:</b> {profile.college_name || "N/A"}
              </p>
              <p>
                <b>Branch:</b> {profile.branch || "N/A"}
              </p>
              <p>
                <b>Graduation Year:</b> {profile.graduation_year || "N/A"}
              </p>
              <p>
                <b>Percentage:</b> {profile.percentage || "N/A"}%
              </p>
            </div>
          </div>

          {/* Section: Skills */}
          <h5 className="fw-bold mt-4 mb-3 section-title">Skills & Projects</h5>
          <p>
            <b>Skills:</b> {profile.skills || "N/A"}
          </p>
          <p>
            <b>Certifications:</b> {profile.certifications || "N/A"}
          </p>
          <p>
            <b>Projects:</b> {profile.projects || "N/A"}
          </p>
          <p>
            <b>Experience:</b> {profile.experience || "N/A"}
          </p>
          <p>
            <b>Languages Known:</b> {profile.languages_known || "N/A"}
          </p>

          {/* Section: Career Preferences */}
          <h5 className="fw-bold mt-4 mb-3 section-title">
            Career Preferences
          </h5>
          <p>
            <b>Preferred Role:</b> {profile.preferred_role || "N/A"}
          </p>
          <p>
            <b>Preferred Location:</b> {profile.preferred_location || "N/A"}
          </p>
          <p>
            <b>Expected Salary:</b> {profile.expected_salary || "N/A"}
          </p>

          {/* Section: Resume */}
          <h5 className="fw-bold mt-4 mb-3 section-title">Resume</h5>
          {profile.resume_url ? (
            <div className="d-flex gap-3">
              <a
                href={`http://localhost:8080${profile.resume_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                View Resume
              </a>
              <a
                href={`http://localhost:8080${profile.resume_url}`}
                download
                className=""
              >
                Download Resume
              </a>
            </div>
          ) : (
            <p>No Resume Uploaded</p>
          )}
          <hr />

          {/* Update Button */}
           <div className="update d-flex justify-content-center align-items-center my-3">
            <button
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm update-btn"
              onClick={() => navigate("/userProfile/update-profile")}   // ✅ navigate to update page
            >
              Update Profile
            </button>
          </div>
        </div>
      ) : (
        <h4 className="text-muted">No profile found.</h4>
      )}

      {/* Styles */}
      <style>
        {`
          .section-title {
            color: #2c3e50;
            border-left: 4px solid #28a745;
            padding-left: 10px;
          }

          .update-btn {
            font-weight: 500;
            letter-spacing: 0.5px;
            transition: all 0.3s ease-in-out;
          }

          .update-btn:hover {
            background-color: #212529;
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          }

          .card {
            background: #fff;
          }
        `}
      </style>
    </div>
  );
}
