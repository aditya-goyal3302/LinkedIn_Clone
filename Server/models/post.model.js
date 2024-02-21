const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const linked_post_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  user_id: {
    type: String,
    ref: "user",
  },
  time_stamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("posts", linked_post_schema);
