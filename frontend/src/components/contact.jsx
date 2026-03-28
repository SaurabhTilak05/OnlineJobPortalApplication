import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Jobservice from "../service/Jobservice.js";
import "./contact.css";

void motion;

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};

    if (!formData.full_name.trim()) {
      temp.full_name = "Full name is required";
    } else if (!/^[A-Za-z\s]{3,}$/.test(formData.full_name)) {
      temp.full_name = "Enter a valid name (min 3 letters)";
    }

    if (!formData.email) {
      temp.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      temp.email = "Enter a valid email address";
    }

    if (!formData.message.trim()) {
      temp.message = "Message is required";
    } else if (formData.message.length < 1) {
      temp.message = "Message must be at least 2 characters long";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setSubmitting(true);

    try {
      await Jobservice.contactUs(formData);
      toast.success("Message sent successfully!", { autoClose: 3000 });
      setFormData({ full_name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.", {
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      className="contact-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div className="container">
        <div className="contact-layout">
          <motion.div
            className="contact-showcase"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="contact-showcase-card">
              <span className="contact-kicker">Contact Support</span>
              <h1>Let&apos;s help you move faster with the right guidance.</h1>
              <p>
                Reach out for platform support, placement help, recruiter
                questions, or account-related assistance. We will get back to
                you as soon as possible.
              </p>

              <div className="contact-feature-list">
                <article className="contact-feature">
                  <span><FaHeadset /></span>
                  <div>
                    <strong>Quick response support</strong>
                    <p>Share your issue clearly and our team can assist you faster.</p>
                  </div>
                </article>
                <article className="contact-feature">
                  <span><FaClock /></span>
                  <div>
                    <strong>Reliable follow-up</strong>
                    <p>Your message is captured in the admin panel for direct tracking.</p>
                  </div>
                </article>
              </div>

              <div className="contact-info-grid">
                <article className="contact-info-card">
                  <span><FaEnvelope /></span>
                  <div>
                    <small>Email</small>
                    <strong>quickstartcareer01@gmail.com</strong>
                  </div>
                </article>
                <article className="contact-info-card">
                  <span><FaPhoneAlt /></span>
                  <div>
                    <small>Phone</small>
                    <strong>+91 97653 03776</strong>
                  </div>
                </article>
                <article className="contact-info-card">
                  <span><FaMapMarkerAlt /></span>
                  <div>
                    <small>Support scope</small>
                    <strong>Students, HR, and admin queries</strong>
                  </div>
                </article>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-panel"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="contact-panel-card">
              <div className="contact-panel-head">
                <span className="contact-panel-label">Send a message</span>
                <h2>Tell us what you need</h2>
                <p>Fill out the form below and our team will get back to you soon.</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-field">
                  <label className="contact-label">Full Name</label>
                  <input
                    type="text"
                    className={`contact-input ${
                      errors.full_name ? "contact-input-error" : ""
                    }`}
                    name="full_name"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                  {errors.full_name && (
                    <div className="contact-error">{errors.full_name}</div>
                  )}
                </div>

                <div className="contact-field">
                  <label className="contact-label">Email Address</label>
                  <input
                    type="email"
                    className={`contact-input ${
                      errors.email ? "contact-input-error" : ""
                    }`}
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="contact-error">{errors.email}</div>
                  )}
                </div>

                <div className="contact-field">
                  <label className="contact-label">Message</label>
                  <textarea
                    className={`contact-input contact-textarea ${
                      errors.message ? "contact-input-error" : ""
                    }`}
                    rows="5"
                    name="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && (
                    <div className="contact-error">{errors.message}</div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="contact-submit-btn"
                  disabled={submitting}
                >
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                  <FaArrowRight />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <ToastContainer position="top-center" theme="colored" />
    </motion.section>
  );
}
