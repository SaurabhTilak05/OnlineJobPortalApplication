let multer = require("multer");
const path = require("path");

const uploadRoot = path.resolve(__dirname, "../../public");
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedMimeTypes = {
  resume: new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]),
  photo: new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
  ]),
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "resume") cb(null, path.join(uploadRoot, "resumes"));
    else if (file.fieldname === "photo") cb(null, path.join(uploadRoot, "images"));
    else cb(null, path.join(uploadRoot, "uploads"));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const cleanBaseName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-");
    const safeExtension = extension.replace(/[^a-zA-Z0-9.]/g, "").toLowerCase();
    const finalBaseName = cleanBaseName || "file";

    cb(null, `${Date.now()}-${finalBaseName}${safeExtension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = allowedMimeTypes[file.fieldname];

  if (!allowedTypes) {
    const error = new Error("Unsupported upload field");
    error.statusCode = 400;
    return cb(error);
  }

  if (!allowedTypes.has(file.mimetype)) {
    const error = new Error(
      file.fieldname === "resume"
        ? "Only PDF, DOC, and DOCX files are allowed for resumes"
        : "Only JPG, PNG, and WEBP images are allowed for profile pictures"
    );
    error.statusCode = 400;
    return cb(error);
  }

  cb(null, true);
};


let upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;
