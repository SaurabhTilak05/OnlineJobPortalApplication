import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUpload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewStudProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("⚠️ Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      setUploading(true);
      const res = await AdminAuthService.uploadProfilePicture(formData);

      setProfile((prev) => ({
        ...prev,
        profile_picture: res.data.profile_picture,
      }));
      setSelectedFile(null);

      toast.success("✅ Profile picture updated successfully!");
    } catch (err) {
      toast.error("❌ Error uploading profile picture");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return <h3 className="text-center mt-5">⏳ Loading profile...</h3>;
  if (error) return <h3 className="text-danger text-center mt-5">{error}</h3>;

  return (
    <div className="container-fluid p-4 bg-light" style={{ minHeight: "100vh" }}>
  {profile ? (
    <div className="row">
      {/* Left Sidebar - Profile Pic & Upload */}
      <div className="col-md-3 col-lg-3 mb-4">
        <div className="card shadow-sm border-0 p-4 text-center h-100">
          {profile.profile_picture ? (
            <img
              src={`http://localhost:8080${profile.profile_picture}`}
              alt="Profile"
              className="rounded-circle shadow mb-3"
              style={{ width: "160px", height: "160px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white mb-3"
              style={{ width: "160px", height: "160px" }}
            >
              No Photo
            </div>
          )}

          {/* Upload New Picture */}
          <input
            type="file"
            accept="image/*"
            className="form-control mb-2"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-outline-success btn-sm w-100"
            disabled={uploading}
            onClick={handleUpload}
          >
            <FaUpload /> {uploading ? "Uploading..." : "Update Picture"}
          </button>

          <h4 className="fw-bold text-dark mt-3">{profile.name || "Student"}</h4>
          <p className="text-muted">
            <FaUserGraduate className="me-2 text-success" /> Student
          </p>
          <span className="badge bg-success px-3 py-2">
            {profile.branch || "Branch Not Assigned"}
          </span>
        </div>
      </div>

      {/* Right Content */}
      <div className="col-md-9 col-lg-9">
        <div className="card shadow-sm border-0 p-4 h-100">
          {/* Basic Info */}
          <h5 className="fw-bold mb-3 section-title">Basic Information</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <p>
                <FaEnvelope className="text-success me-2" />
                <b>Email:</b> {profile.email}
              </p>
              <p>
                <FaPhone className="text-success me-2" />
                <b>Phone:</b> {profile.phone || "N/A"}
              </p>
              <p>
                <FaMapMarkerAlt className="text-success me-2" />
                <b>Address:</b> {profile.address || "N/A"}
              </p>
              <p>
                <b>Date of Birth:</b>{" "}
                {profile.dob
                  ? new Date(profile.dob).toLocaleDateString("en-IN")
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

          {/* Skills */}
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

          {/* Career Preferences */}
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

          {/* Resume */}
          <h5 className="fw-bold mt-4 mb-3 section-title">Resume</h5>
          {profile.resume_url ? (
            <div className="d-flex gap-3 flex-wrap">
              <a
                href={`http://localhost:8080${profile.resume_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success"
              >
                View Resume
              </a>
              <a
                href={`http://localhost:8080${profile.resume_url}`}
                download
                className="btn btn-outline-primary"
              >
                Download Resume
              </a>
            </div>
          ) : (
            <p>No Resume Uploaded</p>
          )}
          <hr />

          {/* Update Profile Btn */}
          <div className="text-center">
            <button
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm update-btn"
              onClick={() => navigate("/userProfile/update-profile")}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h4 className="text-muted">No profile found.</h4>
  )}

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
    `}
  </style>
</div>

  );
}
