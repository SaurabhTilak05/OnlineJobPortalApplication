let db = require("../../db.js");

// ✅ Add hr in database
exports.create = async (name, email, hashedPassword, phone, address) => {
  await db.query(
    "INSERT INTO job_seekers (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashedPassword, phone, address]
  );
};



exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM job_seekers WHERE email = ?", [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await db.query(
    `SELECT 
       js.seeker_id, js.name, js.email, js.phone, js.address, js.created_at,
       sp.dob, sp.gender, sp.qualification, sp.college_name, sp.branch,
       sp.graduation_year, sp.percentage, sp.skills, sp.certifications, sp.projects,
       sp.experience, sp.languages_known, sp.resume_url, sp.preferred_role,
       sp.preferred_location, sp.expected_salary, sp.updated_at
     FROM job_seekers js
     LEFT JOIN student_profiles sp 
       ON js.seeker_id = sp.seeker_id
     WHERE js.seeker_id = ?`,
    [id]
  );
  return rows[0];
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


// ✅ Get all applicants
exports.getAllApplicant = async (hrId) => {
  try {
    const [rows] = await db.query(
      `SELECT s.name, s.email, s.phone, j.title, a.status, a.application_id
       FROM job_seekers s
       INNER JOIN applications a ON s.seeker_id = a.seeker_id
       INNER JOIN jobs j ON a.job_id = j.job_id
       WHERE j.hr_id = ?  ORDER BY a.application_id DESC `,  
      [hrId]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};





// ✅ Apply for Job
exports.applyJobs = async (job_id, seeker_id) => {
  try {
    // Prevent duplicate applications
    const [check] = await db.query(
      "SELECT * FROM applications WHERE job_id = ? AND seeker_id = ?",
      [job_id, seeker_id]
    );

    if (check.length > 0) {
      return "You have already applied for this job";
    }

    // Insert application
    await db.query(
      "INSERT INTO applications (job_id, seeker_id, status) VALUES (?, ?, 'applied')",
      [job_id, seeker_id]
    );

    return "Applied successfully";
  } catch (err) {
    throw new Error("Failed to apply for job: " + err.message);
  }
};




exports.getAppliedJobs = async (seekerId) => {
  const [rows] = await db.query(
    `SELECT a.application_id, a.status, a.applied_at,
            j.job_id, j.title, j.company, j.location, j.package, 
            j.skills_required, j.experience_required, j.deadline
     FROM applications a
     JOIN jobs j ON a.job_id = j.job_id
     WHERE a.seeker_id = ?
     ORDER BY a.applied_at DESC`,
    [seekerId]
  );
  return rows;
};

exports.getAllApplications = async () => {
  const [rows] = await db.query(
    `SELECT a.application_id, s.name AS seeker_name, s.email, s.phone,
            j.title AS job_title, a.status, a.applied_at
     FROM applications a
     JOIN job_seekers s ON a.seeker_id = s.seeker_id
     JOIN jobs j ON a.job_id = j.job_id order by application_id desc`
  );
  return rows;
};



exports.update = async (seeker_id, data) => {
  const sql = `
    INSERT INTO student_profiles (
      seeker_id, dob, gender, address, qualification, college_name, branch,
      graduation_year, percentage, skills, certifications, projects, experience,
      languages_known, resume_url, preferred_role, preferred_location, expected_salary, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON DUPLICATE KEY UPDATE
      dob = VALUES(dob),
      gender = VALUES(gender),
      address = VALUES(address),
      qualification = VALUES(qualification),
      college_name = VALUES(college_name),
      branch = VALUES(branch),
      graduation_year = VALUES(graduation_year),
      percentage = VALUES(percentage),
      skills = VALUES(skills),
      certifications = VALUES(certifications),
      projects = VALUES(projects),
      experience = VALUES(experience),
      languages_known = VALUES(languages_known),
      resume_url = VALUES(resume_url),
      preferred_role = VALUES(preferred_role),
      preferred_location = VALUES(preferred_location),
      expected_salary = VALUES(expected_salary),
      updated_at = CURRENT_TIMESTAMP
  `;

  const values = [
    seeker_id, data.dob, data.gender, data.address, data.qualification, data.college_name, data.branch,
    data.graduation_year, data.percentage, data.skills, data.certifications, data.projects,
    data.experience, data.languages_known, data.resume_url, data.preferred_role,
    data.preferred_location, data.expected_salary
  ];

  const [result] = await db.query(sql, values);
  return result;
};
