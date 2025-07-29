
//it is use for the upload the file like photos and others
let multer =require("multer");
let storage= multer.diskStorage({
    destination:(req, file,cd)=>{
        cd(null,"public/images/");
    },
    filename:(req,file,cd)=>{
        cd(null,file.originalname);
    }
});
let upload= multer({storage:storage});

module.exports=upload;