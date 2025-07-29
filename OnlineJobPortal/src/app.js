const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/route.js");
require("dotenv").config();

let app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/", router);


module.exports = app;
