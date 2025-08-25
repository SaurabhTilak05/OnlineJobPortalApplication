let jobsctrl = require("../models/jobseekermodel.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  Register Seeker

exports.regSeekers = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const existingUser = await jobsctrl.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await jobsctrl.create(name, email, hashedPassword, phone, address);

    res.status(201).json({ message: "Job seeker registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering seeker", error: err.message });
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
      { id: user.seeker_id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token , seeker_id: user.seeker_id});
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await jobsctrl.findById(req.user.id);
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
    const result = await jobsctrl.applyJobs(job_id, seeker_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error applying for job" });
  }
};

//  Get All Applicants
exports.getApplicants = async (req, res) => {
  try {
    const result = await jobsctrl.getAllApplicant();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error fetching applicants" });
  }
};
