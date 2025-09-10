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

      // Plain text fallback (for email clients that don’t support HTML)
      const message = `
Dear ${seeker.name},

Your interview has been scheduled successfully.

Job ID: ${data.job_id}
Date: ${data.interview_date}
Time: ${data.interview_time}
Mode: ${data.interview_mode}
${
  data.interview_mode === "Offline"
    ? `Location: ${data.location}`
    : `Link: ${data.interview_link}`
}

Best regards,
QuickStart Career Team
`;

      // HTML email
      const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Interview Scheduled</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #007bff;">Dear ${seeker.name},</h2>
      <p>Your interview has been <strong>scheduled successfully</strong>.</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Job ID:</td>
          <td style="padding: 8px;">${data.job_id}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Date:</td>
          <td style="padding: 8px;">${data.interview_date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Time:</td>
          <td style="padding: 8px;">${data.interview_time}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Mode:</td>
          <td style="padding: 8px;">${data.interview_mode}</td>
        </tr>
        ${
          data.interview_mode === "Offline"
            ? `<tr>
                 <td style="padding: 8px; font-weight: bold;">Location:</td>
                 <td style="padding: 8px;">${data.location}</td>
               </tr>`
            : `<tr>
                 <td style="padding: 8px; font-weight: bold;">Link:</td>
                 <td style="padding: 8px;"><a href="${data.interview_link}" target="_blank">${data.interview_link}</a></td>
               </tr>`
        }
      </table>

      <p style="margin-top: 20px;">Best regards,<br>QuickStart Career Team</p>
    </div>
  </body>
</html>
`;

      // ✅ Pass all 4 params (to, subject, text, html)
      await sendEmail(seeker.email, subject, message, html);
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
