// src/components/Sign.jsx
import React from "react";
import { NavLink } from "react-router-dom";

class Sign extends React.Component {
  render() {
    return (
      <>
        {/* Login Form */}
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-5">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h3 className="text-center fw-bold mb-4">LOGIN</h3>

                    <form>
                      {/* Username */}
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your username"
                        />
                      </div>

                      {/* Password */}
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter your password"
                        />
                      </div>

                      {/* Role Selection */}
                      <div className="mb-3">
                        <label className="form-label">Select Role</label>
                        <select className="form-select">
                          <option value="">-- Select Role --</option>
                          <option value="admin">Admin</option>
                          <option value="hr">HR</option>
                          <option value="user">User</option>
                        </select>
                      </div>

                      {/* Remember + Forgot */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input me-1"
                          />{" "}
                          Save password
                        </div>
                        <NavLink to="/forgot" className="text-danger small">
                          Forgot Password?
                        </NavLink>
                      </div>

                      {/* Submit */}
                      <button type="submit" className="btn btn-success w-100" >
                        LOGIN
                      </button>
                    </form>

                    {/* Links */}
                    <p className="text-center small">
                      Haven’t Any Account Yet?{" "}
                      <NavLink to="/register" className="text-danger fw-bold">
                        Click Here
                      </NavLink>
                    </p>
                    <p className="text-center small">or</p>
                    <p className="text-center small">Login With Social</p>

                    {/* Social Login Buttons */}
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
      </>
    );
  }
}

export default Sign;

