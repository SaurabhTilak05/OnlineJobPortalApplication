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

// Navbar Layout
function LayoutWithNavbar({ children }) {
  const location = useLocation();

  // Hide navbar in admin/hr/user dashboards
  const hideNavbar =
    location.pathname.startsWith("/adminhome") ||
    location.pathname.startsWith("/hrdashboard") ||
    location.pathname.startsWith("/userprofile");

  // Hide footer only in admin dashboard
  const hideFooter =
    location.pathname.startsWith("/adminhome") ||
    location.pathname.startsWith("/hrdashboard")||
    location.pathname.startsWith("/userProfile"); //hrdashboard

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <div className="app-layout d-flex flex-column p-2 min-vh-100">
      {!hideNavbar && (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top m-0 p-0">
            <div className="container-fluid d-flex justify-content-between align-items-center">
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
                <NavLink
                  className="nav-link"
                  to="/contact"
                  onClick={closeNavbar}
                >
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
                <NavLink
                  className="nav-link"
                  to="/contact"
                  onClick={closeNavbar}
                >
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

          {isOpen && (
            <div className="overlay d-lg-none" onClick={closeNavbar}></div>
          )}
        </>
      )}

      {/* Main Content */}
      <main className="main-wrapper flex-grow-1">{children}</main>

      {/* ✅ Show footer only if not admin */}
      {!hideFooter && <Footer />}

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
        .side-drawer.open { left: 0; }
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
