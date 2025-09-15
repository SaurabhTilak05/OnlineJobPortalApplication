const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/route.js");
const path = require("path"); 

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


module.exports = app;
