let emailserv=require("../services/sendEmail.js");

exports.sendGemail=(req,res)=>{
    let {email, name}=req.body;
    emailserv.sendEmail(
        email,
        "Welcome to Quick Start Career Saurabh & Kishor's Project... ",
        `Hello ${name},Welcome to Online Job Portal `
    ).then(result=>{
        res.send("Email sent successfully");
    }).catch(err=>{
        res.send(err);
    })
}