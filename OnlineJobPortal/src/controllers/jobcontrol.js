
let jobctrl=require("../models/jobmodel.js");

exports.addingJob=(req,res)=>{
    let {hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline}=req.body;
    let Promise=jobctrl.addJob(hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline)
    Promise.then((result)=>{
    res.send(result);
    }).catch((err)=>{
    res.send(err);
    })
}


exports.getAllJob=(req,res)=>{
    let promise=jobctrl.getallJobs();
    promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
}

exports.getJobById=(req,res)=>{
    let {job_id}=req.body;
    let Promise=jobctrl.getJobById(job_id);
   Promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
}

exports.UpdateJobById=(req,res)=>{
    let { title, company, opening, experience_required, location, package, skills_required, description, deadline, job_id}=req.body;
    let Promise=jobctrl.updateJob(title, company, opening, experience_required, location, package, skills_required, description, deadline, job_id);
    Promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })

}

exports.getDeleteJob=(req, res)=>{
    let {job_id}=req.body;
    let Promise=jobctrl.deleteJob(job_id);
    Promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}
 
exports.searchJobByTitle=(req,res)=>{
    let {title}=req.body;
    let Promise=jobctrl.searchByTitle(title);
    Promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}


//this api for the seacrh job by student 
exports.jobbylocation=(req,res)=>{
    let {location}=req.body;
    let Promise=jobctrl.jobbyLocation(location);
    Promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}