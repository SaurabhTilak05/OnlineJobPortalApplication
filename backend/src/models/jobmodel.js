let db = require("../../db.js");

// Add Job
// models/jobmodel.js


exports.addJob = async (data) => {
  try {
    const sql = `
      INSERT INTO jobs 
        (hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.hr_id,
      data.title,
      data.company,
      data.opening,
      data.experience_required,
      data.location,
      data.package,
      data.skills_required,
      data.description,
      data.deadline,
    ];

    const [result] = await db.query(sql, values);
    return { insertId: result.insertId };
  } catch (err) {
    throw err;
  }
};


//  Get All Jobs
exports.getAllJob = async (hrId) => {
  try {
    const [rows] = await db.query(`
      SELECT j.*, 
             COUNT(a.application_id) AS applicant_count
      FROM jobs j
      LEFT JOIN applications a ON j.job_id = a.job_id
      GROUP BY j.job_id
      ORDER BY j.created_at ASC
    `);  // pass hrId as parameter
    return rows;
  } catch (err) {
    throw err;
  }
};



//  Get Job by ID
exports.getJobById = async (job_id) => {
  try {
    const [rows] = await db.query("SELECT * FROM jobs WHERE job_id = ?", [job_id]);
    return rows;
  } catch (err) {
    throw err;
  }
};

//  Update Job
exports.updateJob = async (title, company, opening, experience_required, location, package, skills_required, description, deadline, job_id) => {
  try {
    const [result] = await db.query(
      `UPDATE jobs 
       SET title=?, company=?, opening=?, experience_required=?, location=?, package=?, skills_required=?, description=?, deadline=? 
       WHERE job_id=?`,
      [title, company, opening, experience_required, location, package, skills_required, description, deadline, job_id]
    );
    return { message: "Job Updated Successfully", affectedRows: result.affectedRows };
  } catch (err) {
    throw err;
  }
};

//  Delete Job
exports.deleteJob = async (job_id) => {
  try {
    const [result] = await db.query("DELETE FROM jobs WHERE job_id = ?", [job_id]);
    return { message: "Job Deleted Successfully", affectedRows: result.affectedRows };
  } catch (err) {
    throw err;
  }
};

//  Search by Title
exports.searchByTitle = async (title) => {
  try {
    const [rows] = await db.query(
      `SELECT j.* 
       FROM jobs j 
       LEFT JOIN hr h ON j.hr_id = h.hr_id 
       WHERE j.title = ?`,
      [title]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

//  Search by Location
exports.jobbyLocation = async (location) => {
  try {
    const [rows] = await db.query("SELECT * FROM jobs WHERE location = ?", [location]);
    return rows;
  } catch (err) {
    throw err;
  }
};
