import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import applicantServ from "../service/applicantServ";

const textOrFallback = (value, fallback = "Not provided") => value || fallback;

export default function ApplicantProfile() {
  const { seekerId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    applicantServ
      .getApplicantProfile(seekerId)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error(err);
        setMsg("Failed to fetch applicant profile");
      });
  }, [seekerId]);

  return (
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Applicant Profile</span>
          <h1 className="hr-page-title">Candidate details</h1>
          <p className="hr-page-subtitle">
            Review the applicant’s education, skills, resume, and preferences before scheduling the next hiring step.
          </p>
        </div>
        <button className="btn hr-outline-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </section>

      {msg && <div className="alert alert-danger">{msg}</div>}

      {!profile ? (
        <div className="hr-surface-card hr-empty-state">Loading profile...</div>
      ) : (
        <>
          <section className="hr-applicant-hero">
            <div className="hr-surface-card hr-applicant-summary">
              <div className="hr-applicant-avatar">
                <FaUserTie />
              </div>
              <div className="hr-applicant-title-block">
                <h2>{textOrFallback(profile.name, "Applicant")}</h2>
                <p>{textOrFallback(profile.preferred_role, "Career interest not specified")}</p>
              </div>
            </div>

            <div className="hr-surface-card hr-applicant-contact-grid">
              <div className="hr-profile-info-card">
                <FaEnvelope />
                <div>
                  <span>Email</span>
                  <strong>{textOrFallback(profile.email)}</strong>
                </div>
              </div>
              <div className="hr-profile-info-card">
                <FaPhone />
                <div>
                  <span>Phone</span>
                  <strong>{textOrFallback(profile.phone)}</strong>
                </div>
              </div>
              <div className="hr-profile-info-card">
                <FaMapMarkerAlt />
                <div>
                  <span>Preferred Location</span>
                  <strong>{textOrFallback(profile.preferred_location)}</strong>
                </div>
              </div>
              <div className="hr-profile-info-card">
                <FaCalendarAlt />
                <div>
                  <span>Last Updated</span>
                  <strong>{textOrFallback(profile.updated_at)}</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="hr-applicant-grid">
            <article className="hr-surface-card hr-applicant-section">
              <h3>Basic information</h3>
              <div className="hr-applicant-detail-list">
                <p><strong>Date of Birth:</strong> {textOrFallback(profile.dob)}</p>
                <p><strong>Gender:</strong> {textOrFallback(profile.gender)}</p>
                <p><strong>Address:</strong> {textOrFallback(profile.address)}</p>
                <p><strong>Languages Known:</strong> {textOrFallback(profile.languages_known)}</p>
              </div>
            </article>

            <article className="hr-surface-card hr-applicant-section">
              <h3>Education</h3>
              <div className="hr-applicant-detail-list">
                <p><strong>Qualification:</strong> {textOrFallback(profile.qualification)}</p>
                <p><strong>College:</strong> {textOrFallback(profile.college_name)}</p>
                <p><strong>Branch:</strong> {textOrFallback(profile.branch)}</p>
                <p><strong>Graduation Year:</strong> {textOrFallback(profile.graduation_year)}</p>
                <p><strong>Percentage:</strong> {profile.percentage ? `${profile.percentage}%` : "Not provided"}</p>
              </div>
            </article>

            <article className="hr-surface-card hr-applicant-section">
              <h3>Skills and achievements</h3>
              <div className="hr-applicant-detail-list">
                <p><strong>Skills:</strong> {textOrFallback(profile.skills)}</p>
                <p><strong>Certifications:</strong> {textOrFallback(profile.certifications)}</p>
                <p><strong>Projects:</strong> {textOrFallback(profile.projects)}</p>
              </div>
            </article>

            <article className="hr-surface-card hr-applicant-section">
              <h3>Experience and goals</h3>
              <div className="hr-applicant-detail-list">
                <p><strong>Experience:</strong> {textOrFallback(profile.experience, "Fresher")}</p>
                <p><strong>Preferred Role:</strong> {textOrFallback(profile.preferred_role)}</p>
                <p><strong>Expected Salary:</strong> {profile.expected_salary ? `₹${profile.expected_salary}` : "Not provided"}</p>
              </div>
            </article>
          </section>

          <section className="hr-applicant-grid">
            <article className="hr-surface-card hr-applicant-section">
              <h3>Resume</h3>
              {profile.resume_url ? (
                <div className="hr-card-actions">
                  <a
                    href={`http://localhost:8080${profile.resume_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn hr-inline-btn"
                  >
                    View Resume
                  </a>
                  <a
                    href={`http://localhost:8080${profile.resume_url}`}
                    download
                    className="btn hr-outline-btn"
                  >
                    Download Resume
                  </a>
                </div>
              ) : (
                <p className="text-muted mb-0">No resume uploaded.</p>
              )}
            </article>

            <article className="hr-surface-card hr-applicant-section">
              <h3>Next action</h3>
              {profile.job_id ? (
                <button
                  className="btn hr-hero-primary"
                  onClick={() =>
                    navigate(`/hrdashboard/schedule-interview/${seekerId}/${profile.job_id}`)
                  }
                >
                  <FaUserGraduate className="me-2" />
                  Schedule Interview
                </button>
              ) : (
                <p className="text-muted mb-0">No job application found to schedule an interview.</p>
              )}
            </article>
          </section>
        </>
      )}
    </div>
  );
}
