let jobctrl = require("../models/jobmodel.js");




exports.fetchAllJobs = async (req, res) => {
  //console.log(req.data);

  try {
    const jobs = await jobctrl.getAllJobs();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error while fetching jobs" });
  }
};



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
    const { job_id } = req.params;
    const {
      title, company, opening, experience_required,
      location, package, skills_required, description, deadline
    } = req.body;

    const result = await jobctrl.updateJob(
      title, company, opening, experience_required,
      location, package, skills_required, description, deadline, job_id
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
    const { id } = req.params;   // ✅ get from params instead of body
    const result = await jobctrl.deleteJob(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
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


// ✅ Get applied jobs for a student
exports.getallJobs = async (req, res) => {
  try {
    const seekerId = req.params.seekerId;
    const jobs = await jobctrl.getAppliedJobs(seekerId);

    if (!jobs || jobs.length === 0) {
      return res.json({ message: "No applied jobs found" });
    }

    res.json(jobs);
  } catch (err) {
    console.error("Error fetching applied jobs:", err);
    res.status(500).json({ error: "Failed to fetch applied jobs" });
  }
};

exports.getApplicantsByJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const applicants = await jobctrl.getApplicantsByJob(jobId);

    res.json(applicants);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ error: err.message || "Error fetching applicants" });
  }
};