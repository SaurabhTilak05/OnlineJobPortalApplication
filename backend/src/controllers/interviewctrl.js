const InterviewModel = require("../models/interviewmodel.js");
const { sendEmail } = require("../services/sendEmail.js"); 

exports.scheduleInterview = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.job_id || !data.seeker_id || !data.hr_id || !data.interview_date || !data.interview_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Save interview
    const result = await InterviewModel.createInterview(data);

    // Get seeker info
    const seeker = await InterviewModel.getSeekerEmail(data.seeker_id);

    if (seeker && seeker.email) {
      const subject = "Interview Scheduled - QuickStart Career";
      const html = `
        <h2>Dear ${seeker.name},</h2>
        <p>Your interview has been scheduled successfully.</p>
        <p><b>Job ID:</b> ${data.job_id}</p>
        <p><b>Date:</b> ${data.interview_date}</p>
        <p><b>Time:</b> ${data.interview_time}</p>
        <p><b>Mode:</b> ${data.interview_mode}</p>
        ${
          data.interview_mode === "Offline"
            ? `<p><b>Location:</b> ${data.location}</p>`
            : `<p><b>Link:</b> ${data.interview_link}</p>`
        }
        <br/>
        <p>Regards,<br/>QuickStart Career Team</p>
      `;

      // Send email
      await sendEmail(seeker.email, subject, html);
    }

    res.status(201).json({
      message: "Interview scheduled successfully & email sent",
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
