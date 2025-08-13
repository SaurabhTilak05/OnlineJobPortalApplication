
import React from "react";

export default function About() {
  return (
    <>
      {/* Header Section */}
      <section className="py-5 text-center bg-light">
        <div className="container">
          <h1 className="fw-bold">About Us</h1>
          <p className="lead text-muted">
            We connect job seekers with opportunities that fit their dreams.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-primary mb-4">Who We Are</h2>
          <p>
            Our platform helps bridge the gap between talented professionals
            and employers looking for the right fit. We are committed to making
            job searching simple, fast, and effective.
          </p>

          <div className="row mt-4">
            <div className="col-md-6">
              <h4 className="fw-bold">Our Mission</h4>
              <p>
                To make job searching accessible to everyone, no matter where
                they are.
              </p>
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold">Our Vision</h4>
              <p>
                A world where talent meets opportunity without barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-primary mb-4">Our Core Values</h2>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="p-3 border rounded text-center">
                <h5 className="fw-bold">Integrity</h5>
                <p className="mb-0">We stay true to our commitments.</p>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="p-3 border rounded text-center">
                <h5 className="fw-bold">Innovation</h5>
                <p className="mb-0">We adapt and improve continuously.</p>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="p-3 border rounded text-center">
                <h5 className="fw-bold">Customer First</h5>
                <p className="mb-0">We prioritize our users’ needs.</p>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="p-3 border rounded text-center">
                <h5 className="fw-bold">Inclusivity</h5>
                <p className="mb-0">Opportunities for everyone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-primary mb-4 text-center">Meet Our Team</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <img
                src="/images/man1.jpg"
                alt="Team Member"
                className="rounded-circle mb-3"
              />
              <h5 className="fw-bold">John Doe</h5>
              <p className="text-muted">Founder & CEO</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <img
                src="/images/man2.jpg"
                alt="Team Member"
                className="rounded-circle mb-3"
              />
              <h5 className="fw-bold">Jane Smith</h5>
              <p className="text-muted">Head of Development</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <img
                src="/images/man4.jpg"
                alt="Team Member"
                className="rounded-circle mb-3"
              />
              <h5 className="fw-bold">Mike Johnson</h5>
              <p className="text-muted">Marketing Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-4">Our Achievements</h2>
          <div className="row">
            <div className="col-md-4">
              <h3 className="fw-bold">10,000+</h3>
              <p>Jobs Posted</p>
            </div>
            <div className="col-md-4">
              <h3 className="fw-bold">500+</h3>
              <p>Employers Onboarded</p>
            </div>
            <div className="col-md-4">
              <h3 className="fw-bold">4.8/5</h3>
              <p>User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Find Your Dream Job?</h2>
          <a href="/register" className="btn btn-primary btn-lg">
            Get Started
          </a>
        </div>
      </section>
    </>
  );
}
