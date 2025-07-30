let express = require("express");
let adCtrl = require("../controllers/adminController.js");
let hrCtrl=require("../controllers/hrcontroller.js");
let jobctrl=require("../controllers/jobseekerctrl.js");

let router = express.Router();

// Admin routes
router.post("/addAdmin", adCtrl.saveAdmin);
router.post("/adminLogin",adCtrl.adminLogin);
// Hr routes
router.post("/registerHr", hrCtrl.registerHr);
// view all Hr 
router.get("/viewHr", hrCtrl.getHrs);
//hr login with email and password
router.post("/hrLogin",hrCtrl.loginHr);

// update all fields 
router.put("/UpdateHr",hrCtrl.updateHr);
// Delete hr by Id

// Job Seeker routes
router.post("/regJobSeeker",jobctrl.regSeekers);
// to show all job seekers
router.get("/getAllJobSeeker",jobctrl.getSeeker);
//Login the job seeker using email and password
router.post("/loginseeker",jobctrl.getLogSeeker);

module.exports = router;
