const { resolveInclude, promiseImpl } = require("ejs");
let db=require("../../db.js");

//api for the addjob by the hr 
exports.addJob=(hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline)=>{
    return new Promise((resolve, reject)=>{
        db.query("INSERT into jobs (hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline) VALUES (?, ?,?,?,?,?,?,?,?,?)",
            [hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline],
            (err,result)=>{
                if(err){
                    return reject("Job Not Added");
                }
                else{
                    return resolve("Job Added Sucessfull..........");
                }
            }
        )
    })
}



//for the see all job
exports.getallJobs=()=>{
    return new Promise((resolve, reject)=>{
        db.query("select *from jobs",(err, result)=>{
            if(err)
            {
                return reject("Something is Wrong....");
            }
            else{
                return resolve(result);
            }
        })
    })
}



//search job by using jobId

exports.getJobById=(job_id)=>{
        return new Promise((resolve, reject)=>{
            db.query("select *from jobs where job_id=?",[job_id],(err,result)=>{
                if(err){
                    return reject("Data Not found...");
                }
                else{
                    return resolve(result);
                }
            })
        })
}



//update the job 
exports.updateJob=( title, company, opening, experience_required, location, package, skills_required, description, deadline, job_id)=>{
    return new Promise((resolve, reject)=>{
        db.query("update jobs set title=?, company=?, opening=?, experience_required=?, location=?, package=?, skills_required=?, description=?, deadline=? where job_id=?",
            [ title, company, opening, experience_required, location, package, skills_required, description, deadline, job_id],(err,result)=>{
            if(err){
                return reject("Something is wrong...");
            }
            else{
                return resolve(result);
            }
        });
    })
}

// delete job   
exports.deleteJob=(job_id)=>{
    return new Promise((resolve, reject)=>{
        db.query("delete from jobs where job_id=?",[job_id],(err, result)=>{
            if(err){
                return reject("Something is wrong...");
            }
            else{
                return resolve("Delete Job successfull...");
            }
        })
    })
}


//search job by the title

exports.searchByTitle=(title)=>{
     return new Promise((resolve, reject)=>{
        db.query("select  *from jobs where title=?",[title],(err, result)=>{
            if(err){
                return reject("Something is wrong...");
            }
            else{
                return resolve(result);
            }
        })
    })
}



//this is for the search job by using location 

exports.jobbyLocation=(location)=>{
     return new Promise((resolve, reject)=>{
        db.query("select  *from jobs where location=?",[location],(err, result)=>{
            if(err){
                return reject("Something is wrong...");
            }
            else{
                return resolve(result);
                console.log(result);

            }
        })
    })
}