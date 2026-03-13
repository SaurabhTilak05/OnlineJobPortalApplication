let express = require("express");
let adCtrl = require("../controllers/adminController.js");
let hrCtrl=require("../controllers/hrcontroller.js");
let jobskrctrl=require("../controllers/jobseekerctrl.js");
let jobctrl=require("../controllers/jobcontrol.js");
let place=require("../controllers/placementctrl.js");
let email=require("../controllers/emailctrl.js");
let interviewCtrl =require("../controllers/interviewctrl.js"); 
const upload = require("../middlewares/fileupload.js"); 

let { verifyToken, verifyAdmin, authorizeRoles } = require("../middlewares/authmiddleware.js");
let router = express.Router();

 //hr authentication 
const verifyToken1=require("../middlewares/Hrauthmiddleware.js");

//user auth
const { verifyUser } = require("../middlewares/userauthmiddleware.js");

router.post("/addHr", verifyToken, verifyAdmin, hrCtrl.addHR1);
router.post("/hr/login", hrCtrl.hrLogin);
// Protected
router.get("/hrprofile", verifyToken1, hrCtrl.getProfile);
router.get("/hr/jobs",verifyToken1,hrCtrl.getJobHrDash);
router.get("/viewAllJobs",verifyToken1,jobctrl.getAllJobs);
router.post("/AddJob", verifyToken1, hrCtrl.addingJob);
router.get("/view-applicants",verifyToken1,jobskrctrl.getApplicants);
router.put("/updateJob/:job_id",verifyToken1,jobctrl.UpdateJobById);
router.put("/updatehrProfile/:hr_id", verifyToken1, hrCtrl.updateHRProfile);
router.delete("/deleteJob/:id",verifyToken1,jobctrl.getDeleteJob);
router.get("/getapplicant/:id/applicants", verifyToken1, jobctrl.getApplicantsByJob);
router.get("/searchJob",jobctrl.searchJob);
router.get("/applicantprofile/:seekerId", verifyToken, authorizeRoles("admin", "hr"), jobskrctrl.getApplicantProfile);
router.get("/upload", verifyUser, jobskrctrl.getProfile);
router.put("/upload-profile-picture", verifyUser, upload.single("photo"), jobskrctrl.uploadProfilePicture);


router.post("/interviews/schedule", verifyToken1, interviewCtrl.scheduleInterview);
router.get("/interviews", verifyToken, verifyAdmin, interviewCtrl.getAllInterviews);
router.get("/interviews/seeker/:seekerId", verifyUser, interviewCtrl.getBySeeker);
router.get("/interviews/job/:jobId", verifyToken1, interviewCtrl.getByJob);
router.get("/interviews/hr/:hrId", verifyToken1, interviewCtrl.getByHR);
router.put("/interviews/:id", verifyToken1, interviewCtrl.updateInterview);
router.delete("/interviews/:id", verifyToken1, interviewCtrl.deleteInterview);
//interview status update
router.put("/interviews/:id/status", verifyToken1, interviewCtrl.updateInterviewStatus);

// Admin routes
router.post("/addAdmin", adCtrl.saveAdmin);
// Admin login by email and password
router.post("/adminLogin",adCtrl.adminLogin);
//placement students 
router.get("/place", place.getPlacements);
router.get("/hr/placements", verifyToken1, place.getPlacements);
// ✅ Dashboard stats API
router.get("/stats", verifyUser, jobskrctrl.getDashboardStats);
// Profile Completion %
router.get("/profileStatus/:seeker_id", verifyUser, jobskrctrl.profileStatus);

// Protect admin-only APIs
router.get("/viewAlljobforAdmin", verifyToken, verifyAdmin, adCtrl.viewAlljobforAdmin);
router.get("/SearchHRById/:hr_id", verifyToken, verifyAdmin, adCtrl.searchHrByid);
router.get("/viewallapplications", verifyToken, verifyAdmin, adCtrl.viewallapplicant);
router.get("/getallcontact", verifyToken, verifyAdmin, adCtrl.getcontact);
// to show all job seekers
router.get("/getAllJobSeeker", verifyToken, verifyAdmin, jobskrctrl.getSeeker);
router.get("/applications", verifyToken, verifyAdmin, jobskrctrl.getAppltoadmin);
router.get("/admin/placements", verifyToken, verifyAdmin, adCtrl.getAllPlacements);
//applications



// Forgot Password
router.post("/forgot-password", jobskrctrl.forgotPassword);

// Reset Password
router.post("/reset-password/:token", jobskrctrl.resetPassword);


//admin homepage sathi kahi logic 
router.get("/count/hr", verifyToken, verifyAdmin, hrCtrl.countHr);
router.get("/count/students", verifyToken, verifyAdmin, hrCtrl.countStudents);
router.get("/count/applications", verifyToken, verifyAdmin, hrCtrl.countApplications);

// Contact Up 
router.post("/contact",adCtrl.contactUs);


// router.post("/AddHr", hrCtrl.registerHr);

///hr/jobs
// view all Hr 
router.get("/viewHr", verifyToken, verifyAdmin, hrCtrl.getHrs);


// Delete hr by Id
router.delete("/deleteHR/:hr_id", verifyToken, verifyAdmin, hrCtrl.deleteHRByID);

//router.delete("/DeleteStudByID", hrCtrl.DeleteStudByID);
router.delete("/DeleteStudByID/:seeker_id", verifyToken, verifyAdmin, hrCtrl.DeleteStudByID);
//Add interview schedule
router.post("/interviewSchedule", verifyToken1, hrCtrl.getSchedules);
//get schedule for the interview 
router.get("/getschedule", verifyToken1, hrCtrl.getshed);


// Job Seeker routes
router.post("/regJobSeeker",jobskrctrl.regSeekers);

//Login the job seeker using email and password
router.post("/loginseeker",jobskrctrl.getLogJobSeeker);
router.get("/profile", verifyUser, jobskrctrl.getProfileuser);
//router.put("/upload-resume", verifyUser, upload.single("resume"), jobskrctrl.uploadResume);
router.put("/update-profile", verifyUser, jobskrctrl.updateProfile);
// Upload resume separately
router.put("/upload-resume", verifyUser, upload.single("resume"), jobskrctrl.uploadResume);



// get job seeker by id
router.get("/jobseekerbyid/:seeker_id", verifyToken, authorizeRoles("admin", "hr"), jobskrctrl.getUserById);

// for the search job by laction 
router.get("/allJob", jobctrl.fetchAllJobs);

router.get("/searchByTitle",jobctrl.searchJobByTitle);
//Applied for the job 
router.post("/applyedJob", verifyUser, jobskrctrl.applyJob);


router.get("/appliedJobs/:seekerId", verifyUser, jobskrctrl.getallJobs);

// Send mail testing 
router.post("/sendEmail", verifyToken, verifyAdmin, email.sendGemail);

module.exports = router;
