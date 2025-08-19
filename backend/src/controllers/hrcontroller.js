let hrctrl= require("../models/hrmodel.js");
const bcrypt = require("bcrypt");
let db=require("../../db.js");
const jwt = require("jsonwebtoken");
//const conn = require("../../db.js");


const SECRET = process.env.JWT_SECRET || "mySecretKey";

// Admin adds HR (phone will be used as password, store hashed)

exports.addHR1 = async (req, res) => {
  try {
    const { hr_name, email, phone, company_name } = req.body;

    // hash the phone number (used as password)
    const hashedPassword = await bcrypt.hash(phone, 10);

    await db.query(
      "INSERT INTO hr (hr_name, email, phone, company_name, password) VALUES (?, ?, ?, ?, ?)",
      [hr_name, email, phone, company_name, hashedPassword]
    );

    res.status(201).json({ message: "HR added successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error adding HR", error });
  }
};


// HR login

exports.hrLogin = async (req, res) => {
  try {

    console.log(req.body.username);
    console.log(req.body.password)
    console.log(req.body.role);
    const { username, password } = req.body;
        console.log(""+username)
    
    const [rows] = await db.query("SELECT * FROM hr WHERE email = ?", [username]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const hr = rows[0];

    
    const isMatch = await bcrypt.compare(password, hr.password);
    if (!isMatch) {

        console.log(isMatch);

      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: hr.id, email: hr.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error logging in", error });
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

exports.detHRByID=(req,res)=>{
    let {hr_id}=req.body;
    let promise=hrctrl.delHrById(hr_id);
    promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}

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
