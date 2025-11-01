import React, { useState } from "react";
import { motion } from "framer-motion";
import RegisterServ from "../service/registerserv.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <section
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "60px 0",
      }}
    >
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="row justify-content-center"
        >
          <div className="col-md-8 col-lg-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="card border-0 shadow-lg p-4 rounded-4"
              style={{
                background: "linear-gradient(145deg, #ffffffd9, #e0e7ffcc)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center fw-bold mb-4 text-primary"
              >
                Register as Job Seeker
              </motion.h3>

              <form onSubmit={handleSubmit}>
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
                    key={idx}
                    className="mb-3"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    <label className="form-label fw-semibold">
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      name={input.name}
                      value={form[input.name]}
                      onChange={handleChange}
                      className={`form-control ${errors[input.name] ? "is-invalid" : ""}`}
                      placeholder={input.placeholder}
                    />
                    {errors[input.name] && (
                      <div className="invalid-feedback">{errors[input.name]}</div>
                    )}
                  </motion.div>
                ))}

                {/* Address */}
                <motion.div
                  className="mb-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    rows={3}
                    placeholder="Your complete address"
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </motion.div>

                {/* Password */}
                <motion.div
                  className="mb-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="form-label fw-semibold">Password</label>
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
                      className="input-group-text bg-white"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </motion.div>

                {/* Confirm Password */}
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="Re-enter your password"
                    />
                    <span
                      className="input-group-text bg-white"
                      onClick={() => setShowConfirm(!showConfirm)}
                      style={{ cursor: "pointer" }}
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback d-block">
                      {errors.confirmPassword}
                    </div>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="btn btn-primary w-100 fw-semibold py-2"
                  disabled={submitting}
                >
                  {submitting ? "Registering..." : "Register"}
                </motion.button>

                <p className="text-center mt-3 mb-0">
                  Already have an account?{" "}
                  <a
                    href="/signup"
                    className="text-decoration-none text-primary fw-semibold"
                  >
                    Login
                  </a>
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
