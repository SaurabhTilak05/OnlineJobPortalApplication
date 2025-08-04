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

// get all job seekers 
exports.getAllSeekers = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM job_seekers", (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
};

// Login job seeker with email and password
exports.loginSeeker=(email, password)=>{
    return new Promise((resolve, reject)=>{
        db.query("select *from job_seekers where email=? and password=?",[email, password],(err, result)=>{
            if(err || result.length === 0)
            {
                console.log(err);
                
                return reject("Job seeker Not Login successfull...");
            }
            else{
                  console.log(result);
                return resolve("Job seeker Login successfull...");
            }
        })
    })   
}

exports.applyJobs=(job_id, seeker_id, status)=>{
    return new Promise((resolve, reject)=>{
        db.query("insert into applications (job_id, seeker_id, status) values (?,?,?)",
            [job_id, seeker_id, status],
            (err,result)=>{
                if(err)
                {
                    return reject("Not Applied For Job");
                }
                else{
                    return resolve("Applied Successfull.....");
                }
            }
        )
    })

}