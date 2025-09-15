// middlewares/authmiddleware.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET; // Make sure JWT_SECRET is set in .env

// ✅ Verify JWT (generic for any user)
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer token"
    if (!token) {
      return res.status(403).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // store user info in request
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Verify Admin Role (after verifyToken)
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Admins only" });
};

module.exports = { verifyToken, verifyAdmin };
