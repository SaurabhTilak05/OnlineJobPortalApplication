let jobsctrl = require("../models/jobseekermodel.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



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
    console.log(req.body);

    const user = await jobsctrl.findByEmail(email);
    console.log(user);

    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { seeker_id: user.seeker_id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
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

//  Apply for Job
exports.applyJob = async (req, res) => {
  try {
    const { job_id, seeker_id } = req.body;


    console.log("ids are",req.body);
    const result = await jobsctrl.applyJobs(job_id, seeker_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error applying for job" });
  }
};

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



// ✅ Student applies for a job
exports.applyForJob = async (req, res) => {
  try {
    const { job_id, seeker_id } = req.body;

    if (!job_id || !seeker_id) {
      return res.status(400).json({ message: "Job ID and Seeker ID are required" });
    }

    const result = await jobsctrl.applyJobs(job_id, seeker_id);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get applied jobs for a student
exports.getallJobs = async (req, res) => {
  try {
    const seekerId = req.params.seekerId;
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
