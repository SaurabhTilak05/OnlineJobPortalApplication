let adminCtrl = require("../models/adminModel.js");

exports.saveAdmin = (req, res) => {
    let { username, password } = req.body ;
  let promise=  adminCtrl.addAdmin(username, password);
       promise.then((result) => {
            return res.status(200).json({ message: result });
        })
        .catch((err) => {
            console.error("Error saving admin:", err);
            return res.status(500).json({ error: err });
        });
};


exports.adminLogin=(req,res)=>{
        let  { username, password } = req.body ;
        let promise=adminCtrl.adminLogin(username,password);
        promise.then((result)=>{
            res.send(result);
        }).catch((err)=>{
            res.send(err);
        })
        
}