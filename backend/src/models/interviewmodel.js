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

// Get all interviews with seeker name & job title
exports.getAllInterviews = async () => {
  const [rows] = await db.query(`
    SELECT 
      i.*, 
      s.name AS seeker_name, 
      j.title AS job_title
    FROM interview_schedule i
    JOIN job_seekers s ON i.seeker_id = s.seeker_id
    JOIN jobs j ON i.job_id = j.job_id
  `);
  return rows;
};

// Get Interviews by Seeker with Job Details
exports.getInterviewsBySeeker = async (seekerId) => {
  const [rows] = await db.query(
    `SELECT 
        i.*,

        j.job_id,
        j.title AS job_title,
        j.company,
        j.location AS job_location,
        j.experience_required,
        j.package,
        j.skills_required,
        j.deadline
     FROM interview_schedule i
     JOIN jobs j ON i.job_id = j.job_id
     WHERE i.seeker_id = ?
     ORDER BY i.interview_date, i.interview_time`,
    [seekerId]
  );
  return rows;
};


// Get seeker email by seeker_id
exports.getSeekerEmail = async (seekerId) => {
  const [rows] = await db.query(
    "SELECT email, name FROM job_seekers WHERE seeker_id = ?",
    [seekerId]
  );
  return rows[0]; // एक result मिळेल
};

// Get by Job
exports.getInterviewsByJob = async (jobId) => {
  const [rows] = await db.query(
    `SELECT 
        i.*, 
        s.name AS seeker_name
     FROM interview_schedule i
     JOIN job_seekers s ON i.seeker_id = s.seeker_id
     WHERE i.job_id = ?`,
    [jobId]
  );
  return rows;
};

// ✅ Get by HR (with seeker name & job title)
exports.getInterviewsByHR = async (hrId) => {
  const [rows] = await db.query(
    `SELECT 
        i.*, 
        s.name AS seeker_name, 
        j.title AS job_title
     FROM interview_schedule i
     JOIN job_seekers s ON i.seeker_id = s.seeker_id
     JOIN jobs j ON i.job_id = j.job_id
     WHERE i.hr_id = ?`,
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
