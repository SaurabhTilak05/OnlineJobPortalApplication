// src/components/Register.jsx
import React from "react";
import { NavLink } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, contact } = this.state;

    if (!name || !email || !password || !confirmPassword || !contact) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Registration Successful!");
    console.log(this.state);
  };

  render() {
    return (
      <section className="py-5">
        <div className="container1">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h3 className="text-center mb-4">Register</h3>
                  <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Contact</label>
                      <input
                        type="text"
                        className="form-control"
                        name="contact"
                        value={this.state.contact}
                        onChange={this.handleChange}
                        placeholder="Enter your contact number"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Enter password"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        placeholder="Confirm password"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Register
                    </button>

                    <div className="text-center mt-3">
                      Already have an account?{" "}
                      <NavLink to="/signup">Login</NavLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
