import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:8080/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful. Redirecting...");
        setTimeout(() => navigate("/signup"), 2000);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-bg d-flex justify-content-center align-items-center vh-100">
      <div className="reset-card card shadow-lg border-0 p-4">
        <h3 className="text-center mb-3 text-gradient">Reset Your Password</h3>
        <p className="text-muted text-center mb-4">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">New Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-primary w-100 fw-semibold reset-btn"
            disabled={loading}
            type="submit"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-4 text-center ${
              message.includes("successful") ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <div className="text-center mt-3">
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-link text-decoration-none"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
