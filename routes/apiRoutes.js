let express = require("express");
let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models");
let router = express.Router();

router.get("/scrape", function(req, res) {
  axios.get("http://www.echojs.com/").then(function(response) {
    let $ = cheerio.load(response.data);
    let result = {};
    $("article h2").each(function(i, element) {
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      result.saved = false;
      result.summary = "";
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
});

module.exports = router;
