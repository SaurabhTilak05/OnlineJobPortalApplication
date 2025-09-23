import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Home from "./components/home.jsx";
import Sign from "./components/signup.jsx";
import Register from "./components/register.jsx";
import About from "./components/about.jsx";
import Contact from "./components/contact.jsx";
import PrivateRoute from "./components/PrivateRoute";
import HRHome from "./components/HRHome.jsx";
import HRDashboard from "./components/hrdashbord.jsx";
import ViewJobApplicants from "./components/ViewJobApplicent.jsx";
import AddJob from "./components/AddJob.jsx";
import AddHR from "./components/AddHR.jsx";
import ViewHR from "./components/viewHR.jsx";
import Adminhome from "./components/adminhome.jsx";
import UserProfile from "./components/userhome.jsx";
import AdminDashboard from "./components/admindashboard.jsx";
import ViewStudProfile from "./components/viewstudprofile.jsx";
import Userdashboard from "./components/userdashbord.jsx";
import ViewAllJob from "./components/viewalljob.jsx";
import HRProfile from "./components/hrProfile.jsx";
import JobforUsers from "./components/JobforUsersandAdmin.jsx";
import UpdateJob from "./components/updateJob.jsx";
import UpdateHRProfile from "./components/UpdateHrProfile.jsx";
import Jobappliedstudent from "./components/jobappliedbystudent.jsx";
import JobApplicantsBYJob from "./components/jobapplicantbyjob.jsx";
import ViewRegStuToAdmin from "./components/ViewRegStuToAdmin.jsx";
import ViewallapltoAdmin from "./components/viewallapltoadmin.jsx";
import Studentupdate from "./components/studentupdate.jsx";
import ApplicantProfile from "./components/ApplicantProfile.jsx";
import InterViewSchedule from "./components/interviewSchedule.jsx";
import ViewSchedule from "./components/viewschedule.jsx";
import Updateresume from "./components/updateresume.jsx";
import Footer from "./components/footer.jsx";

import ViewScheduleForUser from "./components/viewscheduleforuser.jsx";
import ContactDetails from "./components/contactdetail.jsx";
import UpdateInterviewStatus from "./components/updateinterviewstatus.jsx";
import Placement from "./components/placement.jsx";
import PlacementList from "./components/placementlist.jsx";
// Navbar Layout
// Navbar Layout
function LayoutWithNavbar({ children }) {
  const location = useLocation();

  // Hide navbar in admin/hr/user dashboards
  const hideNavbar =
    location.pathname.startsWith("/adminhome") ||
    location.pathname.startsWith("/hrdashboard") ||
    location.pathname.startsWith("/userprofile");

  const hideFooter =
    location.pathname.startsWith("/adminhome") ||
    location.pathname.startsWith("/hrdashboard") ||
    location.pathname.startsWith("/userProfile");

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <div className="app-layout d-flex flex-column min-vh-100">
      {!hideNavbar && (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              {/* Logo */}
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

              {/* Custom Hamburger */}
              <button
                className={`hamburger d-lg-none ${isOpen ? "open" : ""}`}
                type="button"
                onClick={toggleNavbar}
                aria-label="Toggle navigation"
              >
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </button>
            </div>
          </nav>

          {/* Mobile Side Drawer */}
          <div className={`side-drawer ${isOpen ? "open" : ""} d-lg-none`}>
            <ul className="list-unstyled px-4 pt-4">
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

          {/* Custom CSS */}
          <style>{`
            /* ✅ Hamburger */
            .hamburger {
              border: none;
              background: transparent;
              cursor: pointer;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 28px;
              height: 22px;
              padding: 0;
              transition: all 0.3s ease-in-out;
              z-index: 1100;
            }
            .hamburger .line {
              height: 3px;
              width: 100%;
              background-color: #333;
              border-radius: 2px;
              transition: all 0.3s ease-in-out;
            }
            .hamburger.open .line:nth-child(1) {
              transform: rotate(45deg) translateY(8px);
            }
            .hamburger.open .line:nth-child(2) {
              opacity: 0;
            }
            .hamburger.open .line:nth-child(3) {
              transform: rotate(-45deg) translateY(-8px);
            }
            .hamburger:hover .line {
              background-color: #dc3545;
            }

            /* ✅ Side Drawer */
            .side-drawer {
              position: fixed;
              top: 0;
              left: -260px;
              width: 260px;
              height: 100vh;
              background: #fff;
              box-shadow: 2px 0 12px rgba(0,0,0,0.1);
              transition: left 0.3s ease-in-out;
              z-index: 1050;
            }
            .side-drawer.open {
              left: 0;
            }
            .side-drawer .nav-link {
              display: block;
              padding: 10px 0;
              font-size: 1.1rem;
              font-weight: 500;
              color: #333;
              transition: color 0.2s;
            }
            .side-drawer .nav-link:hover {
              color: #dc3545;
            }

            /* ✅ Overlay */
            .overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.4);
              z-index: 1040;
            }
          `}</style>
        </>
      )}

      {/* Main Content */}
      <main className="main-wrapper flex-grow-1">{children}</main>

      {!hideFooter && <Footer />}
    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <LayoutWithNavbar>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin routes */}
          <Route
            path="/adminhome"
            element={
              <PrivateRoute allowedRole="admin">
                <Adminhome />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="admindashboard" replace />} />
            <Route path="admindashboard" element={<AdminDashboard />} />
            <Route path="addhr" element={<AddHR />} />
            <Route path="viewshr" element={<ViewHR />} />
            <Route path="jobseekers" element={<ViewRegStuToAdmin />} />
            <Route path="application" element={<ViewallapltoAdmin />} />
            <Route path="register-student" element={<Register />} />
            <Route path="view-jobs" element={<JobforUsers />} />
            <Route path="contact-detail" element={<ContactDetails />} />
            <Route path="placementlist" element={<PlacementList />} />
          </Route>

          {/* HR Dashboard */}
          <Route
            path="/hrdashboard"
            element={
              <PrivateRoute allowedRole="hr">
                <HRDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<HRHome />} />
            <Route path="addjob" element={<AddJob />} />
            <Route path="view-applicants" element={<ViewJobApplicants />} />
            <Route path="job-history" element={<ViewAllJob />} />
            <Route path="job-history/update-job/:id" element={<UpdateJob />} />
            <Route
              path="job-history/applicants/:jobId"
              element={<JobApplicantsBYJob />}
            />
            <Route path="view-schedule" element={<ViewSchedule />} />
            {/* Profile section */}
            <Route path="profile" element={<HRProfile />} />
            <Route path="profile/update" element={<UpdateHRProfile />} />
            <Route
              path="applicantProfile/:seekerId"
              element={<ApplicantProfile />}
            />
             
            {/* Interview scheduling */}
            <Route
              path="/hrdashboard/schedule-interview/:seekerId/:jobId"
              element={<InterViewSchedule />}
            />
           <Route path="interviewstatus/:id" element={<UpdateInterviewStatus />} />
            <Route path="placement" element={<Placement />} />
           
          </Route>

          {/* Student Routes */}
          <Route
            path="/userprofile"
            element={
              <PrivateRoute allowedRole="user">
                <UserProfile />
              </PrivateRoute>
            }
          >
            <Route path="user-dashboard" element={<Userdashboard />} />
            <Route path="view-profile" element={<ViewStudProfile />} />
            <Route path="view-jobs" element={<JobforUsers />} />
            <Route path="Applied-jobs" element={<Jobappliedstudent />} />
            <Route path="update-profile" element={<Studentupdate />} />
            <Route path="upload-resume" element={<Updateresume />} />
            <Route path="intschedule" element={<ViewScheduleForUser />} />
          </Route>
        </Routes>

        {/* ✅ Global toast container */}
         <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </LayoutWithNavbar>
    </BrowserRouter>
  );
}
