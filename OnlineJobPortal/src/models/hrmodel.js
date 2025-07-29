let db=require("../../db.js");


// Add hr in database
exports.addHr = (hr_name, company_name, email, password, phone, status) => {
    return new Promise((resolve, reject) => {
        db.query( "INSERT INTO hr (hr_name, company_name, email, password, phone, status) VALUES (?, ?, ?, ?, ?, ?)",
            [hr_name, company_name, email, password, phone, status],
            (err, result) => {
                if (err) {
                    return reject("Hr Not Save");
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

exports.hrLogin=(email,password)=>{
    return new Promise((resolve,reject)=>{
        db.query("select *from hr where email=? and password=?",[email,password],(err,result)=>{
               if( err || result.length === 0)
            {
                return reject("Invalid HR ..... ");
            }
            else{
                return resolve("Hr Login Successfull.....");
            }
        })
    })
}


exports.UpdateHr=(hr_id,hr_name, company_name, email, password, phone, status)=>{
    return new Promise((resolve, reject)=>{
        db.query("update hr set hr_name=?, company_name=?, email=?, password=?, phone=?, status=? where hr_id=?",[hr_name, company_name, email, password, phone, status,hr_id],(err,result)=>{
          if(err){
            return reject("Not Update.");
          }  
          else{
           return resolve("Update SuccessFully..... ");
          }
        });
    }) 
}


exports.delHrById=(hr_id)=>{
    return new Promise((resolve ,reject)=>{
        db.query("delete from hr where hr_id=?",[hr_id],(err, result)=>{
            if(err)
            {
                return reject("Hr Not Deleted...");
            }
            else{
                return resolve("HR DELETE SuccessFully.........");
            }
        })
    })
}


