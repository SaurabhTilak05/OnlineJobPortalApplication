import React, { useState } from "react";
import Jobservice from "../service/Jobservice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error while typing
  };

  // validation function
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
    } else if (formData.message.length < 10) {
      temp.message = "Message must be at least 10 characters long";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // stop if validation fails
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

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h1 className="text-center fw-bold mb-4">
          Contact <span className="text-danger">Us</span>
        </h1>
        <p className="lead text-center mb-5">
          Have questions or need help? Fill out the form below and we’ll get
          back to you as soon as possible.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 p-4">
              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
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
                  <label className="form-label fw-bold">Email Address</label>
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
                  <label className="form-label fw-bold">Message</label>
                  <textarea
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    rows="3"
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p>
            <strong>Email:</strong> support@quickstart.com
          </p>
          <p>
            <strong>Phone:</strong> +91 98765 43210
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" theme="colored" />
    </section>
  );
}
