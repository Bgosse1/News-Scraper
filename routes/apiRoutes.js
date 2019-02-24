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
      console.log(result);
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

router.put("/save/:id", function(req, res) {
  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.put("/remove/:id", function(req, res) {
  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("comments")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.post("/comment/:id", function(req, res) {
  console.log(req.params.id);
  db.Comment.create(req.body)
    .then(function(dbComment) {
      console.log(dbComment);
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: dbComment._id } },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
