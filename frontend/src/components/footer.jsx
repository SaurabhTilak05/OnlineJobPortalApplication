import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        
        {/* Left Side */}
        <p className="mb-2 mb-md-0 text-center text-md-start small">
          © {new Date().getFullYear()} <span className="fw-bold">Quick Start Career</span> | All Rights Reserved
        </p>

        {/* Right Side (Social Icons) */}
        <div className="d-flex gap-3">
          <a href="https://facebook.com" className="text-light" aria-label="Facebook">
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com" className="text-light" aria-label="Twitter">
            <FaTwitter size={20} />
          </a>
          <a href="https://linkedin.com" className="text-light" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </a>
          <a href="https://instagram.com" className="text-light" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .footer {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          .footer a {
            transition: color 0.3s ease-in-out;
          }
          .footer a:hover {
            color: #28a745 !important; /* Green highlight on hover */
          }
        `}
      </style>
    </footer>
  );
}
