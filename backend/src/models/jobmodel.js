let db = require("../../db.js");

// Add Job
exports.addJob = async (hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline) => {
  try {
    const [result] = await db.query(
      `INSERT INTO jobs 
        (hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline]
    );
    return { message: "Job Added Successfully", insertId: result.insertId };
  } catch (err) {
    throw err;
  }
};

//  Get All Jobs
exports.getAllJob = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM jobs ORDER BY created_at DESC");
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
