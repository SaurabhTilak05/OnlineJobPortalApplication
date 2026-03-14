const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt.js");

function verifyToken1(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(403).json({ message: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    // Updated 2026-03-13: restrict HR routes to authenticated HR accounts only.
    if (user.role !== "hr") {
      return res.status(403).json({ message: "Access denied: HRs only" });
    }
    
    req.user = user;
    next();
  });
}

module.exports = verifyToken1;
