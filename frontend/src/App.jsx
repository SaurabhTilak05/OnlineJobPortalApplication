  import React from "react";
  import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
  import "bootstrap/dist/css/bootstrap.min.css";
  import Home from "./components/home.jsx";
  import Sign from "./components/signup.jsx";
  import Register from "./components/register.jsx";
  import "./App.css";
  import About from "./components/about.jsx";
  import Contact from "./components/contact.jsx";
  import AddJob from "./components/AddJob.jsx";
  import HRDashboard from "./components/hrdashbord.jsx";
  import ViewJobApplicents from "./components/ViewJobApplicent.jsx";

  import PrivateRoute from "./components/PrivateRoute";
  import AddHR from "./components/AddHR.jsx";
  import ViewHR from "./components/viewHR.jsx";
  import Adminhome from "./components/adminhome.jsx";

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
