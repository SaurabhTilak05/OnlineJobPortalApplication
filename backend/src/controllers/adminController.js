const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let adminCtrl = require("../models/adminModel.js");

const SECRET_KEY = process.env.JWT_SECRET || "kishor@123"; 




exports.saveAdmin = async (req, res) => {
  try {
    let { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username & Password required" });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // save admin with role
    let result = await adminCtrl.addAdmin(username, hashedPassword, role || 'admin');

    return res.status(201).json({ message: "Admin created successfully", result });
  } catch (err) {
    console.error("Error saving admin:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};





// ----------------- ADMIN LOGIN -----------------
exports.adminLogin = async (req, res) => {
  try {
    let { username, password } = req.body;
    console.log("Request creds:", username, password);

    // fetch from DB
    let result = await adminCtrl.adminLogin(username);
    console.log(result)
    if (!result || result.length === 0) {
      return res.status(401).json({ message: "Invalid username" });
    }

    let admin = result[0]; // row from DB
    console.log("DB admin record:", admin);

    // check password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("is match is "+isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // generate JWT with dynamic role from DB
    const token = jwt.sign(
      { id: admin.admin_id, role: admin.role }, // 👈 role comes from DB now
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    // respond with token + role + username
    return res.json({
      message: "Login successful",
      token,
      role: admin.role,
      username: admin.username,
    });

  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};










// ----------------- PROTECTED ROUTES -----------------
// Require auth: use verifyToken middleware (added separately in middleware/auth.js)
exports.viewAlljobforAdmin = async (req, res) => {
  try {
    let result = await adminCtrl.viewalljobAdmin();
    res.json(result);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchHrByid = async (req, res) => {
  try {
   let { hr_id } = req.params;
    let result = await adminCtrl.SearchHR(hr_id);
    res.json(result);
  } catch (err) {
    console.error("Error searching HR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.viewallapplicant = async (req, res) => {
  try {
    let result = await adminCtrl.viewallApplication();
    res.json(result);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ----------------- CONTACT -----------------
exports.contactUs = async (req, res) => {
  try {
    const { full_name, email, message } = req.body;
    const result = await adminCtrl.contUs(full_name, email, message);
    res.status(201).json({ message: "Message saved successfully", result });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};


exports.getcontact = async (req, res) => {
  try {
    let result = await adminCtrl.getAllCont();
    res.json(result);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const db = require("../../db.js");
exports.getAllPlacements = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id AS placement_id,
        p.placement_date,
        p.status AS placement_status,
        p.remarks,

        s.seeker_id,
        s.name AS seeker_name,
        s.email AS seeker_email,
        sp.profile_picture,

        sp.college_name,
        sp.branch,
        sp.graduation_year,
        sp.percentage,
        sp.skills,

        j.job_id,
        j.title AS job_title,
        j.company,
        j.location,
        j.package
      FROM placement p
      INNER JOIN job_seekers s ON p.seeker_id = s.seeker_id
      LEFT JOIN student_profiles sp ON s.seeker_id = sp.seeker_id
      INNER JOIN jobs j ON p.job_id = j.job_id
      ORDER BY p.placement_date DESC
    `);

    res.status(200).json({ placements: rows });
  } catch (err) {
    console.error("Error fetching admin placements:", err);
    res.status(500).json({ error: "Server error" });
  }
};