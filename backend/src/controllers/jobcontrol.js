let jobctrl = require("../models/jobmodel.js");

// ✅ Add job
exports.addingJob = async (req, res) => {
  try {
    const {
      hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline,  } = req.body;

    const result = await jobctrl.addJob(  hr_id,  title,  company,  opening,  experience_required,  location,  package,  skills_required, description,  deadline );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// ✅ Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const result = await jobctrl.getAllJob();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// ✅ Get job by ID
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
