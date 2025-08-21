let jobsctrl = require("../models/jobseekermodel.js");

//  Register Seeker
exports.regSeekers = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const result = await jobsctrl.regSeeker(name, email, password, phone, address);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error registering seeker" });
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
    const result = await jobsctrl.loginSeeker(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message || "Invalid credentials" });
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
