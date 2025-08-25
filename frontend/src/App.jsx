import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home.jsx";
import Sign from "./components/signup.jsx";
import Register from "./components/register.jsx";
import About from "./components/about.jsx";
import Contact from "./components/contact.jsx";
import AddJob from "./components/AddJob.jsx";
import HRDashboard from "./components/hrdashbord.jsx";
import ViewJobApplicants from "./components/ViewJobApplicent.jsx";
import PrivateRoute from "./components/PrivateRoute";
import AddHR from "./components/AddHR.jsx";
import ViewHR from "./components/viewHR.jsx";
import Adminhome from "./components/adminhome.jsx";
import UserProfile from "./components/userprofile.jsx";
import AdminDashboard from "./components/admindashboard.jsx";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <BrowserRouter>
      <div className="app-layout d-flex flex-column min-vh-100">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Brand */}
            <NavLink
              className="navbar-brand fw-bold d-flex align-items-center"
              to="/"
              onClick={closeNavbar}
            >
              <img
                src="/images/logo1.png"
                alt="Company Logo"
                style={{ width: "40px", marginRight: "10px" }}
              />
              <span>
                QuickStart <span className="text-danger">Career</span>
              </span>
            </NavLink>

            {/* Desktop Menu */}
            <div className="d-none d-lg-flex align-items-center gap-4">
              <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </NavLink>
              <NavLink className="nav-link" to="/about" onClick={closeNavbar}>
                About Us
              </NavLink>
              <NavLink className="nav-link" to="/contact" onClick={closeNavbar}>
                Contact
              </NavLink>
              <NavLink
                className="btn btn-outline-danger ms-3"
                to="/register"
                onClick={closeNavbar}
              >
                Register
              </NavLink>
              <NavLink
                className="btn btn-danger ms-2"
                to="/signup"
                onClick={closeNavbar}
              >
                Sign Up
              </NavLink>
            </div>

            {/* Mobile Toggle */}
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>

        {/* Mobile Side Drawer */}
        <div
          className={`side-drawer ${isOpen ? "open" : ""} d-lg-none`}
          onClick={closeNavbar}
        >
          <ul className="list-unstyled p-4">
            <li>
              <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/about" onClick={closeNavbar}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact" onClick={closeNavbar}>
                Contact
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink
                className="btn btn-outline-danger w-100 mb-2"
                to="/register"
                onClick={closeNavbar}
              >
                Register
              </NavLink>
              <NavLink
                className="btn btn-danger w-100"
                to="/signup"
                onClick={closeNavbar}
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div className="overlay d-lg-none" onClick={closeNavbar}></div>
        )}

        {/* Main Content - takes all remaining height */}
        <main className="main-wrapper flex-grow-1 py-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Sign />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
         
            
            <Route path="/userProfile" element={<UserProfile />} />
           
            {/* Admin routes */}
            <Route
              path="/adminhome"
              element={
                <PrivateRoute allowedRole="admin"> <Adminhome /> </PrivateRoute> }
            > 
             <Route index element={<Navigate to="admindashboard" replace />} />
             <Route path="admindashboard" element={<AdminDashboard/>} />
              <Route path="addhr" element={<AddHR />} />
              <Route path="viewshr" element={<ViewHR />} />
              <Route path="application" element={<ViewJobApplicants />} />
              <Route path="register-student" element={<Register />} />
            </Route>

            {/* HR Dashboard */}
           <Route path="/hrdashboard"  element={<PrivateRoute allowedRole="hr"><HRDashboard /></PrivateRoute>}>
            <Route path="addjob" element={<AddJob />} />
           
            </Route>

          </Routes>
           
        </main>

      
      </div>

      {/* Custom CSS */}
      <style>{`
        .side-drawer {
          position: fixed;
          top: 0;
          left: -200px;
          width: 150px;
          height: 100%;
          background: #fff;
          box-shadow: 2px 0 8px rgba(0,0,0,0.2);
          transition: left 0.3s ease-in-out;
          z-index: 1050;
        }
        .side-drawer.open {
          left: 0;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.3);
          z-index: 1040;
        }
      `}</style>
    </BrowserRouter>
  );
}
