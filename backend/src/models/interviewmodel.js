const db = require("../../db.js");

// Create Interview
exports.createInterview = async (data) => {
  const statusValue = data.status || "Scheduled";

  const sql = `
    INSERT INTO interview_schedule 
    (job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time, interview_link, location, status, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    data.job_id,
    data.seeker_id,
    data.hr_id,
    data.interview_mode,
    data.interview_date,
    data.interview_time,
    data.interview_link || null,
    data.location || null,
    statusValue,
    data.remarks || null,
  ]);

  return result; // contains insertId
};

// Get all interviews
exports.getAllInterviews = async () => {
  const [rows] = await db.query("SELECT * FROM interview_schedule");
  return rows;
};

// Get by Seeker
exports.getInterviewsBySeeker = async (seekerId) => {
  const [rows] = await db.query(
    "SELECT * FROM interview_schedule WHERE seeker_id = ?",
    [seekerId]
  );
  return rows;
};

// Get by Job
exports.getInterviewsByJob = async (jobId) => {
  const [rows] = await db.query(
    "SELECT * FROM interview_schedule WHERE job_id = ?",
    [jobId]
  );
  return rows;
};

// Get by HR
exports.getInterviewsByHR = async (hrId) => {
  const [rows] = await db.query(
    "SELECT * FROM interview_schedule WHERE hr_id = ?",
    [hrId]
  );
  return rows;
};

// Update interview (partial update)
exports.updateInterview = async (id, data) => {
  const sql = `
    UPDATE interview_schedule SET
      interview_mode = COALESCE(?, interview_mode),
      interview_date = COALESCE(?, interview_date),
      interview_time = COALESCE(?, interview_time),
      interview_link = COALESCE(?, interview_link),
      location = COALESCE(?, location),
      status = COALESCE(?, status),
      remarks = COALESCE(?, remarks)
    WHERE interview_id = ?
  `;

  const [result] = await db.query(sql, [
    data.interview_mode || null,
    data.interview_date || null,
    data.interview_time || null,
    data.interview_link || null,
    data.location || null,
    data.status || "Scheduled",
    data.remarks || null,
    id,
  ]);

  return result;
};

// Delete interview
exports.deleteInterview = async (id) => {
  const [result] = await db.query(
    "DELETE FROM interview_schedule WHERE interview_id = ?",
    [id]
  );
  return result;
};
