const express = require("express");
const adCtrl = require("../controllers/adminController.js");
const hrCtrl=require("../controllers/hrcontroller.js");

const router = express.Router();

// Admin routes
router.post("/addAdmin", adCtrl.saveAdmin);

// Hr routes
router.post("/addHr", hrCtrl.saveHr);
router.get("/viewHr", hrCtrl.getHrs);

module.exports = router;
