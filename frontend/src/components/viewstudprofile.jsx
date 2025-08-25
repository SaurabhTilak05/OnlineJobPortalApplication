import React, { useEffect, useState } from "react";

export default function ViewProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const mockProfile = {
      name: "Kishor Wankhede",
      email: "kishor@example.com",
      contact: "9876543210",
      address: "Pune, Maharashtra",
      education: "B.Tech in Computer Science",
      skills: "Java, Spring Boot, React, SQL",
    };

    setTimeout(() => setProfile(mockProfile), 1000); // simulate API delay
  }, []);

  if (!profile) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 rounded-3">
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Student Avatar"
            className="rounded-circle border border-3 border-success"
            width="120"
            height="120"
          />
          <h3 className="mt-3 fw-bold text-success">{profile.name}</h3>
          <p className="text-muted">{profile.email}</p>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <h6 className="text-secondary">📞 Contact</h6>
            <p className="fw-semibold">{profile.contact}</p>
          </div>
          <div className="col-md-6 mb-3">
            <h6 className="text-secondary">📍 Address</h6>
            <p className="fw-semibold">{profile.address}</p>
          </div>
          <div className="col-md-6 mb-3">
            <h6 className="text-secondary">🎓 Education</h6>
            <p className="fw-semibold">{profile.education}</p>
          </div>
          <div className="col-md-6 mb-3">
            <h6 className="text-secondary">💡 Skills</h6>
            <p className="fw-semibold">{profile.skills}</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-success me-2">Update Profile</button>
          <button className="btn btn-outline-primary">Upload Resume</button>
        </div>
      </div>
    </div>
  );
}
