let db = require("../../db.js");

// Insert new job seeker
exports.create = async (name, email, hashedPassword, phone, address) => {
  await db.query(
    "INSERT INTO job_seekers (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashedPassword, phone, address]
  );
};

// Find user by email
exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM job_seekers WHERE email = ?", [email]);
  return rows[0]; // return single user or undefined
};

exports.findById = async (id) => {
  const [rows] = await db.query(
    `SELECT 
       js.seeker_id, js.name, js.email, js.phone, js.address AS js_address, js.created_at,
       sp.dob, sp.gender, sp.address AS sp_address, sp.qualification, sp.college_name, sp.branch,
       sp.graduation_year, sp.percentage, sp.skills, sp.certifications, sp.projects,
       sp.experience, sp.languages_known, sp.resume_url, sp.profile_picture, sp.preferred_role,
       sp.preferred_location, sp.updated_at
     FROM job_seekers js
     LEFT JOIN student_profiles sp 
       ON js.seeker_id = sp.seeker_id
     WHERE js.seeker_id = ?`,
    [id]
  );

  if (!rows[0]) return null;

  const user = rows[0];

  // Fallback: अगर student_profiles record नाही, तर default empty values द्या
  const profile = {
    dob: user.dob || "",
    gender: user.gender || "",
    address: user.sp_address || user.js_address || "",
    qualification: user.qualification || "",
    college_name: user.college_name || "",
    branch: user.branch || "",
    graduation_year: user.graduation_year || "",
    percentage: user.percentage || "",
    skills: user.skills || "",
    certifications: user.certifications || "",
    projects: user.projects || "",
    experience: user.experience || "",
    languages_known: user.languages_known || "",
    resume_url: user.resume_url || "",
   // ✅ added
    preferred_role: user.preferred_role || "",
    preferred_location: user.preferred_location || "",
    updated_at: user.updated_at || null,
     profile_picture: user.profile_picture || "", 
  };

  return { ...user, ...profile };
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
      `SELECT 
         s.seeker_id,   
         s.name, 
         s.email, 
         s.phone, 
         j.title, 
         a.status, 
         a.application_id
       FROM job_seekers s
       INNER JOIN applications a ON s.seeker_id = a.seeker_id
       INNER JOIN jobs j ON a.job_id = j.job_id
       WHERE j.hr_id = ?  
       ORDER BY a.applied_at DESC`,  
      [hrId]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};






// ✅ Apply for Job
// controller (jobsctrl.js)
exports.applyJobs = async (job_id, seeker_id) => {
  try {
    const [check] = await db.query(
      "SELECT * FROM applications WHERE job_id = ? AND seeker_id = ?",
      [job_id, seeker_id]
    );

    if (check.length > 0) {
      return "You have already applied for this job";
    }

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


exports.findApplicantById = async (seekerId) => {
  const [rows] = await db.query(
    `
    SELECT 
      js.seeker_id,
      js.name,
      js.email,
      js.phone,
      sp.profile_id,
      sp.dob,
      sp.gender,
      sp.address,
      sp.qualification,
      sp.college_name,
      sp.branch,
      sp.graduation_year,
      sp.percentage,
      sp.skills,
      sp.certifications,
      sp.projects,
      sp.experience,
      sp.languages_known,
      sp.resume_url,
      sp.preferred_role,
      sp.preferred_location,
     
      sp.updated_at,
      a.job_id
    FROM job_seekers js
    LEFT JOIN student_profiles sp 
      ON js.seeker_id = sp.seeker_id
    LEFT JOIN applications a 
      ON js.seeker_id = a.seeker_id
    WHERE js.seeker_id = ?
    ORDER BY a.applied_at DESC
    LIMIT 1
    `,
    [seekerId]
  );

  return rows[0] || {}; // return empty object if no profile
};


exports.upsertProfile = async (seeker_id, data) => {
  const allowedFields = [
    "dob","gender","address","qualification","college_name","branch",
    "graduation_year","percentage","skills","certifications","projects",
    "experience","languages_known","resume_url","profile_picture","preferred_role",
    "preferred_location"
  ];

  const fields = ["seeker_id"];
  const placeholders = ["?"];
  const values = [seeker_id];
  const updateFields = [];

  allowedFields.forEach(key => {
    if (data[key] !== undefined) {
      fields.push(key);
      placeholders.push("?");
      values.push(data[key]);
      updateFields.push(`${key} = VALUES(${key})`);
    }
  });

  // If nothing to update besides seeker_id, still do insert with only seeker_id
  const sql = `
    INSERT INTO student_profiles (${fields.join(",")})
    VALUES (${placeholders.join(",")})
    ON DUPLICATE KEY UPDATE ${updateFields.length ? updateFields.join(",") + ", updated_at = CURRENT_TIMESTAMP" : "updated_at = CURRENT_TIMESTAMP"}
  `;
  const [result] = await db.query(sql, values);
  return result;
};


exports.findByIdP = async (id) => {
  const [rows] = await db.query(
    `SELECT 
       js.seeker_id, js.name, js.email, js.phone, js.address, js.created_at,
       sp.dob, sp.gender, sp.qualification, sp.college_name, sp.branch,
       sp.graduation_year, sp.percentage, sp.skills, sp.certifications, sp.projects,
       sp.experience, sp.languages_known, sp.resume_url, sp.profile_picture,
       sp.preferred_role, sp.preferred_location, sp.updated_at
     FROM job_seekers js
     LEFT JOIN student_profiles sp 
       ON js.seeker_id = sp.seeker_id
     WHERE js.seeker_id = ?`,
    [id]
  );
  return rows[0];
};


// -------------------------

// Total applied jobs
exports.getAppliedCount = async (seeker_id) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS totalApplied FROM applications WHERE seeker_id = ?",
    [seeker_id]
  );
  return rows[0]?.totalApplied || 0;
};


// Total active openings
exports.getOpeningsCount = async () => {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS totalOpenings FROM jobs WHERE deadline >= CURDATE()"
  );
  return rows[0]?.totalOpenings || 0;
};

// Profile completion %
exports.getProfileCompletion = async (seeker_id) => {
  const [rows] = await db.query(
    `SELECT dob, gender, address, qualification, college_name, branch,
     graduation_year, percentage, skills, certifications, projects,
     experience, languages_known, resume_url, profile_picture,
     preferred_role, preferred_location 
     FROM student_profiles
     WHERE seeker_id = ?`,
    [seeker_id]
  );

  if (!rows[0]) return 0;

  const profile = rows[0];
  const totalFields = Object.keys(profile).length;
  let filledFields = 0;

  Object.values(profile).forEach(val => {
    if (val !== null && val !== "") filledFields++;
  });

  return Math.round((filledFields / totalFields) * 100);
};