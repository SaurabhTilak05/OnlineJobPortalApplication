let db = require("../../db.js");

exports.addAdmin = (username, password, role) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO admin (username, password, role) VALUES (?, ?, ?)",
            [username, password, role],
            (err, result) => {
                if (err) {
                    console.error("DB error:", err);
                    return reject("Data Not Saved");
                }
                return resolve("Admin Saved Successfully");
            }
        );
    });
};

//wrfergtgrtgre



exports.adminLogin = (username) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM admin WHERE username = ?", [username], (err, result) => {
      if (err || result.length === 0) {
        return reject("Invalid Admin Credentials.. ");
      } else {
        return resolve(result);
      }
    });
  });
};



//for the view all job for admin
exports.viewalljobAdmin=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from jobs ",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};



//for the search all hr to the admin
exports.SearchHR=(hr_id)=>{
    return new Promise((resolve ,reject)=>{
        db.query("select *from hr where hr_id=?",[hr_id],(err, result)=>{
            if(err)
            {
                return reject("Hr Not found...");
            }
        })
    })
}

//for the view all applications for the admin
exports.viewallApplication=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from job_seekers ",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

exports.contUs=(full_name,email,message)=>{
    return new Promise((resolve,reject)=>{
        db.query("insert into contact_us (full_name,email,message) values (?,?,?)",[full_name,email,message],(err,result)=>{
            if(err)
            {
                return reject("Your Response not Send");
            }
            else{
                return resolve("Send Your Response Sucessfull...");
            }
        })
    })
}
exports.getAllCont=()=>{
    return new Promise((resolve, reject)=>{
          db.query("select * from contact_us ",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}