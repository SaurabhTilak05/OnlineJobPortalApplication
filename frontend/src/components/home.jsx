import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBriefcase, FaUsers, FaBuilding, FaUserCircle, FaMapMarkerAlt, } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingPlacements, setLoadingPlacements] = useState(true);

  // Fetch latest jobs
  useEffect(() => {
    fetch("http://localhost:8080/allJob")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoadingJobs(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoadingJobs(false);
      });
  }, []);

  // Fetch placements
  useEffect(() => {
    fetch("http://localhost:8080/admin/placements")
      .then((res) => res.json())
      .then((data) => {
        setPlacements(data.placements || []);
        setLoadingPlacements(false);
      })
      .catch((err) => {
        console.error("Error fetching placements:", err);
        setLoadingPlacements(false);
      });
  }, []);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeSide = (direction = "left") => ({
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  });

  return (
    <>
      {/* Hero Section */}
    <motion.section
  className="hero d-flex align-items-center text-center text-light"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeUp}
  style={{
    backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('/images/banner.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "90vh",
  }}
>
  <div className="container">
    <h1 className="fw-bold display-3">
      Find Your <span className="text-warning">Dream Job</span> Today
    </h1>
    <p className="lead mt-3">
      QuickStart Career connects job seekers with top employers. Explore jobs, build your career, and grow faster!
    </p>
    <div className="mt-4">
      <NavLink to="/register" className="btn btn-warning me-3 px-4 py-2 shadow-sm">
        Register Now
      </NavLink>
      <NavLink to="/signup" className="btn btn-outline-light px-4 py-2 shadow-sm">
        Browse Jobs
      </NavLink>
    </div>
  </div>
</motion.section>


      {/* Stats Section */}
      <motion.section
        className="py-5 bg-light text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeSide("left")}
      >
        <div className="container">
          <div className="row g-4">
            {[
              { count: "10K+", label: "Active Jobs", color: "text-primary" },
              { count: "5K+", label: "Employers", color: "text-success" },
              { count: "20K+", label: "Job Seekers", color: "text-danger" },
              { count: "1K+", label: "Daily Applications", color: "text-warning" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="col-md-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                <h3 className={`fw-bold ${item.color}`}>{item.count}</h3>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-5 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="fw-bold mb-4">Why Choose QuickStart Career?</h2>
          <div className="row g-4">
            {[
              {
                icon: <FaBriefcase className="text-primary mb-3" size={40} />,
                title: "Latest Jobs",
                text: "Get instant access to thousands of job opportunities.",
              },
              {
                icon: <FaUsers className="text-success mb-3" size={40} />,
                title: "For Employers",
                text: "Post jobs and hire the best talent quickly & easily.",
              },
              {
                icon: <FaBuilding className="text-danger mb-3" size={40} />,
                title: "Top Companies",
                text: "Connect with reputed organizations hiring right now.",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                className="col-md-4"
                variants={fadeSide(idx % 2 === 0 ? "left" : "right")}
              >
                <div className="card shadow-sm p-4 h-100 hover-card">
                  {card.icon}
                  <h5 className="fw-bold">{card.title}</h5>
                  <p>{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest Jobs Section */}
    {/* 🌟 Latest Job Openings */}
<section className="section-bg">
  <div className="container py-5">
    <h2 className="fw-bold text-center mb-4 text-gradient">🚀 Latest Job Openings</h2>
    <div className="scroll-wrapper">
      <div className="scroll-track scroll-left">
        {jobs.concat(jobs).map((job, index) => (
          <div key={index} className="info-card">
            <h5 className="fw-bold">{job.title}</h5>
            <p className="mb-1 text-muted">{job.company}</p>
            <p className="small mb-1"><FaMapMarkerAlt className="me-1 text-danger" /> {job.location}</p>
            <p className="small mb-3"><FaBriefcase className="me-1 text-primary" /> {job.experience_required} yrs</p>
            <NavLink to={`/signup`} className="btn btn-sm btn-outline-primary rounded-pill">
              Apply Now
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* 🌟 Recently Placed Students */}
<section className="section-bg-alt">
  <div className="container py-5">
    <h2 className="fw-bold text-center mb-4 text-gradient">🎓 Recently Placed Students</h2>
    <div className="scroll-wrapper">
      <div className="scroll-track scroll-right">
        {placements.concat(placements).map((p, index) => (
          <div key={index} className="info-card">
            <div className="text-center mb-2">
              {p.profile_picture ? (
                <img
                  src={`http://localhost:8080${p.profile_picture}`}
                  alt={p.seeker_name}
                  className="student-img"
                />
              ) : (
                <FaUserCircle size={60} className="text-secondary" />
              )}
            </div>
            <h6 className="fw-bold text-center">{p.seeker_name}</h6>
            <p className="text-center mb-1 small">{p.job_title} @ {p.company}</p>
            <p className="text-center small text-muted">
              📅 {new Date(p.placement_date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>



      {/* CTA Section */}
      <motion.section
        className="cta-section text-light text-center py-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="fw-bold">Quickstart Your Career Today 🚀</h2>
          <p className="lead">
            Create your profile, upload resume & get your dream job faster.
          </p>
          <NavLink to="/signup" className="btn btn-warning px-4 py-2 mt-3">
            Get Started
          </NavLink>
        </div>
      </motion.section>

      {/* Custom Styles */}
      <style>
        {`
          .hero {
            min-height: 90vh;
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)),
              url('/images/banner.jpg') center/cover no-repeat;
          }
          .hover-card {
            border-radius: 12px;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .hover-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          }
          .cta-section {
            background: linear-gradient(45deg, #007bff, #6610f2);
          }
          .job-scroll-horizontal::-webkit-scrollbar,
          .placement-scroll-horizontal::-webkit-scrollbar {
            height: 8px;
          }
          .job-scroll-horizontal::-webkit-scrollbar-thumb,
          .placement-scroll-horizontal::-webkit-scrollbar-thumb {
            background-color: #007bff;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
}
