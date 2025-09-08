import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ViewStudProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          <h5 className="fw-bold mb-3 text-secondary">Basic Information</h5>
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
                <b>Date of Birth:</b> {profile.dob || "N/A"}
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
          <h5 className="fw-bold mt-4 mb-3 text-secondary">Skills & Projects</h5>
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
          <h5 className="fw-bold mt-4 mb-3 text-secondary">
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
          <h5 className="fw-bold mt-4 mb-3 text-secondary">Resume</h5>
          {profile.resume_url ? (
            <div className="d-flex gap-3">
              {/* View Button */}
             <a
                href={`http://localhost:8080${profile.resume_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success"
              >
                View Resume
              </a>
              {/* Download Button */}
              <a
                href={`http://localhost:8080${profile.resume_url}`}
                download
                className="btn btn-success"
              >
                Download Resume
              </a>
            </div>
          ) : (
            <p>No Resume Uploaded</p>
          )}
        </div>
      ) : (
        <h4 className="text-muted">No profile found.</h4>
      )}
    </div>
  );
}
