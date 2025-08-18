import React, { useState } from "react";
import AddJObService from "../servise/addjobserv.js";

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });



  

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AddJObService.contactUs(formData)
      .then(() => {
        setMsg("Message sent successfully!");
        setFormData({
          full_name: "",
          email: "",
          message: "",
        });
         setTimeout(() => {
          setMsg("");
        }, 3000);
      })
      .catch(() => {
        setMsg(" Failed to send message. Please try again.");
         setTimeout(() => {
          setMsg("");
        }, 3000);
      });
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
              {msg && <div className="alert alert-info">{msg}</div>}

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

                <button type="submit" className="btn btn-success w-100">
                  Send Message
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
