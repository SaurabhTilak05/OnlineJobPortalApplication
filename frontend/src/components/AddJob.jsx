// src/components/AddJob.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AddJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    opening: "", // ✅ match backend
    experience_required: "", // ✅ match backend
    location: "",
    package: "",
    skills_required: "", // ✅ match backend
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Fetch from localStorage
      const hrId = localStorage.getItem("hrId");
      const token = localStorage.getItem("token");

      console.log("HR ID from localStorage:", hrId);
      console.log("Role from localStorage:", localStorage.getItem("role"));

      if (!hrId || !token) {
        alert("❌ You must be logged in as HR to post a job.");
        return;
      }

      // ✅ Merge formData with hr_id
      const data = { ...formData, hr_id: Number(hrId) };

      const res = await axios.post("http://localhost:8080/AddJob", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Job added successfully!");
      console.log("Job saved:", res.data);

      // Reset form
      setFormData({
        title: "",
        company: "",
        opening: "",
        experience_required: "",
        location: "",
        package: "",
        skills_required: "",
        description: "",
        deadline: "",
      });
    } catch (err) {
      console.error("Error saving job:", err.response?.data || err.message);
      alert("❌ Failed to save job. Try again!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="number"
          name="opening"
          placeholder="No. of Openings"
          value={formData.opening}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="experience_required"
          placeholder="Experience Required"
          value={formData.experience_required}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="package"
          placeholder="Package"
          value={formData.package}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="text"
          name="skills_required"
          placeholder="Skills"
          value={formData.skills_required}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-2"
        ></textarea>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-success w-100">
          Add Job
        </button>
      </form>
    </div>
  );
}
