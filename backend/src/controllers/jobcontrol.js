let jobctrl = require("../models/jobmodel.js");


// Add Job
exports.addingJob = (req, res) => {
  const { title, company, opening, experience_required, location, package, skills_required, description, deadline,hr_id } = req.body;
  // const hr_id = req.user.hr_id;   // ✅ From token, not from body

  if (!hr_id) {
    return res.status(403).json({ message: "Access denied. Only HR can post jobs." });
  }

  jobctrl.addJob({ title, company, opening, experience_required, location, package, skills_required, description, deadline, hr_id })
    .then(() => res.status(201).json({ message: "Job saved successfully" }))
    .catch(err => {
      console.error("Job save error:", err);
      res.status(500).json({ message: "Failed to save job" });
    });
};




//  Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const hrId = req.user.id; //  use `id` from token
    if (!hrId) return res.status(400).json({ message: "HR ID missing in token" });

    const result = await jobctrl.getAllJobByHR(hrId);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

//  Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const { job_id } = req.body;
    const result = await jobctrl.getJobById(job_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// ✅ Update job by ID
exports.UpdateJobById = async (req, res) => {
  try {
    const {
      title,
      company,
      opening,
      experience_required,
      location,
      package,
      skills_required,
      description,
      deadline,
      job_id,
    } = req.body;

    const result = await jobctrl.updateJob(
      title,
      company,
      opening,
      experience_required,
      location,
      package,
      skills_required,
      description,
      deadline,
      job_id
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// ✅ Delete job by ID
exports.getDeleteJob = async (req, res) => {
  try {
    const { job_id } = req.body;
    const result = await jobctrl.deleteJob(job_id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// ✅ Search job by title
exports.searchJobByTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const result = await jobctrl.searchByTitle(title);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// ✅ Search job by location (for students)
exports.jobbylocation = async (req, res) => {
  try {
    const { location } = req.body;
    const result = await jobctrl.jobbyLocation(location);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};
