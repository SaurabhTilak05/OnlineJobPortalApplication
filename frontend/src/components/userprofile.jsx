import React from "react";

export default function StudentDashboard() {
  const student = {
    name: "Kishor Wankhede",
    email: "kishor@example.com",
    contact: "9876543210",
    education: "B.Tech in Computer Science",
    skills: ["Java", "Spring Boot", "React", "MySQL"],
    experience: "0 Years (Fresher)",
    location: "Pune",
    resume: "resume.pdf",
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">🎓 Student Dashboard</h2>
        <p className="text-muted">Welcome back, {student.name}!</p>
      </div>

      {/* Profile + Resume Row */}
      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title mb-3">👤 Profile Information</h5>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Contact:</strong> {student.contact}</p>
              <p><strong>Location:</strong> {student.location}</p>
            </div>
          </div>
        </div>

        {/* Resume Card */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5 className="card-title mb-3">📄 Resume</h5>
              <p>Upload or Download your resume here</p>
              <a href={student.resume} className="btn btn-primary btn-sm" download>
                Download Resume
              </a>
              <button className="btn btn-outline-secondary btn-sm ms-2">
                Upload New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills + Education Row */}
      <div className="row g-4 mt-1">
        {/* Education */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title mb-3">🎓 Education</h5>
              <p>{student.education}</p>
              <p><strong>Experience:</strong> {student.experience}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title mb-3">💡 Skills</h5>
              {student.skills.map((skill, i) => (
                <span key={i} className="badge bg-info text-dark me-2 mb-2">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary me-2">Edit Profile</button>
        <button className="btn btn-success">Save Changes</button>
      </div>
    </div>
  );
}
