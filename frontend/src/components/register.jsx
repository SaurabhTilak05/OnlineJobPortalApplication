import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import RegisterServ from "../service/registerserv.js";
import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaIdBadge,
  FaMapMarkedAlt,
  FaUserCheck,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

void motion;

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
    setForm({ ...form, [e.target.name]: e.target.value });
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
      temp.phone = "Enter a valid phone number";

    if (!form.address.trim()) temp.address = "Address is required";

    if (!form.password)
      temp.password = "Password is required";
    else if (form.password.length < 6)
      temp.password = "Password must be at least 6 characters";

    if (!form.confirmPassword)
      temp.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      temp.confirmPassword = "Passwords do not match";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    setSubmitting(true);

    RegisterServ.register(form)
      .then((res) => {
        toast.success(res.data.message || "✅ Registered successfully!");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          address: "",
        });
        setErrors({});
      })
      .catch(() => {
        toast.error("❌ Registration Failed! Please try again.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="register-shell">
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="register-layout"
        >
          <div className="register-showcase">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="register-showcase-card"
            >
              <span className="register-badge">Career Launchpad</span>
              <h1>Create your student profile with confidence.</h1>
              <p>
                Register once and keep your profile ready for placements, HR
                outreach, interviews, and resume-based shortlisting.
              </p>

              <div className="register-feature-list">
                <div className="register-feature">
                  <span><FaUserCheck /></span>
                  <div>
                    <strong>Verified student onboarding</strong>
                    <p>Clear step-by-step registration for faster profile setup.</p>
                  </div>
                </div>
                <div className="register-feature">
                  <span><FaIdBadge /></span>
                  <div>
                    <strong>Placement-ready profile</strong>
                    <p>Keep your details structured for recruiters and campus drives.</p>
                  </div>
                </div>
                <div className="register-feature">
                  <span><FaMapMarkedAlt /></span>
                  <div>
                    <strong>Complete identity details</strong>
                    <p>Address, contact, and credentials stay organized in one place.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="register-panel">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="register-panel-card"
            >
              <div className="register-panel-header">
                <span className="register-panel-kicker">Student Registration</span>
                <h2>Register as Job Seeker</h2>
                <p>Fill in your details to create a clean professional profile.</p>
              </div>

              <form onSubmit={handleSubmit} className="register-form">
                <div className="register-form-grid">
                  {[
                    {
                      label: "Full Name",
                      name: "name",
                      type: "text",
                      placeholder: "Enter your full name",
                    },
                    {
                      label: "Email Address",
                      name: "email",
                      type: "email",
                      placeholder: "you@example.com",
                    },
                    {
                      label: "Phone",
                      name: "phone",
                      type: "tel",
                      placeholder: "+91XXXXXXXXXX",
                    },
                  ].map((input, idx) => (
                    <motion.div
                      key={input.name}
                      className={`register-field ${
                        input.name === "email" ? "register-field-full" : ""
                      }`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <label className="register-label">{input.label}</label>
                      <input
                        type={input.type}
                        name={input.name}
                        value={form[input.name]}
                        onChange={handleChange}
                        className={`register-input ${
                          errors[input.name] ? "register-input-error" : ""
                        }`}
                        placeholder={input.placeholder}
                      />
                      {errors[input.name] && (
                        <div className="register-error">{errors[input.name]}</div>
                      )}
                    </motion.div>
                  ))}

                  <motion.div
                    className="register-field register-field-full"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="register-label">Address</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className={`register-input register-textarea ${
                        errors.address ? "register-input-error" : ""
                      }`}
                      rows={3}
                      placeholder="Your complete address"
                    />
                    {errors.address && (
                      <div className="register-error">{errors.address}</div>
                    )}
                  </motion.div>

                  <motion.div
                    className="register-field"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <label className="register-label">Password</label>
                    <div className="register-password-wrap">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className={`register-input ${
                          errors.password ? "register-input-error" : ""
                        }`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        className="register-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="register-error">{errors.password}</div>
                    )}
                  </motion.div>

                  <motion.div
                    className="register-field"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <label className="register-label">Confirm Password</label>
                    <div className="register-password-wrap">
                      <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`register-input ${
                          errors.confirmPassword ? "register-input-error" : ""
                        }`}
                        placeholder="Re-enter your password"
                      />
                      <button
                        type="button"
                        className="register-password-toggle"
                        onClick={() => setShowConfirm(!showConfirm)}
                        aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="register-error">{errors.confirmPassword}</div>
                    )}
                  </motion.div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className="register-submit-btn"
                  disabled={submitting}
                >
                  <span>{submitting ? "Registering..." : "Create Account"}</span>
                  <FaArrowRight />
                </motion.button>

                <p className="register-footer-link">
                  Already have an account?{" "}
                  <NavLink to="/signup">Login</NavLink>
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
