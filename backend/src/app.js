const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/route.js");
const path = require("path"); 
const multer = require("multer");

require("dotenv").config();
let app = express();

// this is cors library to connect the 
// node to react

let cors = require("cors");
app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/resumes", express.static(path.join(__dirname, "../public/resumes")));

app.set("view engine", "ejs");
app.use("/", router);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File size must be 5MB or less" });
    }

    return res.status(400).json({ message: err.message });
  }

  if (err) {
    return res.status(err.statusCode || 500).json({
      message: err.message || "Internal server error",
    });
  }

  next();
});

module.exports = app;
