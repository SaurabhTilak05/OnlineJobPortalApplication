let hrctrl= require("../models/hrmodel.js");

exports.saveHr = (req, res) => {
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

exports.getHrs=(req,res)=>{
      let promise=hrctrl.getHr();
    promise.then((result)=>{
       res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
}