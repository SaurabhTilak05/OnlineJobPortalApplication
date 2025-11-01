import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">

          {/* About Section */}
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5 className="fw-bold mb-3 text-uppercase">QuickStart Career</h5>
            <p className="small">
              Your trusted platform for job postings, placements, and career
              growth. Connecting job seekers with top companies effortlessly.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3 mt-3 justify-content-md-start justify-content-center">
              <a href="#" className="text-white fs-5 footer-icon">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white fs-5 footer-icon">
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/saurabh_tilak_061/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5 footer-icon"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/saurabh-tilak-502ab6350/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5 footer-icon"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-sm-6">
            <h6 className="fw-bold mb-3 text-uppercase">Quick Links</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <NavLink className="footer-link" to="/">Home</NavLink>
              </li>
              <li className="mb-2">
                <NavLink className="footer-link" to="/about">About Us</NavLink>
              </li>
              <li className="mb-2">
                <NavLink className="footer-link" to="/contact">Contact</NavLink>
              </li>
              <li className="mb-2">
                <NavLink className="footer-link" to="/signup">Sign Up</NavLink>
              </li>
              <li className="mb-2">
                <NavLink className="footer-link" to="/register">Register</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 col-sm-6">
            <h6 className="fw-bold mb-3 text-uppercase">Contact Info</h6>
            <p className="small mb-1">
              <strong>Email:</strong> quickstartcareer01@gmail.com
            </p>
            <p className="small mb-1">
              <strong>Phone:</strong> +91 97653 03776
            </p>
            <p className="small">
              <strong>Address:</strong> 123, Tech Park, Pune, India
            </p>
          </div>

          {/* Newsletter */}
          <div className="col-lg-2 col-md-6 col-sm-12">
            <h6 className="fw-bold mb-3 text-uppercase">Newsletter</h6>
            <p className="small mb-2">Subscribe for latest updates</p>
            <form className="newsletter-form">
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Enter email"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-danger btn-sm w-100 fw-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="bg-light opacity-25 mt-4" />

        <div className="text-center small">
          &copy; {new Date().getFullYear()} <strong>QuickStart Career</strong>. All rights reserved. <br />
          <span className="text-secondary">
            Developed by <strong>Tilak Saurabh</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
