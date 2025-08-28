const db = require("../../db.js");


//this is for the authentication

// Find HR by email

// exports.findByEmail = async (email) => {
//   const sql = "SELECT * FROM hr WHERE email = ?";
//   const [rows] = await db.query(sql, [email]);
//   return rows;
// };

// Add HR 


exports.createHR = async (hr_name, company_name, email, phone, hashedPassword, role) => {
  const sql = `
    INSERT INTO hr (hr_name, company_name, email, phone, password, role) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(sql, [hr_name, company_name, email, phone, hashedPassword, role]);
  return result;
};

exports.findByEmail = async (email) => {
  try {
    const [rows] = await db.execute("SELECT * FROM hr WHERE email = ?", [email]);
    return rows; // returns an array of HRs (0 or 1)
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
};

// Get HR by ID (without password)
exports.findById = async (id) => {
  const [rows] = await db.query(
    "SELECT hr_id, hr_name, email, company_name, created_at FROM hr WHERE hr_id=?",
    [id]
  );
  return rows[0];
};






// Add hr in database
exports.addHr = (hr_name, company_name, email, phone) => {
    return new Promise((resolve, reject) => {
        db.query( "INSERT INTO hr (hr_name, company_name, email, phone) VALUES ( ?, ?, ?, ?)",
            [hr_name, company_name, email, phone],
            (err, result) => {
                if (err) {
                    console.log(err);

                    return reject("Hr Not Save");
                }
                resolve("HR Saved Successfully");
            }
        );
    });
};


// --------------- new change ------------------------

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

// getAll hr in the table 
exports.getHr = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM hr order by hr_id DESC");
    return rows;
  } catch (err) {
    throw err;
  }
};



//  Get All Jobs
exports.getResentJob = async (hrId) => {
  try {
    const [rows] = await db.query(
      `
      SELECT j.*, 
             COUNT(a.application_id) AS applicant_count
      FROM jobs j
      LEFT JOIN applications a ON j.job_id = a.job_id
      WHERE j.hr_id = ?
      GROUP BY j.job_id
      ORDER BY j.created_at ASC
      `,
      [hrId]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

// update the hr data 




//delete hr using its id 
exports.delHrById = async (hr_id) => {
  try {
    const [result] = await db.query("DELETE FROM hr WHERE hr_id = ?", [hr_id]);

    if (result.affectedRows === 0) {
      throw "HR not found";
    }
    return "HR deleted successfully";
  } catch (err) {
    throw "Hr Not Deleted...";
  }
};

// for the delete student by hr
exports.deleteStudById = (seeker_id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM job_seekers WHERE seeker_id = ?", [seeker_id], (err, result) => {
            if (err) {
                return reject("Student not deleted...");
            }
            if (result.affectedRows === 0) {
                return reject("No student found with that ID.");
            }
            return resolve("Student deleted successfully.");
        });
    });
};

exports.getSchedule=(job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks)=>{
    return new Promise((resolve, reject)=>{
        db.query("insert into interview_schedule (job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks) values (?,?,?,?,?,?,?,?,?,?)",[job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks], (err, result)=>{
            if(err)
            {
                return reject("Schedule not created...");
            }else{
                return resolve("schedule succesfull.......");
            }

        })
    })
}

exports.getSched=()=>{
     return new Promise((resolve, reject)=>{
        db.query("select *from interview_schedule",(err, result)=>{
              if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
     })
}

exports.getById = async (hrId) => {
  try {
    const [rows] = await db.query("SELECT * FROM hr WHERE hr_id = ?", [hrId]);
    return rows[0]; // return first row
  } catch (err) {
    throw err;
  }
};

// ------------ adminhome page---------------------

// Count HRs
exports.getCountHr = async () => {
  const [rows] = await db.query("SELECT COUNT(*) AS total FROM hr");
  return rows[0]; // { total: X }
};

// Count Students
exports.getCountStudents = async () => {
  const [rows] = await db.query("SELECT COUNT(*) AS total FROM job_seekers");
  return rows[0];
};

// Count Applications
exports.getCountApplications = async () => {
  const [rows] = await db.query("SELECT COUNT(*) AS total FROM applications");
  return rows[0];
};


// Update HR profile (only name, email, phone)
exports.updateHR = (hr_id, hr_name, company_name, email, phone) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE hr 
      SET hr_name = ?, company_name = ?, email = ?, phone = ?
      WHERE hr_id = ?
    `;

    db.query(sql, [hr_name, company_name, email, phone, hr_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};