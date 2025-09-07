import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService"; // you can rename to StudentAuthService if needed
import { toast } from "react-toastify";

export default function studentupdate() {
  const [profile, setProfile] = useState({
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
    resume_url: "",
    preferred_role: "",
    preferred_location: "",
    expected_salary: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Load profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await AdminAuthService.getProfile();
        if (data) setProfile((prev) => ({ ...prev, ...data }));
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // ✅ Save Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdminAuthService.updateProfile(profile); // calls PUT /update
      toast.success("Profile saved successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to save profile. Try again."
      );
    }
  };

  if (loading) return <h3 className="text-center mt-5">⏳ Loading profile...</h3>;

// ...keep imports and state the same

return (
  <div className="container mt-4">
    <h2 className="mb-4 text-center">Update Profile</h2>
    <form
      className="card p-4 shadow-lg"
      style={{ maxWidth: "800px", margin: "0 auto" }}
      onSubmit={handleSubmit}
    >
      <div className="row g-3">
        {/* DOB */}
        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={profile.dob || ""}
            onChange={handleChange}
            placeholder="Select your date of birth"
          />
        </div>

        {/* Gender */}
        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={profile.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="col-md-12">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            rows="2"
            value={profile.address || ""}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>

        {/* Qualification */}
        <div className="col-md-6">
          <label className="form-label">Qualification</label>
          <input
            type="text"
            className="form-control"
            name="qualification"
            value={profile.qualification || ""}
            onChange={handleChange}
            placeholder="Enter your highest qualification"
          />
        </div>

        {/* College Name */}
        <div className="col-md-6">
          <label className="form-label">College Name</label>
          <input
            type="text"
            className="form-control"
            name="college_name"
            value={profile.college_name || ""}
            onChange={handleChange}
            placeholder="Enter your college name"
          />
        </div>

        {/* Branch */}
        <div className="col-md-6">
          <label className="form-label">Branch</label>
          <input
            type="text"
            className="form-control"
            name="branch"
            value={profile.branch || ""}
            onChange={handleChange}
            placeholder="Enter your branch"
          />
        </div>

        {/* Graduation Year */}
        <div className="col-md-6">
          <label className="form-label">Graduation Year</label>
          <input
            type="text"
            className="form-control"
            name="graduation_year"
            value={profile.graduation_year || ""}
            onChange={handleChange}
            placeholder="Enter your graduation year"
          />
        </div>

        {/* Percentage */}
        <div className="col-md-6">
          <label className="form-label">Percentage</label>
          <input
            type="text"
            className="form-control"
            name="percentage"
            value={profile.percentage || ""}
            onChange={handleChange}
            placeholder="Enter your percentage"
          />
        </div>

        {/* Skills */}
        <div className="col-md-12">
          <label className="form-label">Skills</label>
          <textarea
            className="form-control"
            name="skills"
            rows="2"
            value={profile.skills || ""}
            onChange={handleChange}
            placeholder="Enter your skills (comma separated)"
          />
        </div>

        {/* Certifications */}
        <div className="col-md-12">
          <label className="form-label">Certifications</label>
          <textarea
            className="form-control"
            name="certifications"
            rows="2"
            value={profile.certifications || ""}
            onChange={handleChange}
            placeholder="Enter your certifications"
          />
        </div>

        {/* Projects */}
        <div className="col-md-12">
          <label className="form-label">Projects</label>
          <textarea
            className="form-control"
            name="projects"
            rows="2"
            value={profile.projects || ""}
            onChange={handleChange}
            placeholder="Describe your projects"
          />
        </div>

        {/* Experience */}
        <div className="col-md-6">
          <label className="form-label">Experience</label>
          <input
            type="text"
            className="form-control"
            name="experience"
            value={profile.experience || ""}
            onChange={handleChange}
            placeholder="Enter your experience (e.g., 2 years)"
          />
        </div>

        {/* Languages Known */}
        <div className="col-md-6">
          <label className="form-label">Languages Known</label>
          <input
            type="text"
            className="form-control"
            name="languages_known"
            value={profile.languages_known || ""}
            onChange={handleChange}
            placeholder="Enter languages you know"
          />
        </div>

        {/* Resume URL */}
        <div className="col-md-12">
          <label className="form-label">Resume URL</label>
          <input
            type="url"
            className="form-control"
            name="resume_url"
            value={profile.resume_url || ""}
            onChange={handleChange}
            placeholder="Enter link to your resume"
          />
        </div>

        {/* Preferred Role */}
        <div className="col-md-6">
          <label className="form-label">Preferred Role</label>
          <input
            type="text"
            className="form-control"
            name="preferred_role"
            value={profile.preferred_role || ""}
            onChange={handleChange}
            placeholder="Enter your preferred role"
          />
        </div>

        {/* Preferred Location */}
        <div className="col-md-6">
          <label className="form-label">Preferred Location</label>
          <input
            type="text"
            className="form-control"
            name="preferred_location"
            value={profile.preferred_location || ""}
            onChange={handleChange}
            placeholder="Enter your preferred location"
          />
        </div>

        {/* Expected Salary */}
        <div className="col-md-6">
          <label className="form-label">Expected Salary</label>
          <input
            type="number"
            className="form-control"
            name="expected_salary"
            value={profile.expected_salary || ""}
            onChange={handleChange}
            placeholder="Enter expected salary"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-4">
        <button type="submit" className="btn btn-success px-4">
          Save Profile
        </button>
      </div>
    </form>
  </div>
);

}
