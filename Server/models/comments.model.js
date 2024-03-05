const mongooes = require("mongoose");

const comment_schema = new mongooes.Schema({
  content: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    ref: "user",
  },
  post_id: {
    type: String,
    ref: "posts",
  },
  comment_id: {
    type: String,
    ref: "comments",
  },
},{timestamps:true,paranoid:true});

module.exports = mongooes.model("comments", comment_schema);
