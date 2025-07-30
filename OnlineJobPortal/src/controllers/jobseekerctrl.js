let jobctrl=require("../models/jobseekermodel.js");


exports.regSeekers = (req, res) => {
    let {name,  email, password, phone, address } = req.body;
   let Promice= jobctrl.regSeeker(name,  email, password, phone, address)
       Promice.then((result)=>{
        res.send(result);
       }).catch((err)=>{
        res.send(err);
       })
};



exports.getSeeker = (req, res) => {
    jobctrl.getAllSeekers()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.getLogSeeker=(req,res)=>{
    let {email, password}=req.body;
    let Promice=jobctrl.loginSeeker(email, password);
    Promice.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}
