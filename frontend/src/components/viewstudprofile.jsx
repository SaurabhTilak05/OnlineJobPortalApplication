import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import {
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaUpload,
  FaUserGraduate,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./viewstudprofile.css";

const profileField = (value, suffix = "") => (value ? `${value}${suffix}` : "N/A");

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
      toast.warning("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      setUploading(true);
      const response = await AdminAuthService.uploadProfilePicture(formData);
      const uploadedProfilePicture = response?.profile_picture;

      if (!uploadedProfilePicture) {
        throw new Error("Profile picture path missing in upload response");
      }

      setProfile((prev) => ({
        ...prev,
        profile_picture: uploadedProfilePicture,
      }));
      setSelectedFile(null);

      toast.success("Profile picture updated successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Error uploading profile picture"
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading profile...</h3>;
  }

  if (error) {
    return <h3 className="text-danger text-center mt-5">{error}</h3>;
  }

  if (!profile) {
    return <h4 className="text-muted text-center mt-5">No profile found.</h4>;
  }

  return (
    <div className="student-profile-page">
      <section className="student-profile-hero">
        <div className="student-profile-hero-copy">
          <span className="student-profile-kicker">Student Profile</span>
          <h1>{profile.name || "Student"}</h1>
          <p>
            Keep your personal details, academic background, skills, and resume updated so recruiters
            can evaluate you faster and with more confidence.
          </p>

          <div className="student-profile-hero-tags">
            <span>{profile.branch || "Branch not assigned"}</span>
            <span>{profile.qualification || "Qualification not added"}</span>
            <span>{profile.preferred_role || "Preferred role not set"}</span>
          </div>
        </div>

        <aside className="student-profile-hero-panel">
          <div className="student-profile-avatar-wrap">
            {profile.profile_picture ? (
              <img
                src={`http://localhost:8080${profile.profile_picture}`}
                alt="Profile"
                className="student-profile-avatar"
              />
            ) : (
              <div className="student-profile-avatar student-profile-avatar-fallback">
                {profile.name?.charAt(0)?.toUpperCase() || "S"}
              </div>
            )}
          </div>

          <div className="student-profile-role">
            <FaUserGraduate />
            <span>Student</span>
          </div>

          <div className="student-profile-upload">
            <input
              type="file"
              accept="image/*"
              className="form-control student-profile-upload-input"
              onChange={handleFileChange}
            />
            <button
              className="btn student-profile-upload-btn"
              disabled={uploading}
              onClick={handleUpload}
            >
              <FaUpload />
              {uploading ? "Uploading..." : "Update Picture"}
            </button>
          </div>
        </aside>
      </section>

      <section className="student-profile-grid">
        <article className="student-profile-panel">
          <div className="student-profile-section-head">
            <h2>Basic information</h2>
            <p>Your core profile and contact details.</p>
          </div>

          <div className="student-profile-info-grid">
            <div className="student-profile-info-card">
              <strong>Email</strong>
              <span><FaEnvelope /> {profileField(profile.email)}</span>
            </div>
            <div className="student-profile-info-card">
              <strong>Phone</strong>
              <span><FaPhone /> {profileField(profile.phone)}</span>
            </div>
            <div className="student-profile-info-card">
              <strong>Address</strong>
              <span><FaMapMarkerAlt /> {profileField(profile.address)}</span>
            </div>
            <div className="student-profile-info-card">
              <strong>Date of birth</strong>
              <span>{profile.dob ? new Date(profile.dob).toLocaleDateString("en-IN") : "N/A"}</span>
            </div>
            <div className="student-profile-info-card">
              <strong>Gender</strong>
              <span>{profileField(profile.gender)}</span>
            </div>
            <div className="student-profile-info-card">
              <strong>Languages known</strong>
              <span><FaGlobe /> {profileField(profile.languages_known)}</span>
            </div>
          </div>
        </article>

        <article className="student-profile-panel">
          <div className="student-profile-section-head">
            <h2>Academic background</h2>
            <p>Your education and qualification summary.</p>
          </div>

          <div className="student-profile-info-grid">
            <div className="student-profile-info-card">
              <strong>Qualification</strong>
              <span>{profileField(profile.qualification)}</span>
            </div>
            <div className="student-profile-info-card">
              <strong>College</strong>
              <span>{profileField(profile.college_name)}</span>
            </div>
            <div className="student-profile-info-card">
              <strong>Branch</strong>
              <span>{profileField(profile.branch)}</span>
            </div>
            <div className="student-profile-info-card">
              <strong>Graduation year</strong>
              <span>{profileField(profile.graduation_year)}</span>
            </div>
            <div className="student-profile-info-card">
              <strong>Percentage</strong>
              <span>{profileField(profile.percentage, "%")}</span>
            </div>
          </div>
        </article>
      </section>

      <section className="student-profile-grid">
        <article className="student-profile-panel">
          <div className="student-profile-section-head">
            <h2>Skills and experience</h2>
            <p>Highlight the technical, project, and practical strengths that support your applications.</p>
          </div>

          <div className="student-profile-stack">
            <div className="student-profile-content-box">
              <strong>Skills</strong>
              <p>{profileField(profile.skills)}</p>
            </div>
            <div className="student-profile-content-box">
              <strong>Certifications</strong>
              <p>{profileField(profile.certifications)}</p>
            </div>
            <div className="student-profile-content-box">
              <strong>Projects</strong>
              <p>{profileField(profile.projects)}</p>
            </div>
            <div className="student-profile-content-box">
              <strong>Experience</strong>
              <p>{profileField(profile.experience)}</p>
            </div>
          </div>
        </article>

        <article className="student-profile-panel">
          <div className="student-profile-section-head">
            <h2>Career preferences</h2>
            <p>These preferences help you stay aligned with the right job opportunities.</p>
          </div>

          <div className="student-profile-stack">
            <div className="student-profile-content-box">
              <strong>Preferred role</strong>
              <p>{profileField(profile.preferred_role)}</p>
            </div>
            <div className="student-profile-content-box">
              <strong>Preferred location</strong>
              <p>{profileField(profile.preferred_location)}</p>
            </div>
            <div className="student-profile-content-box">
              <strong>Expected salary</strong>
              <p>{profileField(profile.expected_salary)}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="student-profile-panel student-profile-resume-panel">
        <div className="student-profile-section-head">
          <h2>Resume and actions</h2>
          <p>Review your uploaded resume and keep your profile ready for upcoming applications.</p>
        </div>

        <div className="student-profile-resume-actions">
          {profile.resume_url ? (
            <>
              <a
                href={`http://localhost:8080${profile.resume_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn student-profile-outline-btn"
              >
                View Resume
              </a>
              <a
                href={`http://localhost:8080${profile.resume_url}`}
                download
                className="btn student-profile-outline-btn secondary"
              >
                Download Resume
              </a>
            </>
          ) : (
            <p className="student-profile-no-resume">No resume uploaded yet.</p>
          )}

          <button
            className="btn student-profile-primary-btn"
            onClick={() => navigate("/userProfile/update-profile")}
          >
            Update Profile
          </button>
        </div>
      </section>
    </div>
  );
}
