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


