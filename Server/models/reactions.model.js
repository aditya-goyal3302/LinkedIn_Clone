const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const reaction_schema = new Schema({
  post_id: {
    type: String,
  },
  comment_id: {
    type: String,
  },
  user_id: {
    type: String,
    ref: "user",
    required: true,
  },
  reaction: {
    type: String,
    enum: ["like", "love", "haha", "wow", "sad", "angry"],
  },
  time_stamp: {
    type: Date,
    default: Date.now(),
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("reactions", reaction_schema);
