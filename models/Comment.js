let mongoose = require("mongoose");

let Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: String,
  body: String
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
