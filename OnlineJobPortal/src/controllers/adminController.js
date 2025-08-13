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

//view all jobs 
exports.viewAlljobforAdmin=(req,res)=>{
    let promise=adminCtrl.viewalljobAdmin();
    promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
}



//search Hr by its id
exports.searchHrByid=(req,res)=>{
    let {hr_id}=req.body;
    let Promice=adminCtrl.SearchHR(hr_id);
    Promice.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })

}


//view all application to admin
exports.viewallapplicant=(req,res)=>{
    let promise=adminCtrl.viewallApplication();
    promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
}

exports.contactUs=(req,res)=>{
    let {full_name,email,message}=req.body;
    let promise=adminCtrl.contUs(full_name,email,message);
    promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}

exports.getcontact=(req,res)=>{
    let promise=adminCtrl.getAllCont();
    promise.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}