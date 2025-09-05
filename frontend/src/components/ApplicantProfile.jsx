import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import applicantServ from "../service/applicantServ";

export default function ApplicantProfile() {
  const { seekerId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    applicantServ.getApplicantProfile(seekerId)
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error(err);
        setMsg("Failed to fetch applicant profile");
      });
  }, [seekerId]);

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between rounded-top-4">
          <h4 className="mb-0">📄 Applicant Profile</h4>
          <button 
            className="btn btn-light btn-sm fw-bold"
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </button>
        </div>

        <div className="card-body">
          {msg && <div className="alert alert-danger">{msg}</div>}

          {profile ? (
            <div>
              {/* Basic Info */}
              <h5 className="text-primary mb-3">{profile.name}</h5>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Date of Birth:</strong> {profile.dob}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
              <p><strong>Address:</strong> {profile.address}</p>

              {/* Education */}
              <hr />
              <h6 className="text-secondary">🎓 Education</h6>
              <p><strong>Qualification:</strong> {profile.qualification}</p>
              <p><strong>College:</strong> {profile.college_name}</p>
              <p><strong>Branch:</strong> {profile.branch}</p>
              <p><strong>Graduation Year:</strong> {profile.graduation_year}</p>
              <p><strong>Percentage:</strong> {profile.percentage}%</p>

              {/* Skills / Certifications / Projects */}
              <hr />
              <h6 className="text-secondary">💡 Skills & Achievements</h6>
              <p><strong>Skills:</strong> {profile.skills}</p>
              <p><strong>Certifications:</strong> {profile.certifications}</p>
              <p><strong>Projects:</strong> {profile.projects}</p>

              {/* Experience */}
              <hr />
              <h6 className="text-secondary">💼 Experience</h6>
              <p>{profile.experience ? profile.experience : "Fresher"}</p>

              {/* Other Info */}
              <hr />
              <h6 className="text-secondary">🌐 Additional Info</h6>
              <p><strong>Languages Known:</strong> {profile.languages_known}</p>
              <p><strong>Preferred Role:</strong> {profile.preferred_role}</p>
              <p><strong>Preferred Location:</strong> {profile.preferred_location}</p>
              <p><strong>Expected Salary:</strong> ₹{profile.expected_salary}</p>

              {/* Resume */}
              <hr />
              <h6 className="text-secondary">📂 Resume</h6>
              <p>
                {profile.resume_url ? (
                  <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-success">
                    View Resume
                  </a>
                ) : (
                  "Not uploaded"
                )}
              </p>

              {/* Updated */}
              <p className="text-muted"><small>Last Updated: {profile.updated_at}</small></p>
            </div>
          ) : (
            <p className="text-muted">Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
}
