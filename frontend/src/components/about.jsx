import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaHandshake, FaUsers, FaGlobe } from "react-icons/fa";

export default function About() {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2 } },
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="d-flex align-items-center text-light text-center"
        style={{
          minHeight: "60vh",
          background:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/banner1.jpg') center/cover fixed no-repeat",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container">
          <motion.h1 className="fw-bold display-4" variants={fadeUp}>
            About QuickStart Career
          </motion.h1>
          <motion.p className="lead mt-3" variants={fadeUp}>
            Bridging the gap between talent and opportunity 🚀
          </motion.p>
        </div>
      </motion.section>

      {/* Company Overview */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-md-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <img
                src="/images/oneimg.webp"
                alt="Our Office"
                className="img-fluid rounded shadow-lg"
              />
            </motion.div>

            <motion.div
              className="col-md-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <motion.section
        className="py-5 bg-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-4">Our Mission & Vision</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <motion.div className="p-4 shadow-sm rounded h-100 bg-white" whileHover={{ scale: 1.03 }}>
                <h4 className="fw-bold">🌟 Our Mission</h4>
                <p className="text-muted">
                  To connect job seekers with opportunities, ensuring fair
                  access and inclusivity for all, regardless of location.
                </p>
              </motion.div>
            </div>
            <div className="col-md-6 mb-3">
              <motion.div className="p-4 shadow-sm rounded h-100 bg-white" whileHover={{ scale: 1.03 }}>
                <h4 className="fw-bold">🚀 Our Vision</h4>
                <p className="text-muted">
                  To create a world where talent meets opportunity without
                  barriers, empowering careers and shaping the future of work.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <section className="py-5">
        <div className="container">
          <motion.h2
            className="fw-bold text-center text-primary mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Our Core Values
          </motion.h2>

          <div className="row g-4 text-center">
            {[
              { icon: <FaHandshake />, color: "text-primary", title: "Integrity", desc: "Staying true to our commitments." },
              { icon: <FaLightbulb />, color: "text-warning", title: "Innovation", desc: "Adapting and improving continuously." },
              { icon: <FaUsers />, color: "text-success", title: "Customer First", desc: "Prioritizing our users’ needs." },
              { icon: <FaGlobe />, color: "text-danger", title: "Inclusivity", desc: "Opportunities for everyone." },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="col-md-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <motion.div
                  className="p-4 border rounded h-100 shadow-sm bg-white"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                >
                  <div className={`${value.color} mb-3`} style={{ fontSize: "2rem" }}>
                    {value.icon}
                  </div>
                  <h5 className="fw-bold">{value.title}</h5>
                  <p className="text-muted">{value.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <motion.section
        className="py-5 bg-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-5">Meet Our Team</h2>
          <div className="row">
            {[
              { name: "Jon Deos", role: "Founder & CEO", img: "/images/man1.jpg" },
              { name: "Kishor Wankhede", role: "Head of Development", img: "/images/kishor.jpeg" },
              { name: "Mike Johnson", role: "Marketing Lead", img: "/images/man4.jpg" },
            ].map((member, i) => (
              <motion.div
                key={i}
                className="col-md-4 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mb-3 shadow"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
                <h5 className="fw-bold">{member.name}</h5>
                <p className="text-muted">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section
        className="py-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-4">Our Achievements</h2>
          <div className="row g-4">
            <motion.div className="col-md-4" whileHover={{ scale: 1.1 }}>
              <h3 className="fw-bold text-success">10,000+</h3>
              <p>Jobs Posted</p>
            </motion.div>
            <motion.div className="col-md-4" whileHover={{ scale: 1.1 }}>
              <h3 className="fw-bold text-warning">500+</h3>
              <p>Employers Onboarded</p>
            </motion.div>
            <motion.div className="col-md-4" whileHover={{ scale: 1.1 }}>
              <h3 className="fw-bold text-danger">4.8/5</h3>
              <p>User Rating</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-5 text-light text-center"
        style={{
          background: "linear-gradient(45deg, #007bff, #6610f2)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Find Your Dream Job?</h2>
          <a href="/register" className="btn btn-warning btn-lg shadow-sm">
            Get Started
          </a>
        </div>
      </motion.section>
    </>
  );
}
