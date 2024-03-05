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
  is_deleted: {
    type: Boolean,
    default: false,
  },
},{timestamps:true,paranoid:true});

reaction_schema.pre('find', function(next) {
  this.where({ is_deleted: false });
  next();
});

reaction_schema.pre('findOne', function(next) {
  this.where({ is_deleted: false });
});

module.exports = mongoose.model("reactions", reaction_schema);
