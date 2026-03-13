import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckEmail() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #007bff, #00bcd4)",
      }}
    >
      <div
        className="card shadow-lg border-0 text-center p-5"
        style={{
          width: "420px",
          borderRadius: "18px",
          animation: "fadeIn 0.6s ease",
        }}
      >
        <div
          className="mb-3"
          style={{
            fontSize: "60px",
          }}
        >
          📩
        </div>

        <h3 className="fw-bold text-primary mb-3">Check Your Email</h3>

        <p className="text-muted mb-4">
          We’ve sent a password reset link to your registered email address.  
          <br />
          Please open your inbox and click the link to reset your password.
        </p>

        <button
          className="btn btn-primary w-100 fw-semibold shadow-sm"
          onClick={() => navigate("/signup")}
          style={{
            background: "linear-gradient(90deg, #007bff, #00bcd4)",
            border: "none",
            borderRadius: "8px",
            transition: "0.3s",
          }}
        >
          Go to Login
        </button>

        <div className="mt-4">
          <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
            Didn’t receive the email?{" "}
            <span
              onClick={() => navigate("/forgot-password")}
              style={{
                color: "#007bff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Try again
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
