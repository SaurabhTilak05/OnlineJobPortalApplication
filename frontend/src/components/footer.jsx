import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./footer.css"; // optional for custom styling

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white pt-5">
      <div className="container">
        <div className="row">

          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">QuickStart Career</h5>
            <p>
              Your trusted platform for job postings, placements, and career growth.
              Connecting job seekers with top companies effortlessly.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white fs-5"><FaFacebookF /></a>
              <a href="#" className="text-white fs-5"><FaTwitter /></a>
              <a href="#" className="text-white fs-5"><FaInstagram /></a>
              <a href="#" className="text-white fs-5"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><NavLink className="text-white text-decoration-none" to="/">Home</NavLink></li>
              <li><NavLink className="text-white text-decoration-none" to="/about">About Us</NavLink></li>
              <li><NavLink className="text-white text-decoration-none" to="/contact">Contact</NavLink></li>
              <li><NavLink className="text-white text-decoration-none" to="/signup">Sign Up</NavLink></li>
              <li><NavLink className="text-white text-decoration-none" to="/register">Register</NavLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Contact Info</h6>
            <p><strong>Email:</strong> support@quickstart.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> 123, Tech Park, Pune, India</p>
          </div>

          {/* Newsletter */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">Newsletter</h6>
            <p className="small">Subscribe for latest updates</p>
            <form>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Email"
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger btn-sm w-100">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="bg-light" />

        <div className="text-center pb-3">
          &copy; {new Date().getFullYear()} QuickStart Career. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
