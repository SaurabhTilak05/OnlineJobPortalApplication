const { resolveInclude, promiseImpl } = require("ejs");
let db=require("../../db.js");


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