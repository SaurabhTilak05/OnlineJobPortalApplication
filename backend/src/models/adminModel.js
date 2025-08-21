let db = require("../../db.js");

exports.addAdmin = (username, password, role) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO admin (username, password, role) VALUES (?, ?, ?)",
            [username, password, role],
            (err, result) => {
                if (err) {
                    console.error("DB error:", err);
                    return reject("Data Not Saved");
                }
                return resolve("Admin Saved Successfully");
            }
        );
    });
};

//wrfergtgrtgre


exports.adminLogin = async (username) => {
  try {
    console.log("in repo " + username);


// exports.adminLogin = (username) => {

//     console.log("in repo " +username
//     )
//   return new Promise((resolve, reject) => {
//     db.query("SELECT * FROM admin WHERE username = ?", [username], (err, result) => {
//         console.log(result)
//       if (err || result.length === 0) {

//         console.log("in if ")
//         return reject("Invalid Admin Credentials.. ");
//       } else {
//         console.log("result is "+result)
//         return resolve(result);
//       }
//     });
//   });
// };
exports.adminLogin = async (username) => {
  try {
    console.log("in repo " + username);

    const [rows] = await db.query("SELECT * FROM admin WHERE username = ?", [username]);
    console.log("result is ", rows);

    if (rows.length === 0) {
      console.log("in if");
      throw new Error("Invalid Admin Credentials.. ");
    }

    return rows; // single admin
  } catch (err) {
    throw err;
  }
};

    const [rows] = await db.query("SELECT * FROM admin WHERE username = ?", [username]);
    console.log("result is ", rows);


    if (rows.length === 0) {
      console.log("in if");
      throw new Error("Invalid Admin Credentials.. ");
    }

    return rows; // single admin
  } catch (err) {
    throw err;
  }
};


//for the view all job for admin
exports.viewalljobAdmin=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from jobs ",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};



//for the search all hr to the admin
exports.SearchHR=(hr_id)=>{
    return new Promise((resolve ,reject)=>{
        db.query("select *from hr where hr_id=?",[hr_id],(err, result)=>{
            if(err)
            {
                return reject("Hr Not found...");
            }
        })
    })
}

//for the view all applications for the admin
exports.viewallApplication=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from job_seekers ",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

// Using async/await
exports.contUs = async (full_name, email, message) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO contact_us (full_name, email, message) VALUES (?, ?, ?)",
      [full_name, email, message]
    );
    return {
      message: "Your Response Sent Successfully ✅",
      createdAt: new Date(),
    };
  } catch (err) {
    console.error("MySQL Error:", err);
    throw new Error("Your Response not Sent ❌");
  }
};


exports.getAllCont=()=>{
    return new Promise((resolve, reject)=>{
          db.query("select * from contact_us ",(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}