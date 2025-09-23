import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBriefcase, FaUsers, FaBuilding, FaUserCircle } from "react-icons/fa";
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
        setPlacements(data.placements || []); // assuming your API returns { placements: [...] }
        setLoadingPlacements(false);
      })
      .catch((err) => {
        console.error("Error fetching placements:", err);
        setLoadingPlacements(false);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero d-flex align-items-center text-center text-light">
        <div className="container">
          <h1 className="fw-bold display-3">
            Find Your <span className="text-warning">Dream Job</span> Today
          </h1>
          <p className="lead mt-3">
            QuickStart Career connects job seekers with top employers. Explore
            jobs, build your career, and grow faster!
          </p>
          <div className="mt-4">
            <NavLink
              to="/register"
              className="btn btn-warning me-3 px-4 py-2 shadow-sm"
            >
              Register Now
            </NavLink>
            <NavLink
              to="/signup"
              className="btn btn-outline-light px-4 py-2 shadow-sm"
            >
              Browse Jobs
            </NavLink>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <h3 className="fw-bold text-primary">10K+</h3>
              <p>Active Jobs</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold text-success">5K+</h3>
              <p>Employers</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold text-danger">20K+</h3>
              <p>Job Seekers</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold text-warning">1K+</h3>
              <p>Daily Applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Why Choose QuickStart Career?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm p-4 h-100 hover-card">
                <FaBriefcase className="text-primary mb-3" size={40} />
                <h5 className="fw-bold">Latest Jobs</h5>
                <p>Get instant access to thousands of job opportunities.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4 h-100 hover-card">
                <FaUsers className="text-success mb-3" size={40} />
                <h5 className="fw-bold">For Employers</h5>
                <p>Post jobs and hire the best talent quickly & easily.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4 h-100 hover-card">
                <FaBuilding className="text-danger mb-3" size={40} />
                <h5 className="fw-bold">Top Companies</h5>
                <p>Connect with reputed organizations hiring right now.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section (Horizontal Scroll) */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Latest Job Openings</h2>
          {loadingJobs ? (
            <p className="text-center text-muted">Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <div className="job-scroll-horizontal d-flex gap-3" style={{ overflowX: "auto", paddingBottom: "10px" }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="card shadow-sm p-3"
                  style={{ minWidth: "280px", borderRadius: "12px", flex: "0 0 auto" }}
                >
                  <h5 className="fw-bold">{job.title}</h5>
                  <p className="text-muted mb-1">{job.company}</p>
                  <p className="small mb-1">
                    <FaBuilding className="me-1 text-primary" />
                    {job.location}
                  </p>
                  <p className="small mb-2">
                    <FaBriefcase className="me-1 text-success" />
                    {job.experience_required} yrs
                  </p>
                  <NavLink to={`/signup`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </NavLink>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">⚡ No jobs available right now</p>
          )}
          <div className="text-center mt-4">
            <NavLink to="/signup" className="btn btn-primary px-4">
              View All Jobs
            </NavLink>
          </div>
        </div>
      </section>

      {/* Placed Jobseekers Section */}
     {/* Placed Jobseekers Section (Horizontal Scroll + Auto Scroll) */}
<section className="py-5 bg-light">
  <div className="container">
    <h2 className="fw-bold text-center mb-4">Recently Placed Students </h2>
    {loadingPlacements ? (
      <p className="text-center text-muted">Loading placements...</p>
    ) : placements.length > 0 ? (
      <div
        className="placement-scroll-horizontal d-flex gap-3"
        style={{
          overflowX: "auto",
          scrollBehavior: "smooth",
          paddingBottom: "10px",
        }}
        ref={(el) => {
          if (el) {
            let scrollAmount = 0;
            const scrollStep = 1;
            const scrollInterval = setInterval(() => {
              if (scrollAmount >= el.scrollWidth) scrollAmount = 0;
              el.scrollLeft = scrollAmount;
              scrollAmount += scrollStep;
            }, 20); // adjust speed here
          }
        }}
      >
        {placements.map((p) => (
          <div
            key={p.placement_id}
            className="card shadow-sm p-3"
            style={{ minWidth: "250px", maxWidth: "300px", borderRadius: "12px" }}
          >
            <div className="text-center mb-2">
              {p.profile_picture ? (
                <img
                  src={`http://localhost:8080${p.profile_picture}`}
                  alt={p.seeker_name}
                  style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                />
              ) : (
                <FaUserCircle size={60} className="text-secondary" />
              )}
            </div>
            <h5 className="fw-bold text-center">{p.seeker_name}</h5>
            <p className="text-center mb-1">{p.job_title} at {p.company}</p>
            <p className="text-center small text-muted">
              Placed on: {new Date(p.placement_date).toLocaleDateString()}
            </p>
           
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-muted">No placements yet.</p>
    )}
  </div>

  {/* Horizontal Scrollbar Style */}
  <style>
    {`
      .placement-scroll-horizontal::-webkit-scrollbar {
        height: 8px;
      }
      .placement-scroll-horizontal::-webkit-scrollbar-thumb {
        background-color: #007bff;
        border-radius: 10px;
      }
      .placement-scroll-horizontal::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
    `}
  </style>
</section>


      {/* CTA Section */}
      <section className="cta-section text-light text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Kickstart Your Career Today 🚀</h2>
          <p className="lead">
            Create your profile, upload resume & get your dream job faster.
          </p>
          <NavLink to="/signup" className="btn btn-warning px-4 py-2 mt-3">
            Get Started
          </NavLink>
        </div>
      </section>

      {/* Custom Styles */}
      <style>
        {`
          .hero {
            min-height: 90vh;
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('/images/banner.jpg') center/cover no-repeat;
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
          .job-scroll-horizontal::-webkit-scrollbar {
            height: 8px;
          }
          .job-scroll-horizontal::-webkit-scrollbar-thumb {
            background-color: #007bff;
            border-radius: 10px;
          }
          .job-scroll-horizontal::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
        `}
      </style>
    </>
  );
}
