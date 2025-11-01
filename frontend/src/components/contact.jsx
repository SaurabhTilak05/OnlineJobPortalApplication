import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Jobservice from "../service/Jobservice.js";

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate inputs
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

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setSubmitting(true);

    try {
      await Jobservice.contactUs(formData);
      toast.success("✅ Message sent successfully!", { autoClose: 3000 });
      setFormData({ full_name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send message. Please try again.", {
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      className="py-5 text-light"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      style={{
        background:
          "linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.9) 35%, rgba(0,212,255,1) 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <motion.h1
          className="text-center fw-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Contact <span className="text-warning">Us</span>
        </motion.h1>
        <p className="lead text-center mb-5">
          Have questions or need help? Fill out the form below and we’ll get
          back to you soon.
        </p>

        <div className="row justify-content-center">
          <motion.div
            className="col-md-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="card shadow-lg border-0 p-4"
              style={{
                borderRadius: "15px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-light">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.full_name ? "is-invalid" : ""
                    }`}
                    name="full_name"
                    placeholder="Enter your name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                  {errors.full_name && (
                    <div className="invalid-feedback">{errors.full_name}</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-light">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-light">
                    Message
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    rows="4"
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn btn-warning w-100 fw-bold"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p>
            <strong>Email:</strong> quickstartcareer01@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +91 97653 03776
          </p>
        </motion.div>
      </div>

      {/* Toasts */}
      <ToastContainer position="top-center" theme="colored" />
    </motion.section>
  );
}
