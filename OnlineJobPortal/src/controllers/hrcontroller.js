let hrctrl= require("../models/hrmodel.js");

exports.registerHr = (req, res) => {
    const { hr_name, company_name, email, password, phone, status } = req.body || {};

    hrctrl.addHr(hr_name, company_name, email, password, phone, status )
        .then((result) => {
            return res.status(200).json({ message: result });
        })
        .catch((err) => {
            console.error("Error saving admin:", err);
            return res.status(500).json({ error: err });
        });
};


// get ALL HRS
exports.getHrs=(req,res)=>{
    let promise=hrctrl.getHr();
    promise.then((result)=>{
       res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
}


exports.loginHr=(req, res)=>{
    let {email, password}=req.body;
    let Promice=hrctrl.hrLogin(email,password);
    Promice.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}

exports.updateHr=(req,res)=>{
    let {hr_id,hr_name, company_name, email, password, phone, status}=req.body;
    let Promise=hrctrl.UpdateHr(hr_id,hr_name, company_name, email, password, phone, status);
    Promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}

exports.detHRByID=(req,res)=>{
    let {hr_id}=req.body;
    let promise=hrctrl.delHrById(hr_id);
    promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })

}



// for the delete student by hr
exports.DeleteStudByID = (req, res) => {
    const { seeker_id } = req.params;
    hrctrl.deleteStudById(seeker_id)
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
};