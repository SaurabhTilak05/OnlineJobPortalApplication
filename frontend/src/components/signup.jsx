import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminAuthService from "../service/AdminAuthService";
import { FaArrowRight, FaEye, FaEyeSlash, FaShieldAlt, FaUserTie, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Sign.css";

export default function Sign() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const temp = {};

    if (!form.username) {
      temp.username = "Username / Email is required";
    } else if (
      form.role !== "admin" &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.username)
    ) {
      temp.username = "Please enter a valid email";
    }

    if (!form.password) {
      temp.password = "Password is required";
    } else if (form.password.length < 6) {
      temp.password = "Password must be at least 6 characters";
    }

    if (!form.role) temp.role = "Please select a role";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { username, password, role } = form;

    try {
      setLoading(true);
      let res;

      if (role === "admin") {
        res = await AdminAuthService.login({ username, password });
      } else if (role === "hr") {
        res = await AdminAuthService.hrLogin({ email: username, password });
      } else {
        res = await AdminAuthService.UserLogin({ email: username, password });
      }

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role || role);
        if (res.seeker_id) localStorage.setItem("seeker_id", res.seeker_id);

        navigate(
          role === "admin"
            ? "/adminhome"
            : role === "hr"
            ? "/hrdashboard"
            : "/userProfile/user-dashboard"
        );
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const roleCards = [
    { icon: <FaShieldAlt />, label: "Admin", text: "Control the platform, users, jobs, and activity." },
    { icon: <FaUserTie />, label: "HR", text: "Post roles, review applicants, and schedule interviews." },
    { icon: <FaUsers />, label: "Student", text: "Explore jobs, manage your profile, and apply faster." },
  ];

  return (
    <div className="signin-shell">
      <div className="signin-backdrop-shape shape-one" />
      <div className="signin-backdrop-shape shape-two" />

      <motion.div
        className="signin-layout"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <section className="signin-showcase">
          <span className="signin-kicker">QuickStart Career</span>
          <h1>Access your workspace with a cleaner, faster login experience.</h1>
          <p>
            Sign in as an admin, HR, or student and continue managing hiring, applications, and career
            progress from one platform.
          </p>

          <div className="signin-role-list">
            {roleCards.map((role) => (
              <article key={role.label} className="signin-role-card">
                <span className="signin-role-icon">{role.icon}</span>
                <div>
                  <strong>{role.label}</strong>
                  <p>{role.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <motion.section
          className="signin-panel"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <div className="signin-panel-head">
            <h2>Welcome back</h2>
            <p>Enter your credentials and choose the correct role to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="signin-field">
              <label>Username / Email</label>
              <input
                type="text"
                name="username"
                className={`form-control signin-input ${errors.username ? "is-invalid" : ""}`}
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username or email"
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            <div className="signin-field signin-password-field">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control signin-input ${errors.password ? "is-invalid" : ""}`}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="signin-eye-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="signin-field">
              <label>Select Role</label>
              <select
                name="role"
                className={`form-select signin-input ${errors.role ? "is-invalid" : ""}`}
                value={form.role}
                onChange={handleChange}
              >
                <option value="">-- Select Role --</option>
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="user">User</option>
              </select>
              {errors.role && <div className="invalid-feedback">{errors.role}</div>}
            </div>

            <div className="signin-links">
              <NavLink to="/forgot-password" className="signin-text-link">
                Forgot Password?
              </NavLink>
            </div>

            <motion.button
              type="submit"
              className="btn signin-submit-btn"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              <span>{loading ? "Logging in..." : "Login"}</span>
              {!loading && <FaArrowRight />}
            </motion.button>
          </form>

          <p className="signin-footer-text">
            Don&apos;t have an account?{" "}
            <NavLink to="/register" className="signin-register-link">
              Register here
            </NavLink>
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
}
