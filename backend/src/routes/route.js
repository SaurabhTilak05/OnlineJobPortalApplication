let express = require("express");
let adCtrl = require("../controllers/adminController.js");
let hrCtrl=require("../controllers/hrcontroller.js");
let jobskrctrl=require("../controllers/jobseekerctrl.js");
let jobctrl=require("../controllers/jobcontrol.js");
let email=require("../controllers/emailctrl.js");
 let { verifyToken,  verifyAdmin} = require("../middlewares/authmiddleware.js");

let router = express.Router();



 //hr authentication 
const verifyToken1=require("../middlewares/Hrauthmiddleware.js");

//user auth
const { verifyUser } = require("../middlewares/userauthmiddleware.js");

router.post("/addHr", hrCtrl.addHR1);
router.post("/hr/login", hrCtrl.hrLogin);
// Protected
router.get("/hr/profile", verifyToken1, hrCtrl.getProfile);



router.post("/AddJob", verifyToken1, hrCtrl.addingJob);





// Admin routes
router.post("/addAdmin", adCtrl.saveAdmin);
// Admin login by email and password
router.post("/adminLogin",adCtrl.adminLogin);



// Protect admin-only APIs
router.get("/viewAlljobforAdmin", verifyToken, verifyAdmin, adCtrl.viewAlljobforAdmin);
router.get("/SearchHRById/:hr_id", verifyToken, verifyAdmin, adCtrl.searchHrByid);
router.get("/viewallapplications", verifyToken, verifyAdmin, adCtrl.viewallapplicant);
router.get("/getallcontact", verifyToken, verifyAdmin, adCtrl.getcontact);




//admin homepage sathi kahi logic 

router.get("/count/hr", hrCtrl.countHr);
router.get("/count/students", hrCtrl.countStudents);
router.get("/count/applications", hrCtrl.countApplications);

// Contact Up 
router.post("/contact",adCtrl.contactUs);


// Hr routes
router.post("/AddHr", hrCtrl.registerHr);




// view all Hr 
router.get("/viewHr", hrCtrl.getHrs);
//hr login with email and password
// router.post("/hrLogin",hrCtrl.loginHr);
// update all fields 
router.put("/UpdateHr",hrCtrl.updateHr);
// Delete hr by Id
router.delete("/deleteHR/:hr_id", hrCtrl.deleteHRByID);
// for the delete student by hr
//router.delete("/DeleteStudByID", hrCtrl.DeleteStudByID);
router.delete("/DeleteStudByID/:seeker_id", hrCtrl.DeleteStudByID);
//Add interview schedule
router.post("/interviewSchedule",hrCtrl.getSchedules);
//get schedule for the interview 
router.get("/getschedule",hrCtrl.getshed);


// Job Seeker routes
router.post("/regJobSeeker",jobskrctrl.regSeekers);
// to show all job seekers
router.get("/getAllJobSeeker",jobskrctrl.getSeeker);
//Login the job seeker using email and password
router.post("/loginseeker",jobskrctrl.getLogJobSeeker);
router.get("/profile", verifyUser, jobskrctrl.getProfile);

// get job seeker by id
router.get("/jobseekerbyid/:seeker_id",jobskrctrl.getUserById);

// for the search job by laction 
router.get("/viewjobbylocation",jobctrl.jobbylocation);

// Add data in job table 
// router.post("/AddJob", jobctrl.addingJob);
// get all jobs 
router.get("/viewAllJobs",jobctrl.getAllJobs);
// get job by ID//viewAllJobs
router.get("/getJobById",jobctrl.getJobById);
// uodate the job 
router.put("/updateJob",jobctrl.UpdateJobById);
// delete job by id 
router.delete("/deleteJob",jobctrl.getDeleteJob);
// search job by title 
router.get("/searchByTitle",jobctrl.searchJobByTitle);
//Applied for the job 
router.post("/applyedJob",jobskrctrl.applyJob);
//View Applicant for jobs
router.get("/view-applicants",jobskrctrl.getApplicants);


// Send mail testing 
router.post("/sendEmail",email.sendGemail);

module.exports = router;
