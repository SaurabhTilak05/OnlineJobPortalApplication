import React from "react";

export default function Contact() {
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
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your message..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-5">
          <p><strong>Email:</strong> support@quickstart.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
        </div>
      </div>
    </section>
  );
}
