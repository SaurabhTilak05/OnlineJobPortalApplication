// middleware/auth.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

exports.verifyUser = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Expecting "Bearer token"
    if (!token) {
      return res.status(403).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "Access denied: Users only" });
    }

    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
