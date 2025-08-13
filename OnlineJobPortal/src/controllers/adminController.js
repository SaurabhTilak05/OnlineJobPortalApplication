const jwt = require("jsonwebtoken");
let adminCtrl = require("../models/adminModel.js");

const SECRET_KEY = "kishor@123";

// Save admin (only for logged-in admins)
exports.saveAdmin = (req, res) => {
    let { username, password } = req.body;
    let promise = adminCtrl.addAdmin(username, password);
    promise.then((result) => {
        return res.status(200).json({ message: result });
    }).catch((err) => {
        console.error("Error saving admin:", err);
        return res.status(500).json({ error: err });
    });
};

// Admin login with JWT
exports.adminLogin = (req, res) => {
    let { username, password } = req.body;
    let promise = adminCtrl.adminLogin(username, password);
    promise.then((result) => {
        if (!result || result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const admin = result[0]; // Assuming first row is admin

        // Create JWT token with role 'admin'
        const token = jwt.sign(
            { id: admin.id, username: admin.username, role: "admin" },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ success: true, token });
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};

// View all jobs (only for admin)
exports.viewAlljobforAdmin = (req, res) => {
    let promise = adminCtrl.viewalljobAdmin();
    promise.then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
};

// Search HR by id (only for admin)
exports.searchHrByid = (req, res) => {
    let { hr_id } = req.body;
    let promise = adminCtrl.SearchHR(hr_id);
    promise.then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
};

// View all applicants (only for admin)
exports.viewallapplicant = (req, res) => {
    let promise = adminCtrl.viewallApplication();
    promise.then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
};
