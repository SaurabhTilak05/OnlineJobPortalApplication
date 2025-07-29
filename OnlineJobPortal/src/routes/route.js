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
router.get("/viewHr", hrCtrl.getHrs);
router.post("/hrLogin",hrCtrl.loginHr);

// update all fields 
router.put("/UpdateHr",hrCtrl.updateHr);

// Delete hr by Id
router.delete("/deleteHR",hrCtrl.detHRByID);



// Job Seeker routes
router.post("/regJobSeeker",jobctrl.regSeekers);

module.exports = router;
