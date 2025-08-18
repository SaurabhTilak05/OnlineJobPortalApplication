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

exports.getUserById = (req, res) => {
    let { seeker_id } = req.params; 

    jobsctrl.getuserById(seeker_id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(result);
        })
        .catch((err) => {
            console.error("Error fetching user:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};


exports.applyJob=(req,res)=>{
    let {job_id, seeker_id}=req.body;
    let Promise =jobsctrl.applyJobs(job_id, seeker_id);
    Promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}

exports.getApplicants=(req,res)=>{
    jobsctrl.getAllApplicant()
     .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
}