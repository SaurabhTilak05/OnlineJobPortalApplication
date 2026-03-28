import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <span className="site-footer-kicker">QuickStart Career</span>
            <h2>Build better career momentum with one trusted platform.</h2>
            <p>
              QuickStart Career helps students, recruiters, and administrators
              stay connected through jobs, applications, interviews, and
              placement workflows.
            </p>

            <div className="site-footer-socials">
              <a href="#" aria-label="Facebook" className="site-footer-social">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter" className="site-footer-social">
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/saurabh_tilak_061/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="site-footer-social"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/saurabh-tilak-502ab6350/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="site-footer-social"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="site-footer-links">
            <div className="site-footer-column">
              <h3>Explore</h3>
              <NavLink className="site-footer-link" to="/">Home</NavLink>
              <NavLink className="site-footer-link" to="/about">About Us</NavLink>
              <NavLink className="site-footer-link" to="/contact">Contact</NavLink>
              <NavLink className="site-footer-link" to="/signup">Sign In</NavLink>
              <NavLink className="site-footer-link" to="/register">Register</NavLink>
            </div>

            <div className="site-footer-column">
              <h3>Contact</h3>
              <div className="site-footer-contact-item">
                <span><FaEnvelope /></span>
                <div>
                  <small>Email</small>
                  <strong>quickstartcareer01@gmail.com</strong>
                </div>
              </div>
              <div className="site-footer-contact-item">
                <span><FaPhoneAlt /></span>
                <div>
                  <small>Phone</small>
                  <strong>+91 97653 03776</strong>
                </div>
              </div>
              <div className="site-footer-contact-item">
                <span><FaMapMarkerAlt /></span>
                <div>
                  <small>Address</small>
                  <strong>123, Tech Park, Pune, India</strong>
                </div>
              </div>
            </div>

            <div className="site-footer-column">
              <h3>Updates</h3>
              <p className="site-footer-note">
                Stay connected for the latest placement drives, platform
                updates, and career opportunities.
              </p>
              <form className="site-footer-newsletter">
                <input type="email" placeholder="Enter your email" required />
                <button type="submit">
                  <span>Subscribe</span>
                  <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>
            Copyright {new Date().getFullYear()} <strong>QuickStart Career</strong>.
            All rights reserved.
          </p>
          <p>
            Developed by <strong>Tilak Saurabh</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
