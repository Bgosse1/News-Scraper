let express = require("express");
let db = require("../models");

let router = express.Router();

router.get("/", (req, res) => {
  db.Article.find({saved: false})
    .then(function(dbArticle) {
      var hbsObject = {
        Article: dbArticle
      };
      res.render("index", hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get("/saved", (req, res) => {
  db.Article.find({ saved: true })
    .then(function(dbArticle) {
      var hbsObject = {
        Article: dbArticle
      };
      res.render("index", hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
