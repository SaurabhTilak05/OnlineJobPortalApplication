let express = require("express");
let adCtrl = require("../controllers/adminController.js");
let hrCtrl=require("../controllers/hrcontroller.js");
let jobskrctrl=require("../controllers/jobseekerctrl.js");
let jobctrl=require("../controllers/jobcontrol.js");
let place=require("../controllers/placementctrl.js");
let email=require("../controllers/emailctrl.js");
let interviewCtrl =require("../controllers/interviewctrl.js"); 
const upload = require("../middlewares/fileupload.js"); 

let { verifyToken,  verifyAdmin} = require("../middlewares/authmiddleware.js");
let router = express.Router();

 //hr authentication 
const verifyToken1=require("../middlewares/Hrauthmiddleware.js");

//user auth
const { verifyUser } = require("../middlewares/userauthmiddleware.js");

router.post("/addHr", hrCtrl.addHR1);
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
router.get("/getapplicant/:id/applicants", jobctrl.getApplicantsByJob);
router.get("/searchJob",jobctrl.searchJob);
router.get("/applicantprofile/:seekerId", jobskrctrl.getApplicantProfile);
router.get("/upload", verifyUser, jobskrctrl.getProfile);
router.put("/upload-profile-picture", verifyToken, upload.single("photo"), jobskrctrl.uploadProfilePicture);


router.post("/interviews/schedule", interviewCtrl.scheduleInterview);
router.get("/interviews", interviewCtrl.getAllInterviews);
router.get("/interviews/seeker/:seekerId", interviewCtrl.getBySeeker);
router.get("/interviews/job/:jobId", interviewCtrl.getByJob);
router.get("/interviews/hr/:hrId", interviewCtrl.getByHR);
router.put("/interviews/:id", interviewCtrl.updateInterview);
router.delete("/interviews/:id", interviewCtrl.deleteInterview);
//interview status update
router.put("/interviews/:id/status", interviewCtrl.updateInterviewStatus);

// Admin routes
router.post("/addAdmin", adCtrl.saveAdmin);
// Admin login by email and password
router.post("/adminLogin",adCtrl.adminLogin);
//placement students 
router.get("/place", place.getPlacements);
// ✅ Dashboard stats API
router.get("/stats", verifyUser, jobskrctrl.getDashboardStats);

// Protect admin-only APIs
router.get("/viewAlljobforAdmin", verifyToken, verifyAdmin, adCtrl.viewAlljobforAdmin);
router.get("/SearchHRById/:hr_id", verifyToken, verifyAdmin, adCtrl.searchHrByid);
router.get("/viewallapplications", verifyToken, verifyAdmin, adCtrl.viewallapplicant);
router.get("/getallcontact", verifyToken, verifyAdmin, adCtrl.getcontact);
// to show all job seekers
router.get("/getAllJobSeeker",jobskrctrl.getSeeker);
router.get("/applications",jobskrctrl.getAppltoadmin);
router.get("/admin/placements", adCtrl.getAllPlacements);
//applications

//admin homepage sathi kahi logic 
router.get("/count/hr", hrCtrl.countHr);
router.get("/count/students", hrCtrl.countStudents);
router.get("/count/applications", hrCtrl.countApplications);

// Contact Up 
router.post("/contact",adCtrl.contactUs);


// router.post("/AddHr", hrCtrl.registerHr);

///hr/jobs
// view all Hr 
router.get("/viewHr", hrCtrl.getHrs);


// Delete hr by Id
router.delete("/deleteHR/:hr_id", hrCtrl.deleteHRByID);

//router.delete("/DeleteStudByID", hrCtrl.DeleteStudByID);
router.delete("/DeleteStudByID/:seeker_id", hrCtrl.DeleteStudByID);
//Add interview schedule
router.post("/interviewSchedule",hrCtrl.getSchedules);
//get schedule for the interview 
router.get("/getschedule",hrCtrl.getshed);


// Job Seeker routes
router.post("/regJobSeeker",jobskrctrl.regSeekers);

//Login the job seeker using email and password
router.post("/loginseeker",jobskrctrl.getLogJobSeeker);
router.get("/profile", verifyUser, jobskrctrl.getProfileuser);
//router.put("/upload-resume", verifyToken, upload.single("resume"), jobskrctrl.uploadResume);
router.put("/update-profile", verifyToken, jobskrctrl.updateProfile);
// Upload resume separately
router.put("/upload-resume", verifyToken, upload.single("resume"), jobskrctrl.uploadResume);



// get job seeker by id
router.get("/jobseekerbyid/:seeker_id",jobskrctrl.getUserById);

// for the search job by laction 
router.get("/allJob", jobctrl.fetchAllJobs);

router.get("/searchByTitle",jobctrl.searchJobByTitle);
//Applied for the job 
router.post("/applyedJob",jobskrctrl.applyJob);


router.get("/appliedJobs/:seekerId", jobskrctrl.getallJobs);

// Send mail testing 
router.post("/sendEmail",email.sendGemail);

module.exports = router;
