// src/components/Sign.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminAuthService from "../service/AdminAuthService";

export default function Sign() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, role } = form;
    console.log("Form data on submit:", form);

    if (!username || !password || !role) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      let res;

      if (role === "admin") {
        // ✅ Admin login → backend expects username + password
        res = await AdminAuthService.login({ username, password });
      } else if (role === "hr") {
        // ✅ HR login → backend also expects username + password
        res = await AdminAuthService.hrLogin({
          username,
          password,
        });
      } else {
        alert("User login not implemented yet");
        return;
      }

      // ✅ Save token & role for PrivateRoute check
      if (res.token && res.role) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
      } else {
        throw new Error("Invalid response from server");
      }

      // ✅ Redirect based on role
      if (res.role === "admin") {
        navigate("/adminhome");
      } else if (res.role === "hr") {
        navigate("/hrdashboard");
      } else if (res.role === "user") {
        navigate("/user-dashboard");
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
                      className="form-control"
                      value={form.username}
                      onChange={handleChange}
                      placeholder="Enter username or email"
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                  </div>

                  {/* Role Selection */}
                  <div className="mb-3">
                    <label className="form-label">Select Role</label>
                    <select
                      name="role"
                      className="form-select"
                      value={form.role}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Role --</option>
                      <option value="admin">Admin</option>
                      <option value="hr">HR</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  {/* Remember + Register */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <input type="checkbox" className="form-check-input me-1" /> Save password
                    </div>
                    <NavLink to="/register" className="text-danger fw-bold">
                      Register
                    </NavLink>
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

                <p className="text-center small">or</p>
                <p className="text-center small">Login With Social</p>

                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-outline-danger">Google</button>
                  <button className="btn btn-primary">Facebook</button>
                  <button className="btn btn-info text-white">Twitter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
