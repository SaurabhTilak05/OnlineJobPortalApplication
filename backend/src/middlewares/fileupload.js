let multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "resume") cb(null, "public/resumes/");
    else if (file.fieldname === "photo") cb(null, "public/images/");
    else cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "-");
    cb(null, Date.now() + "-" + cleanName);
  },
});


let upload = multer({ storage: storage });

module.exports = upload;
