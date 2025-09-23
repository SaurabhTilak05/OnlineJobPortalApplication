// src/components/Sign.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminAuthService from "../service/AdminAuthService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Sign() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  // 🔹 Validate form
  const validate = () => {
    let temp = {};
    if (!form.username) {
      temp.username = "Username / Email is required";
    } else if (
      form.role !== "admin" && // only hr/user require email format
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.username)
    ) {
      temp.username = "Please enter a valid email";
    }

    if (!form.password) {
      temp.password = "Password is required";
    } else if (form.password.length < 6) {
      temp.password = "Password must be at least 6 characters";
    }

    if (!form.role) {
      temp.role = "Please select a role";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0; // ✅ return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const { username, password, role } = form;
    console.log("Form data on submit:", form);

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

      console.log("Login response:", res);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role || role);
        if (res.seeker_id) {
          localStorage.setItem("seeker_id", res.seeker_id);
        }
      } else {
        throw new Error("Invalid response from server");
      }

      if (role === "admin") {
        navigate("/adminhome");
      } else if (role === "hr") {
        navigate("/hrdashboard");
      } else {
        navigate("/userProfile/user-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h3 className="text-center fw-bold mb-4">LOGIN</h3>

                <form onSubmit={handleSubmit}>
                  {/* Username / Email */}
                  <div className="mb-3">
                    <label className="form-label">Username / Email</label>
                    <input
                      type="text"
                      name="username"
                      className={`form-control ${
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
                    <label className="form-label">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        top: "38px",
                        right: "10px",
                        cursor: "pointer",
                        color: "#555",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div className="mb-3">
                    <label className="form-label">Select Role</label>
                    <select
                      name="role"
                      className={`form-select ${errors.role ? "is-invalid" : ""}`}
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

                  {/* Submit */}
                  <button type="submit" className="btn btn-success w-100">
                    {loading ? "Logging in..." : "LOGIN"}
                  </button>
                </form>

                <p className="text-center small mt-3">
                  Haven’t Any Account Yet?{" "}
                  <NavLink to="/register" className="text-danger fw-bold">
                    Register Here
                  </NavLink>
                </p>

                
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
