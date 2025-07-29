let db=require("../../db.js");


// Add hr in database
exports.addHr = (hr_name, company_name, email, password, phone, status) => {
    return new Promise((resolve, reject) => {
        db.query( "INSERT INTO hr (hr_name, company_name, email, password, phone, status) VALUES (?, ?, ?, ?, ?, ?)",
            [hr_name, company_name, email, password, phone, status],
            (err, result) => {
                if (err) {
                    return reject("Data Not Save");
                }
                resolve("HR Saved Successfully");
            }
        );
    });
};

// getAll hr in the table 
exports.getHr=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from hr ",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};