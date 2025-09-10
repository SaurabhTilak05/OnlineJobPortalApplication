import React, { useState } from "react";
import RegisterServ from "../service/registerserv.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify"; // ✅ import toast
import "react-toastify/dist/ReactToastify.css"; // ✅ toast css

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Full Name is required";
    else if (form.name.length < 3) temp.name = "Name must be at least 3 characters";

    if (!form.email) temp.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      temp.email = "Enter a valid email address";

    if (!form.phone) temp.phone = "Phone number is required";
    else if (!/^\+?[0-9]{10,15}$/.test(form.phone))
      temp.phone = "Enter a valid phone number (10-15 digits)";

    if (!form.address) temp.address = "Address is required";
    else if (form.address.length < 5) temp.address = "Address must be at least 5 characters";

    if (!form.password)
      temp.password = "Password is required";
    else if (form.password.length < 6 || !/[A-Za-z]/.test(form.password) || !/[0-9]/.test(form.password))
      temp.password = "Password must be at least 6 characters and contain letters & numbers";

    if (!form.confirmPassword) temp.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      temp.confirmPassword = "Passwords do not match";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    RegisterServ.register(form)
      .then(() => {
        toast.success("✅ Registered successfully!"); // ✅ toast success
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          address: "",
        });
      })
      .catch((err) => {
        toast.error("❌ Registration Failed! " + (err.message || err)); // ✅ toast error
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Register as Job Seeker</h3>

                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
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
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Phone */}
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
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  {/* Address */}
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
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Create a password"
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                        placeholder="Re-enter your password"
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setShowConfirm(!showConfirm)}
                        style={{ cursor: "pointer" }}
                      >
                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                      )}
                    </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
