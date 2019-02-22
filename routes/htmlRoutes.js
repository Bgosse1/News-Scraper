let express = require("express");
let db = require("../models");

let router = express.Router();

router.get("/", (req, res) => {
    console.log("here i am");
  db.Article.find({})
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

