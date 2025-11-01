import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminAuthService from "../service/AdminAuthService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Sign.css";

export default function Sign() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};
    if (!form.username) temp.username = "Username / Email is required";
    else if (
      form.role !== "admin" &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.username)
    )
      temp.username = "Please enter a valid email";

    if (!form.password) temp.password = "Password is required";
    else if (form.password.length < 6)
      temp.password = "Password must be at least 6 characters";

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

      if (role === "admin")
        res = await AdminAuthService.login({ username, password });
      else if (role === "hr")
        res = await AdminAuthService.hrLogin({ email: username, password });
      else res = await AdminAuthService.UserLogin({ email: username, password });

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
      } else throw new Error("Invalid response from server");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vibrant-bg">
      <motion.div
        className="vibrant-login-container"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="vibrant-login-card p-5"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-center fw-bold mb-4 text-light">Welcome Back 👋</h2>
          <p className="text-center text-light mb-4">
            Sign in to continue your journey with <b>QuickStart Career</b>
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username / Email */}
            <div className="mb-3">
              <label className="form-label text-white">Username / Email</label>
              <input
                type="text"
                name="username"
                className={`form-control vibrant-input ${
                  errors.username ? "is-invalid" : ""
                }`}
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username or email"
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label className="form-label text-white">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control vibrant-input ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* Role */}
            <div className="mb-3">
              <label className="form-label text-light">Select Role</label>
              <select
                name="role"
                className={`form-select vibrant-input ${
                  errors.role ? "is-invalid" : ""
                }`}
                value={form.role}
                onChange={handleChange}
              >
                <option value="">-- Select Role --</option>
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="user">User</option>
              </select>
              {errors.role && (
                <div className="invalid-feedback">{errors.role}</div>
              )}
            </div>

            <motion.button
              type="submit"
              className="btn vibrant-btn w-100 mt-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </motion.button>
          </form>

          <p className="text-center text-light small mt-3">
            Don’t have an account?{" "}
            <NavLink to="/register" className="text-warning fw-bold">
              Register Here
            </NavLink>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
