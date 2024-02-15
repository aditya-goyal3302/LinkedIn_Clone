const mongooes = require("mongoose");

const comment_schema = new mongooes.Schema({
  content: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    ref: "User",
  },
  post_id: {
    type: String,
    ref: "LinkedPost",
  },
  comment_id: {
    type: String,
    ref: "comment",
  },
  time_stamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongooes.model("comment", comment_schema);
