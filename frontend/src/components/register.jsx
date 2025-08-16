
import React, { useState } from "react";

const API_URL = "/api/job-seekers"; // <-- change to your real endpoint

export default function RegisterJobSeeker() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Full name is required";

    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";

    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Use at least 6 characters";

    if (!form.confirmPassword) e.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (form.phone && !/^\+?[0-9]{7,15}$/.test(form.phone))
      e.phone = "Enter a valid phone number";

    if (!form.address.trim()) e.address = "Address is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password, // hash on server!
          phone: form.phone.trim(),
          address: form.address.trim(),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Request failed (${res.status})`);
      }

      const data = await res.json();
      setServerMsg(
        data?.message || "Registration successful. You can now sign in."
      );
      // Optionally reset the form
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      setServerMsg(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const passwordStrength = (() => {
    const pw = form.password || "";
    let score = 0;
    if (pw.length >= 6) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (!pw) return { label: "", percent: 0 };
    const labels = ["Weak", "Okay", "Fair", "Good", "Strong"];
    const idx = Math.min(score - 1, labels.length - 1);
    return { label: labels[idx], percent: (score / 5) * 100 };
  })();

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Register as Job Seeker</h3>

                {serverMsg && (
                  <div className="alert alert-info" role="alert">
                    {serverMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="e.g. +919876543210"
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      rows={3}
                      placeholder="Your full address"
                    />
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Create a password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                    {passwordStrength.label && (
                      <div className="mt-2">
                        <div className="progress" role="progressbar" aria-label="Password strength">
                          <div
                            className="progress-bar"
                            style={{ width: `${passwordStrength.percent}%` }}
                          />
                        </div>
                        <small className="text-muted">Strength: {passwordStrength.label}</small>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      placeholder="Re-enter your password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={submitting}
                  >
                    {submitting ? "Registering..." : "Register"}
                  </button>

                  <p className="text-center mt-3 mb-0">
                    Already have an account? <a href="/signup">Login</a>
                  </p>
                </form>

                <hr className="my-4" />
                <div className="small text-muted">
                  <strong>Security note:</strong> The password is sent to the server where it
                  must be hashed (e.g., bcrypt) before storing into <code>job_seekers.password</code>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
