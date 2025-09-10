import React, { useState } from "react";
import Jobservice from "../service/Jobservice.js";
import {  ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    placeholder="Enter your name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Message</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
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
    </section>
  );
}
