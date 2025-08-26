import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService"; // adjust path if needed

export default function ViewStudProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await AdminAuthService.getProfile(); // ✅ call service method
        console.log(data);

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

  if (loading) return <h3 className="text-center mt-5">Loading profile...</h3>;
  if (error) return <h3 className="text-danger text-center mt-5">{error}</h3>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👤 My Profile</h2>
      {profile ? (
        <div className="card shadow p-3">
          <div className="row">
            <div className="col-md-3 text-center">
              <img
                src={profile.photoUrl || "/images/default-profile.png"}
                alt="Profile"
                className="rounded-circle border"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-9">
              <h4>{profile.name}</h4>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Contact:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
          
            </div>
          </div>
        </div>
      ) : (
        <h4 className="text-muted">No profile found.</h4>
      )}
    </div>
  );
}
