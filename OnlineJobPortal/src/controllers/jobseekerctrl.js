let jobsctrl=require("../models/jobseekermodel.js");


exports.regSeekers = (req, res) => {
    let {name,  email, password, phone, address } = req.body;
   let Promice= jobsctrl.regSeeker(name,  email, password, phone, address)
       Promice.then((result)=>{
        res.send(result);
       }).catch((err)=>{
        res.send(err);
       })
};



exports.getSeeker = (req, res) => {
    jobsctrl.getAllSeekers()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.getLogJobSeeker=(req,res)=>{
    let {email, password}=req.body;
    let Promice=jobsctrl.loginSeeker(email, password);
    Promice.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}


exports.applyJob=(req,res)=>{
    let {job_id, seeker_id, status}=req.body;
    let Promise =jobsctrl.applyJobs(job_id, seeker_id, status);
    Promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })

}