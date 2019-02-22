let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
