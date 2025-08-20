
import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./components/home.jsx";
import Sign from "./components/signup.jsx";
import Register from "./components/register.jsx";
import About from "./components/about.jsx";
import Contact from "./components/contact.jsx";
import AddJob from "./components/AddJob.jsx";
import HRDashboard from "./components/hrdashbord.jsx";
import ViewJobApplicents from "./components/ViewJobApplicent.jsx";
<<<<<<< HEAD

import PrivateRoute from "./components/PrivateRoute";
=======
>>>>>>> 16134febb61e1b690ebeff02152e9d97eb64612e
import AddHR from "./components/AddHR.jsx";
import ViewHR from "./components/viewHR.jsx";
import Adminhome from "./components/adminhome.jsx";
import ViewApplicants from "./components/viewapplicant.jsx";

<<<<<<< HEAD
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container">
            <div className="logo mb-3">
              <img
                src="/images/logo1.png"
                alt="Company Logo"
                style={{ width: "50px", height: "auto", paddingTop: "20px" }}
              />
            </div>
            <NavLink className="navbar-brand bg-bold" to="/">
              Quick start <span className="text-danger">Carrier</span>
            </NavLink>

            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item ">
                  <NavLink
                    className="nav-link"
                    style={{ color: "#b33609ff", fontSize: "20px" }}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    style={{ color: "#b33609ff", fontSize: "20px" }}
                    to="/about"
                  >
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    style={{ color: "#b33609ff", fontSize: "20px" }}
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-danger ms-2" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-danger ms-2" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/view-applicants" element={<ViewJobApplicents />} />

          {/* Admin protected */}
          <Route
            path="/adminhome"
            element={
              <PrivateRoute allowedRole="admin">
                <Adminhome />
              </PrivateRoute>
            }
          />
          <Route
            path="/adminhome/addhr"
            element={
              <PrivateRoute allowedRole="admin">
                <AddHR />
              </PrivateRoute>
            }
          />
          <Route
            path="/adminhome/viewshr"
            element={
              <PrivateRoute allowedRole="admin">
                <ViewHR />
              </PrivateRoute>
            }
          />
      


          {/* HR protected */}
          <Route
            path="/hrdashboard"
            element={
              <PrivateRoute allowedRole="hr">
                <HRDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
=======
export default function App() {
  // Function to close navbar after click
  const closeNavbar = () => {
    const nav = document.getElementById("navbarNav");
    if (nav && nav.classList.contains("show")) {
      new window.bootstrap.Collapse(nav).hide();
    }
  };

  return (
    <BrowserRouter>
      {/* ---------------- Navbar ---------------- */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container-fluid">
          {/* Brand Logo */}
          <NavLink
            className="navbar-brand d-flex align-items-center fw-bold"
            to="/"
            onClick={closeNavbar}
          >
            <img
              src="/images/logo1.png"
              alt="Logo"
              className="me-2"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            Quick Start <span className="text-danger">Career</span>
          </NavLink>

          {/* Toggle for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" onClick={closeNavbar}>
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" onClick={closeNavbar}>
                  Contact
                </NavLink>
              </li>
              <li className="nav-item mt-2 mt-lg-0">
                <NavLink
                  className="btn btn-outline-light ms-lg-2"
                  to="/register"
                  onClick={closeNavbar}
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item mt-2 mt-lg-0">
                <NavLink
                  className="btn btn-danger ms-lg-2"
                  to="/signup"
                  onClick={closeNavbar}
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ---------------- Main Content ---------------- */}
      <main className="flex-grow-1 py-1">
        {/* Use container-fluid to stretch full width */}
        <div className="container-fluid">
          <div className="row justify-content-center">
            {/* On large devices, span full screen (col-12) */}
            <div className="col-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Sign />} />
                <Route path="/register" element={<Register />} />
                <Route path="/hr-dashboard" element={<HRDashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/addjob" element={<AddJob />} />
                <Route path="/view-applicants" element={<ViewJobApplicents />} />

                {/* Admin Routes */}
                <Route path="/adminhome" element={<Adminhome />}>
                  <Route path="addhr" element={<AddHR />} />
                  <Route path="viewshr" element={<ViewHR />} />
                  <Route path="view-applicants" element={<ViewApplicants />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <div className="container-fluid">
          <small>
            © {new Date().getFullYear()} Quick Start Career | All Rights Reserved
          </small>
        </div>
      </footer>
    </BrowserRouter>
  );
}
>>>>>>> 16134febb61e1b690ebeff02152e9d97eb64612e
