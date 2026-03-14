let jobsctrl = require("../models/jobseekermodel.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db=require("../../db.js");
const crypto = require("crypto");
const sendEmail = require("../services/sendEmail.js");
const { JWT_SECRET } = require("../config/jwt.js");

// Register Job Seeker
exports.regSeekers = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //  Check email already exists
    const existingUser = await jobsctrl.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await jobsctrl.create(name, email, hashedPassword, phone, address);

    res.status(201).json({ message: "✅ Job seeker registered successfully" });
  } catch (err) {
    console.error("Error registering seeker:", err);
    res.status(500).json({ message: "Server error while registering" });
  }
};




//  Get All Seekers
exports.getSeeker = async (req, res) => {
  try {
    const result = await jobsctrl.getAllSeekers();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error fetching seekers" });
  }
};

//  Login Job Seeker

exports.getLogJobSeeker = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await jobsctrl.findByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { seeker_id: user.seeker_id, email: user.email, role: "user" },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login successful", token , seeker_id: user.seeker_id});
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

exports.getProfileuser = async (req, res) => {
  try {
    const user = await jobsctrl.findById(req.user.seeker_id); // ✅ use seeker_id, not id
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};


//  Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const { seeker_id } = req.params;
    const result = await jobsctrl.getuserById(seeker_id);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// //  Apply for Job
// exports.applyJob = async (req, res) => {
//   try {
//     const { job_id, seeker_id } = req.body;
    
//     const result = await jobsctrl.applyJobs(job_id, seeker_id);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Error applying for job" });
//   }
// };

//  Get All Applicants

exports.getApplicants = async (req, res) => {
  try {
    const hrId = req.user.id; // ✅ comes from JWT
    const result = await jobsctrl.getAllApplicant(hrId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error fetching applicants" });
  }
};



// service layer (jobskrctrl.js)
exports.applyJob = async (req, res) => {
  try {
    const { job_id } = req.body;
    const seeker_id = req.user.seeker_id;
    // 🔹 Check profile completion %
    const percentage = await jobsctrl.getProfileCompletion(seeker_id);

    if (percentage < 30) {
      return res.status(403).json({
        success: false,
        message: `⚠️ Please complete your profile at least 30% before applying. Current: ${percentage}%`
      });
    }

    // 🔹 Normal Apply Logic
    const result = await jobsctrl.applyJobs(job_id, seeker_id);
    res.json({ success: true, message: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Error applying for job" });
  }
};



// ✅ Get applied jobs for a student
exports.getallJobs = async (req, res) => {
  try {
    const seekerId = req.user.seeker_id;
    const jobs = await jobsctrl.getAppliedJobs(seekerId);

    if (!jobs || jobs.length === 0) {
      return res.json({ message: "No applied jobs found" });
    }

    res.json(jobs);
  } catch (err) {
    console.error("Error fetching applied jobs:", err);
    res.status(500).json({ error: "Failed to fetch applied jobs" });
  }
};

// to see the applicant to admin
  exports.getAppltoadmin = async (req, res) => {
  try {
    const apps = await jobsctrl.getAllApplications();
    res.status(200).json(apps);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const seeker_id = req.user.seeker_id;
    const profileData = req.body;

    if (!profileData || Object.keys(profileData).length === 0) {
      return res.status(400).json({ message: "Profile data is missing" });
    }

    // Exclude resume_url
    const { resume_url, ...dataWithoutResume } = profileData;

    await jobsctrl.upsertProfile(seeker_id, dataWithoutResume);
    res.json({ message: "Profile saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving profile", error: err.message });
  }
};

exports.uploadResume = async (req, res) => {
  try {
    const seeker_id = req.user.seeker_id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resumePath = `/resumes/${req.file.filename}`;

    await jobsctrl.upsertProfile(seeker_id, { resume_url: resumePath });
    res.json({ message: "Resume uploaded successfully", resume_url: resumePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading resume", error: err.message });
  }
};






//  Get applicant profile by seekerId
exports.getApplicantProfile = async (req, res) => {
  const { seekerId } = req.params;

  try {
    const applicant = await jobsctrl.findApplicantById(seekerId);

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(applicant);
  } catch (err) {
    console.error("Error fetching applicant profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Upload profile picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    const seeker_id = req.user.seeker_id; // token मधून id येईल

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePath = `/images/${req.file.filename}`; // image path तयार

    // Save/Update profile picture
    await jobsctrl.upsertProfile(seeker_id, { profile_picture: profilePath });

    res.json({
      message: "Profile picture uploaded successfully",
      profile_picture: profilePath,
    });
  } catch (err) {
    console.error("Error uploading profile picture:", err);
    res.status(500).json({
      message: "Error uploading profile picture",
      error: err.message,
    });
  }
};

// Get profile (with profile picture)
exports.getProfile = async (req, res) => {
  try {
    const seeker_id = req.user.seeker_id; // <-- problem here
    const profile = await jobsctrl.findByIdP(seeker_id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------

exports.getDashboardStats = async (req, res) => {
  try {
    const seeker_id = req.user.seeker_id;

    const applied = await jobsctrl.getAppliedCount(seeker_id);
    // const saved = await jobsctrl.getSavedCount(seeker_id);
    const openings = await jobsctrl.getOpeningsCount();
    const profileCompletion = await jobsctrl.getProfileCompletion(seeker_id);

    res.json({ applied, openings, profileCompletion });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
};

exports.profileStatus = async (req, res) => {
  try {
    const seeker_id = req.user.seeker_id;
    const completion = await jobsctrl.getProfileCompletion(seeker_id);
    res.json({ completion }); // return { completion: number }
  } catch (err) {
    res.status(500).json({ error: err.message || "Error fetching profile status" });
  }
};

//-----------------------------------------


// 🔹 Step 1: Forgot Password (send reset link)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // User check
    const [rows] = await db.query("SELECT * FROM job_seekers WHERE email = ?", [email]);
    if (!rows.length) {
      // Updated 2026-03-13: keep the response generic to avoid leaking registered emails.
      return res.json({ message: "If that email is registered, a password reset link has been sent" });
    }

    // Token generate
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expireTime = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

    // Save token in DB
    await db.query(
      "UPDATE job_seekers SET reset_token = ?, reset_token_expires = ? WHERE email = ?",
      [resetToken, expireTime, email]
    );

    // ✅ Use FRONTEND_URL from .env
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // ✅ Beautiful HTML Email
    const htmlContent = `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 30px;
        text-align: center;
      ">
        <div style="
          background-color: #ffffff;
          max-width: 500px;
          margin: auto;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        ">
          <h2 style="color: #333;">🔐 Password Reset Request</h2>
          <p style="color: #555; font-size: 15px;">
            We received a request to reset your password. <br>
            Click the button below to reset it:
          </p>

          <a href="${resetLink}" target="_blank" 
            style="
              display: inline-block;
              margin-top: 20px;
              background-color: #007bff;
              color: white;
              padding: 12px 24px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: bold;
            ">
            Reset Password
          </a>

          <p style="color: #777; font-size: 13px; margin-top: 25px;">
            This link will expire in 15 minutes. <br>
            If you didn’t request this, please ignore this email.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} QuickStart Career. All rights reserved.
          </p>
        </div>
      </div>
    `;

    const message = `Click the link below to reset your password:\n\n${resetLink}`;

    await sendEmail.sendEmail(email, "Password Reset Request", message, htmlContent);

    res.json({ message: "If that email is registered, a password reset link has been sent" });
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// 🔹 Step 2: Reset Password (after clicking link)
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Missing token or password" });
    }

    // Check token
    const [rows] = await db.query(
      "SELECT * FROM job_seekers WHERE reset_token = ? AND reset_token_expires > NOW()",
      [token]
    );

    if (!rows.length) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "UPDATE job_seekers SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = ?",
      [hashedPassword, token]
    );

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error in resetPassword:", err);
    res.status(500).json({ message: "Server error" });
  }
};
