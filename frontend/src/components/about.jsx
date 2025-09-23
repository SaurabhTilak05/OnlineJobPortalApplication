import React from "react";
import { FaLightbulb, FaHandshake, FaUsers, FaGlobe } from "react-icons/fa";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="d-flex align-items-center text-light text-center"
        style={{
          minHeight: "60vh",
          background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/about-banner.jpg') center/cover no-repeat",
        }}
      >
        <div className="container">
          <h1 className="fw-bold display-4">About QuickStart Career</h1>
          <p className="lead mt-3">
            Bridging the gap between talent and opportunity 🚀
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src="/images/oneimg.webp"
                alt="Our Office"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold text-primary mb-3">Who We Are</h2>
              <p className="text-muted">
                QuickStart Career is a leading online job portal designed to
                empower job seekers and employers alike. Our mission is to make
                the hiring process simple, transparent, and effective.
              </p>
              <p className="text-muted">
                We believe every individual deserves the right opportunity to
                showcase their skills, and every organization deserves the right
                talent to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-4">Our Mission & Vision</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="p-4 shadow-sm rounded h-100">
                <h4 className="fw-bold">🌟 Our Mission</h4>
                <p className="text-muted">
                  To connect job seekers with opportunities, ensuring fair
                  access and inclusivity for all, regardless of location.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 shadow-sm rounded h-100">
                <h4 className="fw-bold">🚀 Our Vision</h4>
                <p className="text-muted">
                  To create a world where talent meets opportunity without
                  barriers, empowering careers and shaping the future of work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center text-primary mb-5">
            Our Core Values
          </h2>
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="p-4 border rounded h-100 shadow-sm">
                <FaHandshake size={40} className="text-primary mb-3" />
                <h5 className="fw-bold">Integrity</h5>
                <p className="text-muted">Staying true to our commitments.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded h-100 shadow-sm">
                <FaLightbulb size={40} className="text-warning mb-3" />
                <h5 className="fw-bold">Innovation</h5>
                <p className="text-muted">
                  Adapting and improving continuously.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded h-100 shadow-sm">
                <FaUsers size={40} className="text-success mb-3" />
                <h5 className="fw-bold">Customer First</h5>
                <p className="text-muted">Prioritizing our users’ needs.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded h-100 shadow-sm">
                <FaGlobe size={40} className="text-danger mb-3" />
                <h5 className="fw-bold">Inclusivity</h5>
                <p className="text-muted">Opportunities for everyone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-5">Meet Our Team</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <img
                src="/images/man1.jpg"
                alt="Team Member"
                className="rounded-circle mb-3 shadow"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h5 className="fw-bold">Jon Deos</h5>
              <p className="text-muted">Founder & CEO</p>
            </div>
            <div className="col-md-4 mb-4">
              <img
                src="/images/kishor.jpeg"
                alt="Team Member"
                className="rounded-circle mb-3 shadow"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h5 className="fw-bold">Kishor Wankhede</h5>
              <p className="text-muted">Head of Development</p>
            </div>
            <div className="col-md-4 mb-4">
              <img
                src="/images/man4.jpg"
                alt="Team Member"
                className="rounded-circle mb-3 shadow"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h5 className="fw-bold">Mike Johnson</h5>
              <p className="text-muted">Marketing Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-4">Our Achievements</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <h3 className="fw-bold text-success">10,000+</h3>
              <p>Jobs Posted</p>
            </div>
            <div className="col-md-4">
              <h3 className="fw-bold text-warning">500+</h3>
              <p>Employers Onboarded</p>
            </div>
            <div className="col-md-4">
              <h3 className="fw-bold text-danger">4.8/5</h3>
              <p>User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 text-light text-center"
        style={{
          background: "linear-gradient(45deg, #007bff, #6610f2)",
        }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Find Your Dream Job?</h2>
          <a href="/register" className="btn btn-warning btn-lg shadow-sm">
            Get Started
          </a>
        </div>
      </section>
    </>
  );
}
