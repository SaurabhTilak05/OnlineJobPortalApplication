const db = require("../../db.js");

const statusMap = {
  scheduled: "interview_scheduled",
  completed: "shortlisted",
  selected: "selected",
  rejected: "rejected",
  cancelled: "applied",
};

const InterviewModel = {
  // ✅ Create interview only if it doesn't exist
  async createInterview(data) {
    // Check for duplicate interview (same job, seeker, date, time)
    const [existing] = await db.query(
      `SELECT * FROM interview_schedule
       WHERE job_id = ? AND seeker_id = ? AND interview_date = ? AND interview_time = ?`,
      [data.job_id, data.seeker_id, data.interview_date, data.interview_time]
    );

    if (existing.length > 0) {
      return { insertId: existing[0].interview_id, message: "Interview already exists" };
    }

    const statusValue = data.status || "scheduled";

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

    // Update applications table
    await db.query(
      `UPDATE applications SET status = 'interview_scheduled' WHERE job_id = ? AND seeker_id = ?`,
      [data.job_id, data.seeker_id]
    );

    return result;
  },

  // Get all interviews
  async getAllInterviews() {
    const [rows] = await db.query(`
      SELECT i.*, s.name AS seeker_name, j.title AS job_title
      FROM interview_schedule i
      JOIN job_seekers s ON i.seeker_id = s.seeker_id
      JOIN jobs j ON i.job_id = j.job_id
    `);
    return rows;
  },

  // Get interviews by seeker
  async getInterviewsBySeeker(seekerId) {
    const [rows] = await db.query(
      `SELECT i.*, j.title AS job_title
       FROM interview_schedule i
       JOIN jobs j ON i.job_id = j.job_id
       WHERE i.seeker_id = ?
       ORDER BY i.interview_date, i.interview_time`,
      [seekerId]
    );
    return rows;
  },

  // Get interviews by job
  async getInterviewsByJob(jobId) {
    const [rows] = await db.query(
      `SELECT i.*, s.name AS seeker_name
       FROM interview_schedule i
       JOIN job_seekers s ON i.seeker_id = s.seeker_id
       WHERE i.job_id = ?`,
      [jobId]
    );
    return rows;
  },

  // Get interviews by HR
  async getInterviewsByHR(hrId) {
    const [rows] = await db.query(
      `SELECT i.*, s.name AS seeker_name, j.title AS job_title
       FROM interview_schedule i
       JOIN job_seekers s ON i.seeker_id = s.seeker_id
       JOIN jobs j ON i.job_id = j.job_id
       WHERE i.hr_id = ?`,
      [hrId]
    );
    return rows;
  },

  // Update interview partially
  async updateInterview(id, data) {
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
      data.status || "scheduled",
      data.remarks || null,
      id,
    ]);
    return result;
  },

  // Delete interview
  async deleteInterview(id) {
    const [result] = await db.query(
      "DELETE FROM interview_schedule WHERE interview_id = ?",
      [id]
    );
    return result;
  },

  // Update interview status AND sync with applications
  async updateInterviewStatus(interviewId, status, remarks) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // Update interview schedule
      const [result] = await conn.query(
        `UPDATE interview_schedule SET status = ?, remarks = ? WHERE interview_id = ?`,
        [status, remarks || null, interviewId]
      );

      if (result.affectedRows === 0) {
        await conn.rollback();
        return result;
      }

      // Fetch job_id & seeker_id
      const [rows] = await conn.query(
        `SELECT job_id, seeker_id FROM interview_schedule WHERE interview_id = ?`,
        [interviewId]
      );
      const interview = rows[0];

      if (interview) {
        const applicationStatus = statusMap[status];
        if (applicationStatus) {
          await conn.query(
            `UPDATE applications SET status = ? WHERE job_id = ? AND seeker_id = ?`,
            [applicationStatus, interview.job_id, interview.seeker_id]
          );
        }
      }

      await conn.commit();
      return result;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  // Get seeker email
  async getSeekerEmail(seekerId) {
    const [rows] = await db.query(
      "SELECT email, name FROM job_seekers WHERE seeker_id = ?",
      [seekerId]
    );
    return rows[0];
  },
};

module.exports = InterviewModel;
