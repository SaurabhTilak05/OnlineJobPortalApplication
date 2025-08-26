import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBook,
} from "react-icons/fa";

export default function ViewStudProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading)
    return <h3 className="text-center mt-5">⏳ Loading profile...</h3>;
  if (error) return <h3 className="text-danger text-center mt-5">{error}</h3>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      {profile ? (
        <div
          className="card shadow-lg border-0 p-4 w-100"
          style={{ maxWidth: "700px", borderRadius: "16px" }}
        >
          {/* Header Section without Image */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">{profile.name || "Student"}</h2>
            <p className="text-muted mb-1">
              <FaUserGraduate className="me-2 text-success" />
              Student
            </p>
            <span className="badge bg-success px-3 py-2">
              {profile.course || "Course Not Assigned"}
            </span>
          </div>

          {/* Student Information */}
          <h5 className="fw-bold mb-3 text-secondary">Student Information</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 rounded shadow-sm bg-light d-flex align-items-center">
                <FaEnvelope className="text-success me-3 fs-5" />
                <div>
                  <p className="mb-0 text-muted small">Email</p>
                  <p className="mb-0 fw-semibold">{profile.email || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded shadow-sm bg-light d-flex align-items-center">
                <FaPhone className="text-success me-3 fs-5" />
                <div>
                  <p className="mb-0 text-muted small">Phone</p>
                  <p className="mb-0 fw-semibold">{profile.phone || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded shadow-sm bg-light d-flex align-items-center">
                <FaMapMarkerAlt className="text-success me-3 fs-5" />
                <div>
                  <p className="mb-0 text-muted small">Address</p>
                  <p className="mb-0 fw-semibold">{profile.address || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded shadow-sm bg-light d-flex align-items-center">
                <FaBook className="text-success me-3 fs-5" />
                <div>
                  <p className="mb-0 text-muted small">Course</p>
                  <p className="mb-0 fw-semibold">{profile.course || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="text-muted">No profile found.</h4>
      )}
    </div>
  );
}
