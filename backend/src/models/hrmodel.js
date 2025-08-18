let db=require("../../db.js");


// Add hr in database
exports.addHr = (hr_name, company_name, email, phone) => {
    return new Promise((resolve, reject) => {
        db.query( "INSERT INTO hr (hr_name, company_name, email, phone) VALUES ( ?, ?, ?, ?)",
            [hr_name, company_name, email, phone],
            (err, result) => {
                if (err) {
                    console.log(err);

                    return reject("Hr Not Save");
                }
                resolve("HR Saved Successfully");
            }
        );
    });
};

// getAll hr in the table 
exports.getHr=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from hr ",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};


// login the hr with email and password
exports.hrLogin=(email,password)=>{
    return new Promise((resolve,reject)=>{
        db.query("select *from hr where email=? and password=?",[email,password],(err,result)=>{
               if( err || result.length === 0)
            {
                return reject("Invalid HR ..... ");
            }
            else{
                return resolve("Hr Login Successfull.....");
            }
        })
    })
}

// update the hr data 
exports.UpdateHr=(hr_id,hr_name, company_name, email, password, phone, status)=>{
    return new Promise((resolve, reject)=>{
        db.query("update hr set hr_name=?, company_name=?, email=?, password=?, phone=?, status=? where hr_id=?",[hr_name, company_name, email, password, phone, status,hr_id],(err,result)=>{
          if(err){
            return reject("Not Update.");
          }  
          else{
           return resolve("Update SuccessFully..... ");
          }
        });
    }) 
}


//delete hr using its id 
exports.delHrById=(hr_id)=>{
    return new Promise((resolve ,reject)=>{
        db.query("delete from hr where hr_id=?",[hr_id],(err, result)=>{
            if(err)
            {
                return reject("Hr Not Deleted...");
            }
            else{
                return resolve("HR DELETE SuccessFully.........");
            }
        })
    })
}


// for the delete student by hr
exports.deleteStudById = (seeker_id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM job_seekers WHERE seeker_id = ?", [seeker_id], (err, result) => {
            if (err) {
                return reject("Student not deleted...");
            }
            if (result.affectedRows === 0) {
                return reject("No student found with that ID.");
            }
            return resolve("Student deleted successfully.");
        });
    });
};

exports.getSchedule=(job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks)=>{
    return new Promise((resolve, reject)=>{
        db.query("insert into interview_schedule (job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks) values (?,?,?,?,?,?,?,?,?,?)",[job_id, seeker_id, hr_id, interview_mode, interview_date, interview_time,interview_link, location, status, remarks], (err, result)=>{
            if(err)
            {
                return reject("Schedule not created...");
            }else{
                return resolve("schedule succesfull.......");
            }

        })
    })
}

exports.getSched=()=>{
     return new Promise((resolve, reject)=>{
        db.query("select *from interview_schedule",(err, result)=>{
              if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
     })
}