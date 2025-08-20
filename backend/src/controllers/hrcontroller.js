const bcrypt = require("bcrypt");
const hrModel = require("../models/hrModel.js"); 
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "mySecretKey";

// Admin adds HR (phone will be used as password, stored hashed)

exports.addHR1 = async (req, res) => {
  const { hr_name, company_name, email, phone } = req.body;
  const role = "hr";

  try {
    // default password = phone (hashed)
    const hashedPassword = await bcrypt.hash(phone.toString(), 10);

    // call model (await)
    const result = await hrModel.createHR(hr_name, company_name, email, phone, hashedPassword, role);

    res.status(201).json({
      message: "HR added successfully",
      hrId: result.insertId,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Database error", error: err });
  }
};



// HR login

exports.hrLogin = async (req, res) => {
  try {
    const { username, password } = req.body; // username = email, password = phone
    console.log("username"+username+" password"+password);
    console.log(req.body);
    // Find HR by email
    const result = await hrModel.findByEmail(username);
    console.log("result is"+result);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const hr = result[0];

    // phone number check (no bcrypt, direct match)
    if (hr.phone.toString() !== password.toString()) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: hr.hr_id, email: hr.email, role: hr.role },
      "mySecretKey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "HR login successful",
      role: hr.role,
      hrId: hr.hr_id,
      token
    });
  } catch (err) {
    console.error("Error during HR login:", err);
    res.status(500).json({ message: "Server error" });
  }
};





// Get HR profile (protected)
exports.getProfile = async (req, res) => {
  try {
    const [rows] = await conn.query("SELECT id, hr_name, email, company_name FROM hr WHERE id = ?", [req.user.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "HR not found" });
    }

    res.json({
      message: "HR profile fetched successfully",
      hr: rows[0]   // return HR details
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};






















exports.registerHr = (req, res) => {
    const { hr_name, company_name, email,phone } = req.body || {};

    hrctrl.addHr(hr_name, company_name, email, phone )
        .then((result) => {
            return res.status(200).json({ message: result });
        })
        .catch((err) => {
            console.error("Error saving admin:", err);
            return res.status(500).json({ error: err });
        });
};

// get ALL HRS
exports.getHrs=(req,res)=>{
    let promise=hrctrl.getHr();
    promise.then((result)=>{
       res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
}








exports.loginHr=(req, res)=>{
    let {email, password}=req.body;
    let Promice=hrctrl.hrLogin(email,password);
    Promice.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}


exports.updateHr=(req,res)=>{
    let {hr_id,hr_name, company_name, email, password, phone, status}=req.body;
    let Promise=hrctrl.UpdateHr(hr_id,hr_name, company_name, email, password, phone, status);
    Promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}

exports.deleteHRByID = (req, res) => {
  const { hr_id } = req.params;

  // ✅ using Promise
  let promise=hrctrl.delHrById(hr_id);
   promise.then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};
// for the delete student by hr
exports.DeleteStudByID = (req, res) => {
    let {seeker_id } = req.params;
    hrctrl.deleteStudById(seeker_id)
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

// Scheduling the job interview
exports.getSchedules=(req,res)=>{
    let { job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks}=req.body;
    hrctrl.getSchedule(job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks)
    .then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}

// Get Schedule 
exports.getshed=(req,res)=>{
    let Promice=hrctrl.getSched();
    Promice.then((result)=>{
       res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
}
