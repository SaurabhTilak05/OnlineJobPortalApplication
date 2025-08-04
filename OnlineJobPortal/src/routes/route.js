let express = require("express");
let adCtrl = require("../controllers/adminController.js");
let hrCtrl=require("../controllers/hrcontroller.js");
let jobskrctrl=require("../controllers/jobseekerctrl.js");
let jobctrl=require("../controllers/jobcontrol.js");

let router = express.Router();

// Admin routes
router.post("/addAdmin", adCtrl.saveAdmin);
router.post("/adminLogin",adCtrl.adminLogin);

//new made by kishor
//view all job  list to student
router.get("/viewAlljobforAdmin",adCtrl.viewAlljobforAdmin);

//search hr to admin
router.get("/SearchHRById",adCtrl.searchHrByid);

//veiw all application for the admin
router.get("/viewallapplications",adCtrl.viewallapplicant);





// Hr routes
router.post("/registerHr", hrCtrl.registerHr);
// view all Hr 
router.get("/viewHr", hrCtrl.getHrs);
//hr login with email and password
router.post("/hrLogin",hrCtrl.loginHr);
// update all fields 
router.put("/UpdateHr",hrCtrl.updateHr);
// Delete hr by Id
router.delete("/deleteHR",hrCtrl.detHRByID);
// for the delete student by hr
//router.delete("/DeleteStudByID", hrCtrl.DeleteStudByID);
router.delete("/DeleteStudByID/:seeker_id", hrCtrl.DeleteStudByID);



// Job Seeker routes
router.post("/regJobSeeker",jobskrctrl.regSeekers);
// to show all job seekers
router.get("/getAllJobSeeker",jobskrctrl.getSeeker);
//Login the job seeker using email and password
router.post("/loginseeker",jobskrctrl.getLogJobSeeker);


// for the search job by laction 
router.get("/viewjobbylocation",jobctrl.jobbylocation);




// Add data in job table 
router.post("/AddJob",jobctrl.addingJob);
// get all jobs 
router.get("/viewAllJobs",jobctrl.getAllJob);
// get job by ID
router.get("/getJobById",jobctrl.getJobById);
// uodate the job 
router.put("/updateJob",jobctrl.UpdateJobById);
// delete job by id 
router.delete("/deleteJob",jobctrl.getDeleteJob);

router.get("/searchByTitle",jobctrl.searchJobByTitle);
//Applied for the job 
router.post("/applyedJob",jobskrctrl.applyJob);



module.exports = router;
