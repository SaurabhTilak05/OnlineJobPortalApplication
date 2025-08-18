import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// API calls
const fetchUserProfile = async (userId) => {
  const res = await fetch(`http://localhost:8080/jobseekerbyid/${userId}`);
  return res.json();
};

const updateUserProfile = async (userId, profileData) => {
  const res = await fetch(`http://localhost:8080/jobseekerbyid/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  return res.json();
};

export default function UserProfile() {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    qualification: "",
    skills: "",
    experience: "",
    resume: "",
  });

  const [msg, setMsg] = useState("");
  const userId = localStorage.getItem("user_id"); //  stored at login

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId)
        .then((data) => setProfile(data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(userId, profile)
      .then(() => setMsg("Profile updated successfully "))
      .catch(() => setMsg("Error updating profile "));
  };

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Qualification</label>
          <input
            type="text"
            name="qualification"
            value={profile.qualification}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. B.Tech, MCA, MBA"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Skills</label>
          <input
            type="text"
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. Java, React, SQL"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Experience (in years)</label>
          <input
            type="number"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your experience"
          />
        </div>

       

        <button type="submit" className="btn btn-primary w-100">
          Update Profile
        </button>
      </form>
    </div>
  );
}
