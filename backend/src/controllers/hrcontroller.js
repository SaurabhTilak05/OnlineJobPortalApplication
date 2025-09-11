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
    // 🔍 check if email already exists
    const existingHR = await hrModel.findByEmail(email);
    if (existingHR.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists ",
      });
    }

    const hashedPassword = await bcrypt.hash(phone.toString(), 10);

    const result = await hrModel.createHR(
      hr_name,
      company_name,
      email,
      phone,
      hashedPassword,
      role
    );

    // send email
    const message = `Hello ${hr_name},

Your HR account has been successfully created for ${company_name}.

🔑 Login Credentials:
- Username (Email): ${email}
- Password: ${phone} (same as your mobile number)

⚠️ Note: Please change your password after first login.

Regards,
Quick Start Career Team`;

    await sendEmail(email, "Your HR Account Credentials", message);

    res.status(201).json({
      success: true,
      message: "HR account created successfully. Credentials sent to email.",
      hrId: result.insertId,
    });
  } catch (err) {
    console.error("Error creating HR:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
      error: err,
    });
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
  hr_id: hr.hr_id   
});
  } catch (err) {
    console.error("Error during HR login:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------- new change -----------------------

exports.addingJob = (req, res) => {
  const { title, company, opening, experience_required, location, package, skills_required, description, deadline,hr_id } = req.body;

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
    const hr = await hrModel.getById(req.user.id);

    if (!hr) {
      return res.status(404).json({ message: "HR not found" });
    }

    res.json({
      message: "HR profile fetched successfully",
      hr: hr, // return HR details
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching profile",
      error: err.message,
    });
  }
};


//  Get all jobs
exports.getJobHrDash = async (req, res) => {
  try {
  
    const hrId = req.user.id;
    if (!hrId) return res.status(400).json({ message: "HR ID missing in token" });

    const result = await hrModel.getResentJob(hrId);
   // ✅ debug DB result
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
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

exports.updateHRProfile = async (req, res) => {
  try {
    const { hr_id } = req.params;
    const { hr_name, company_name, email, phone } = req.body;

    if (!hr_id || !hr_name || !company_name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await hrModel.updateHR(hr_id, hr_name, company_name, email, phone);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "HR not found" });
    }

    res.status(200).json({ message: "HR Profile updated successfully" });
  } catch (error) {
    console.error("Error updating HR profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.deleteHRByID = async (req, res) => {
  try {
    const { hr_id } = req.params;

    // 1️⃣ Get HR email before delete
    const hrData = await hrModel.getHrById(hr_id);
    const hrEmail = hrData.email;

    // 2️⃣ Delete HR record
    const result = await hrModel.delHrById(hr_id);

    // 3️⃣ Send email notification
    const subject = "HR Account Deleted - Quick Start Career";
    const message = "Your HR account has been deleted from our system.";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: red;">HR Account Deleted</h2>
        <p>Dear HR,</p>
        <p>We regret to inform you that your HR account has been <b>deleted</b> from our system.</p>
        <p>If you believe this was a mistake, please contact our support team immediately.</p>
        <br/>
        <p>Regards,<br/>Quick Start Career Team</p>
      </div>
    `;

    await sendEmail(hrEmail, subject, message, htmlContent);

    // 4️⃣ Respond back
    return res.status(200).json({ message: result, emailSent: true });

  } catch (err) {
    return res.status(400).json({ message: err.toString() });
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