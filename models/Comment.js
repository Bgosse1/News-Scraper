let mongoose = require("mongoose");

let Schema = mongoose.Schema;

var CommentSchema = new Schema({
    text: String
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
