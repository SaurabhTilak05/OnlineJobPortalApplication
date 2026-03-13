import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Reset link sent. Please check your email.");
        setTimeout(() => navigate("/check-email"), 3000);
      } else {
        setMessage(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #007bff, #00bcd4)" }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          Forgot Password
        </h3>
        <p className="text-muted text-center mb-4">
          Enter your registered email and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control shadow-sm"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-primary w-100 fw-semibold shadow-sm"
            disabled={loading}
            type="submit"
            style={{
              background: "linear-gradient(90deg, #007bff, #00bcd4)",
              border: "none",
              transition: "0.3s",
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-4 text-center ${
              message.includes("sent") ? "alert-success" : "alert-danger"
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
