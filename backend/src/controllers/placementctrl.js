const db = require("../../db.js");

exports.getPlacements = async (req, res) => {
  try {
 
    const hrId = req.query.hrId; 
    if (!hrId) {
      return res.status(400).json({ error: "HR ID is required" });
    }

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
      WHERE j.hr_id = ?  -- filter by HR
      ORDER BY p.placement_date DESC
    `, [hrId]);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching placements:", err);
    res.status(500).json({ error: "Server error" });
  }
};
