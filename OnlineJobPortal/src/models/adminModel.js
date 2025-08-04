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







//new made by kishor
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
