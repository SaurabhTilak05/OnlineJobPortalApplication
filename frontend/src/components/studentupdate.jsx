import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./studentupdate.css";

const initialProfile = {
  dob: "",
  gender: "",
  address: "",
  qualification: "",
  college_name: "",
  branch: "",
  graduation_year: "",
  percentage: "",
  skills: "",
  certifications: "",
  projects: "",
  experience: "",
  languages_known: "",
  preferred_role: "",
  preferred_location: "",
};

export default function StudentUpdate() {
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await AdminAuthService.getProfile();

        if (data?.dob) {
          data.dob = new Date(data.dob).toISOString().split("T")[0];
        }

        if (data) setProfile((prev) => ({ ...prev, ...data }));
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...profile,
        dob: profile.dob ? new Date(profile.dob).toISOString().split("T")[0] : "",
      };

      await AdminAuthService.updateProfile(payload);
      toast.success("Profile updated successfully!");
      navigate("/userProfile/view-profile");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update profile. Try again."
      );
    }
  };

  const handleCancel = () => {
    navigate("/userProfile/view-profile");
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading profile...</h3>;
  }

  return (
    <div className="student-update-page">
      <section className="student-update-hero">
        <div className="student-update-hero-copy">
          <span className="student-update-kicker">Profile Editor</span>
          <h1>Keep your student profile polished and recruiter-ready.</h1>
          <p>
            Update your personal, academic, and career details in one clean workspace so your next
            application reflects your latest profile.
          </p>
        </div>
        <aside className="student-update-hero-panel">
          <span className="student-update-panel-label">Quick reminder</span>
          <strong>Accurate details help recruiters trust your profile faster.</strong>
          <p>Review your information carefully before saving changes.</p>
        </aside>
      </section>

      <form className="student-update-form-shell" onSubmit={handleSubmit}>
        <section className="student-update-section">
          <div className="student-update-section-head">
            <h2>Personal details</h2>
            <p>Update your identity and contact-related information.</p>
          </div>

          <div className="student-update-grid">
            <div className="student-update-field">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                value={profile.dob || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="student-update-field">
              <label>Gender</label>
              <select
                className="form-select"
                name="gender"
                value={profile.gender || ""}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="student-update-field student-update-field-full">
              <label>Address</label>
              <textarea
                className="form-control"
                name="address"
                rows="3"
                value={profile.address || ""}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>
          </div>
        </section>

        <section className="student-update-section">
          <div className="student-update-section-head">
            <h2>Academic information</h2>
            <p>Keep your qualification and education details up to date.</p>
          </div>

          <div className="student-update-grid">
            <div className="student-update-field">
              <label>Qualification</label>
              <input
                type="text"
                className="form-control"
                name="qualification"
                value={profile.qualification || ""}
                onChange={handleChange}
                placeholder="Enter your highest qualification"
                required
              />
            </div>

            <div className="student-update-field">
              <label>College Name</label>
              <input
                type="text"
                className="form-control"
                name="college_name"
                value={profile.college_name || ""}
                onChange={handleChange}
                placeholder="Enter your college name"
                required
              />
            </div>

            <div className="student-update-field">
              <label>Branch</label>
              <input
                type="text"
                className="form-control"
                name="branch"
                value={profile.branch || ""}
                onChange={handleChange}
                placeholder="Enter your branch"
              />
            </div>

            <div className="student-update-field">
              <label>Graduation Year</label>
              <input
                type="number"
                className="form-control"
                name="graduation_year"
                value={profile.graduation_year || ""}
                onChange={handleChange}
                placeholder="Enter your graduation year"
                required
              />
            </div>

            <div className="student-update-field">
              <label>Percentage</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="percentage"
                value={profile.percentage || ""}
                onChange={handleChange}
                placeholder="Enter your percentage"
                required
              />
            </div>
          </div>
        </section>

        <section className="student-update-section">
          <div className="student-update-section-head">
            <h2>Skills and projects</h2>
            <p>Showcase what makes your profile stronger for recruiters.</p>
          </div>

          <div className="student-update-grid">
            <div className="student-update-field student-update-field-full">
              <label>Skills</label>
              <textarea
                className="form-control"
                name="skills"
                rows="3"
                value={profile.skills || ""}
                onChange={handleChange}
                placeholder="Enter your skills (comma separated)"
              />
            </div>

            <div className="student-update-field student-update-field-full">
              <label>Certifications</label>
              <textarea
                className="form-control"
                name="certifications"
                rows="3"
                value={profile.certifications || ""}
                onChange={handleChange}
                placeholder="Enter your certifications"
              />
            </div>

            <div className="student-update-field student-update-field-full">
              <label>Projects</label>
              <textarea
                className="form-control"
                name="projects"
                rows="3"
                value={profile.projects || ""}
                onChange={handleChange}
                placeholder="Describe your projects"
              />
            </div>

            <div className="student-update-field">
              <label>Experience</label>
              <input
                type="text"
                className="form-control"
                name="experience"
                value={profile.experience || ""}
                onChange={handleChange}
                placeholder="Enter your experience"
              />
            </div>

            <div className="student-update-field">
              <label>Languages Known</label>
              <input
                type="text"
                className="form-control"
                name="languages_known"
                value={profile.languages_known || ""}
                onChange={handleChange}
                placeholder="Enter languages you know"
              />
            </div>
          </div>
        </section>

        <section className="student-update-section">
          <div className="student-update-section-head">
            <h2>Career preferences</h2>
            <p>Set the roles and locations you want to target next.</p>
          </div>

          <div className="student-update-grid">
            <div className="student-update-field">
              <label>Preferred Role</label>
              <input
                type="text"
                className="form-control"
                name="preferred_role"
                value={profile.preferred_role || ""}
                onChange={handleChange}
                placeholder="Enter your preferred role"
              />
            </div>

            <div className="student-update-field">
              <label>Preferred Location</label>
              <input
                type="text"
                className="form-control"
                name="preferred_location"
                value={profile.preferred_location || ""}
                onChange={handleChange}
                placeholder="Enter your preferred location"
              />
            </div>
          </div>
        </section>

        <div className="student-update-actions">
          <button type="submit" className="btn student-update-primary-btn">
            Save Profile
          </button>
          <button
            type="button"
            className="btn student-update-secondary-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
