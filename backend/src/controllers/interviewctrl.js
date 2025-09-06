const InterviewModel = require("../models/interviewmodel.js");

// Schedule new interview
exports.scheduleInterview = async (req, res) => {
  try {
    const data = { ...req.body };

    // Basic validation (optional, prevents null errors)
    if (!data.job_id || !data.seeker_id || !data.hr_id || !data.interview_date || !data.interview_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await InterviewModel.createInterview(data);
    res.status(201).json({
      message: "Interview scheduled successfully",
      interview_id: result.insertId,
    });
  } catch (err) {
    console.error("Error scheduling interview:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all interviews
exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await InterviewModel.getAllInterviews();
    res.json(interviews);
  } catch (err) {
    console.error("Error fetching interviews:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get interviews by Seeker
exports.getBySeeker = async (req, res) => {
  try {
    const interviews = await InterviewModel.getInterviewsBySeeker(req.params.seekerId);
    res.json(interviews);
  } catch (err) {
    console.error("Error fetching interviews by seeker:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get interviews by Job
exports.getByJob = async (req, res) => {
  try {
    const interviews = await InterviewModel.getInterviewsByJob(req.params.jobId);
    res.json(interviews);
  } catch (err) {
    console.error("Error fetching interviews by job:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get interviews by HR
exports.getByHR = async (req, res) => {
  try {
    const interviews = await InterviewModel.getInterviewsByHR(req.params.hrId);
    res.json(interviews);
  } catch (err) {
    console.error("Error fetching interviews by HR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update interview
exports.updateInterview = async (req, res) => {
  try {
    const data = { ...req.body };
    await InterviewModel.updateInterview(req.params.id, data);
    res.json({ message: "Interview updated successfully" });
  } catch (err) {
    console.error("Error updating interview:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete interview
exports.deleteInterview = async (req, res) => {
  try {
    await InterviewModel.deleteInterview(req.params.id);
    res.json({ message: "Interview deleted successfully" });
  } catch (err) {
    console.error("Error deleting interview:", err);
    res.status(500).json({ error: "Server error" });
  }
};
