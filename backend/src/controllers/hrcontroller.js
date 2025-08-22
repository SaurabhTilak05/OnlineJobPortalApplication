const bcrypt = require("bcrypt");
const hrModel = require("../models/hrModel.js"); 
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/sendEmail.js");
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

     const message = `Hello ${hr_name},\n\nYour HR account has been created.\nUsername: ${email}\nPassword: ${phone}\n\nPlease change your password after first login.`;
    await sendEmail(email, "HR Account Credentials", message);

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
    const { email, password } = req.body; // must match frontend key
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const result = await hrModel.findByEmail(email); // send email to model

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const hr = result[0];

    // phone check
    if (hr.phone.toString() !== password.toString()) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // JWT
    const token = jwt.sign(
      { id: hr.hr_id, email: hr.email, role: hr.role },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: "1h" }
    );

   res.json({
  token,
  role: "hr",
  hr_id: hr.hr_id   // 👈 must send this
});
  } catch (err) {
    console.error("Error during HR login:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------- new change -----------------------

exports.addingJob = (req, res) => {
  const { title, company, opening, experience_required, location, package, skills_required, description, deadline,hr_id } = req.body;
  // const hr_id = req.user.hr_id;   // ✅ From token, not from body

  if (!hr_id) {
    return res.status(403).json({ message: "Access denied. Only HR can post jobs." });
  }

  hrModel.addJob({ title, company, opening, experience_required, location, package, skills_required, description, deadline, hr_id })
    .then(() => res.status(201).json({ message: "Job saved successfully" }))
    .catch(err => {
      console.error("Job save error:", err);
      res.status(500).json({ message: "Failed to save job" });
    });
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

    hrModel.addHr(hr_name, company_name, email, phone )
        .then((result) => {
            return res.status(200).json({ message: result });
        })
        .catch((err) => {
            console.error("Error saving admin:", err);
            return res.status(500).json({ error: err });
        });
};

// get ALL HRS
exports.getHrs = async (req, res) => {
  try {
    const result = await hrModel.getHr();  // wait for promise to resolve
    res.send(result);
  } catch (err) {
    res.status(500).send(err);  // better to send proper error code
  }
};







exports.loginHr=(req, res)=>{
    let {email, password}=req.body;
    let Promice=hrModel.hrLogin(email,password);
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

exports.deleteHRByID = async (req, res) => {
  try {
    const { hr_id } = req.params;
    const result = await hrModel.delHrById(hr_id);
    return res.status(200).json({ message: result });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};




// for the delete student by hr
exports.DeleteStudByID = (req, res) => {
    let {seeker_id } = req.params;
    hrModel.deleteStudById(seeker_id)
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};

// Scheduling the job interview
exports.getSchedules=(req,res)=>{
    let { job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks}=req.body;
    hrModel.getSchedule(job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks)
    .then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}

// Get Schedule 
exports.getshed=(req,res)=>{
    let Promice=hrModel.getSched();
    Promice.then((result)=>{
       res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
}

// -------------- admin home page-------------------------


exports.countHr = async (req, res) => {
  try {
    const result = await hrModel.getCountHr();
    res.json(result); // { total: X }
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
};

exports.countStudents = async (req, res) => {
  try {
    const result = await hrModel.getCountStudents();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
};

exports.countApplications = async (req, res) => {
  try {
    const result = await hrModel.getCountApplications();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
};