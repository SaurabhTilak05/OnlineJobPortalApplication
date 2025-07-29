let db = require("../../db.js");

exports.addAdmin = (username, password) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO admin (username, password) VALUES (?, ?)", [username, password], (err, result) => {
            if (err) {
                console.error("DB error:", err);
                return reject("Data Not Save");
            }
          return  resolve("Admin Saved Successfully");
        });
    });
};


exports.adminLogin=(username, password)=>{
    return new Promise((resolve, reject)=>{
        db.query("select *from admin where username=? and password=?",[username, password],(err,result)=>{
            if( err || result.length === 0)
            {
                return reject("Invalid Admin Credentials.. ");
            }
            else{
                return resolve("Admin Login Successfull.....");
            }
        })
    });
}



