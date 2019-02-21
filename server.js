const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

let db = require("./models");

let PORT = process.env.PORT || 3000;

let app = express();

//Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var htmlRoutes = require("./routes/htmlRoutes");
var apiRoutes = require("./routes/apiRoutes");
app.use(htmlRoutes, apiRoutes);
// app.use(apiRoutes);

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });