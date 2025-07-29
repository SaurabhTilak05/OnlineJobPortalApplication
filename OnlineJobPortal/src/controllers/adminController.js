const adminCtrl = require("../models/adminModel.js");


exports.saveAdmin = (req, res) => {
    const { username, password } = req.body || {};

    adminCtrl.addAdmin(username, password)
        .then((result) => {
            return res.status(200).json({ message: result });
        })
        .catch((err) => {
            console.error("Error saving admin:", err);
            return res.status(500).json({ error: err });
        });
};


