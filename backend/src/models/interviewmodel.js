const db = require("../../db.js");

const statusMap = {
  scheduled: "interview_scheduled",
  completed: "shortlisted",
  selected: "selected",
  rejected: "rejected",
  cancelled: "applied",
};

const InterviewModel = {
  // Create interview only if it doesn't exist
  async createInterview(data) {
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

  // Insert into placement table
  async insertPlacement(seeker_id, job_id) {
    // Optional: prevent duplicate placement
    const [existing] = await db.query(
      `SELECT * FROM placement WHERE seeker_id = ? AND job_id = ?`,
      [seeker_id, job_id]
    );
    if (existing.length === 0) {
      await db.query(`INSERT INTO placement (seeker_id, job_id) VALUES (?, ?)`, [seeker_id, job_id]);
    }
  },

  // Get all interviews
  async getAllInterviews() {
    const [rows] = await db.query(`
      SELECT i.*, s.name AS seeker_name, s.email AS seeker_email, j.title AS job_title
      FROM interview_schedule i
      JOIN job_seekers s ON i.seeker_id = s.seeker_id
      JOIN jobs j ON i.job_id = j.job_id
    `);
    return rows;
  },

  // Get interviews by seeker
  async getInterviewsBySeeker(seekerId) {
    const [rows] = await db.query(
      `SELECT i.*, j.title AS job_title, s.email AS seeker_email, s.name AS seeker_name
       FROM interview_schedule i
       JOIN jobs j ON i.job_id = j.job_id
       JOIN job_seekers s ON i.seeker_id = s.seeker_id
       WHERE i.seeker_id = ?
       ORDER BY i.interview_date, i.interview_time`,
      [seekerId]
    );
    return rows;
  },

  // Get interviews by HR
  async getInterviewsByHR(hrId) {
    const [rows] = await db.query(
      `SELECT i.*, s.name AS seeker_name, s.email AS seeker_email, j.title AS job_title
       FROM interview_schedule i
       JOIN job_seekers s ON i.seeker_id = s.seeker_id
       JOIN jobs j ON i.job_id = j.job_id
       WHERE i.hr_id = ?`,
      [hrId]
    );
    return rows;
  },

  // Update interview status AND sync with applications & placement
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
        return null;
      }

      // Fetch interview details for email + application update
      const [rows] = await conn.query(
        `SELECT i.job_id, i.seeker_id, j.title AS job_title, s.email AS seeker_email, s.name AS seeker_name
         FROM interview_schedule i
         JOIN jobs j ON i.job_id = j.job_id
         JOIN job_seekers s ON i.seeker_id = s.seeker_id
         WHERE i.interview_id = ?`,
        [interviewId]
      );

      const interview = rows[0];

      if (interview) {
        // Update applications
        const applicationStatus = statusMap[status];
        if (applicationStatus) {
          await conn.query(
            `UPDATE applications SET status = ? WHERE job_id = ? AND seeker_id = ?`,
            [applicationStatus, interview.job_id, interview.seeker_id]
          );
        }

        // ✅ If selected, insert into placement table
        if (status === "selected") {
          await this.insertPlacement(interview.seeker_id, interview.job_id);
        }
      }

      await conn.commit();
      return interview; // return interview details for controller email
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
