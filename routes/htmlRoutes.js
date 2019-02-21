let express = require("express");

let router = express.Router();

router.get("/", (req, res) => {
    let objectTest = {
        cats: "hello"
    };
    res.render("index", objectTest);
});

module.exports = router;