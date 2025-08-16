
import React, { useState } from "react";
import RegisterServ from "../servise/registerserv.js";

export default function RegisterJobSeeker() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [serverMsg, setServerMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.phone ||
      !form.address
    ) {
      setServerMsg("⚠️ All fields are required!");
      setTimeout(() => setServerMsg(""), 3000);
      return;
    }
    setSubmitting(true);

    RegisterServ.register(form)
      .then(() => {
        setServerMsg("Registered successfully!");

        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          address: "",
        });
        setTimeout(() => {
          setServerMsg("");
        }, 3000);
      })
      .catch((err) => {
        setServerMsg("Registration Failed! " + (err.message || err));
        setTimeout(() => {
          setServerMsg("");
        }, 3000);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

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

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. +919876543210"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="form-control"
                      rows={3}
                      placeholder="Your full address"
                    />
                  </div>

                  {/* Password with show/hide */}
                  <div className="mb-3 position-relative">
                    <label className="form-label">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Create a password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "38px",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>

                  {/* Confirm Password with show/hide */}
                  <div className="mb-4 position-relative">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Re-enter your password"
                    />
                    <span
                      onClick={() => setShowConfirm(!showConfirm)}
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "38px",
                        cursor: "pointer",
                      }}
                    >
                      {showConfirm ? "🙈" : "👁️"}
                    </span>
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
                  <strong>Security note:</strong> The password must be hashed
                  (e.g., bcrypt) before storing into{" "}
                  <code>job_seekers.password</code>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
