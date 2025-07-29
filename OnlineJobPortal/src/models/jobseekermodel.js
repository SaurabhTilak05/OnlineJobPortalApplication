let db=require("../../db.js");

// Add hr in database
exports.regSeeker = (name,  email, password, phone, address) => {
    return new Promise((resolve, reject) => {
        db.query( "INSERT INTO job_seekers (name,  email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
            [name,  email, password, phone, address],
            (err, result) => {
                if (err) {
                    return reject("job_seekers Not Save");
                }
                resolve("job_seekers Saved Successfully");
            }
        );
    });
};


