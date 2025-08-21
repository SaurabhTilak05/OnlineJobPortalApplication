let db = require("../../db.js");

// ✅ Add hr in database
exports.regSeeker = async (name, email, password, phone, address) => {
  try {
    await db.query(
      "INSERT INTO job_seekers (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, phone, address]
    );
    return "Job seeker saved successfully";
  } catch (err) {
    throw new Error("Job seeker not saved");
  }
};

// ✅ Get all job seekers 
exports.getAllSeekers = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM job_seekers");
    return rows;
  } catch (err) {
    throw err;
  }
};

// ✅ Get user by ID
exports.getuserById = async (seeker_id) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM job_seekers WHERE seeker_id = ?",
      [seeker_id]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

// ✅ Login job seeker with email and password
exports.loginSeeker = async (email, password) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM job_seekers WHERE email = ? AND password = ?",
      [email, password]
    );

    if (!rows || rows.length === 0) {
      throw new Error("Invalid email or password");
    }

    return "Job seeker login successful";
  } catch (err) {
    throw err;
  }
};

// ✅ Apply for Job
exports.applyJobs = async (job_id, seeker_id) => {
  try {
    await db.query(
      "INSERT INTO applications (job_id, seeker_id) VALUES (?, ?)",
      [job_id, seeker_id]
    );
    return "Applied successfully";
  } catch (err) {
    throw new Error("Not applied for job");
  }
};

// ✅ Get all applicants
exports.getAllApplicant = async () => {
  try {
    const [rows] = await db.query(`
      SELECT s.name, s.email, s.phone, j.title, a.status 
      FROM job_seekers s 
      INNER JOIN applications a ON s.seeker_id = a.seeker_id 
      INNER JOIN jobs j ON a.job_id = j.job_id
    `);
    return rows;
  } catch (err) {
    throw err;
  }
};
