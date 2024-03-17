const { mongoose } = require("mongoose");

const { Schema } = mongoose;

const notification_schema = new Schema({
  send_by: {
    type: String,
    required: true,
  },
  send_to: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
},{timestamps:true,paranoid:true});

module.exports = mongoose.model("notification_schema",notification_schema);
