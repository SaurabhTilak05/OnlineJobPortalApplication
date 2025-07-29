const db = require("../../db.js");

exports.addAdmin = (username, password) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO admin (username, password) VALUES (?, ?)", [username, password], (err, result) => {
            if (err) {
                console.error("DB error:", err);
                return reject("Data Not Save");
            }
            resolve("Admin Saved Successfully");
        });
    });
};



