const mongoose = require("mongoose");

const connection_schema = new mongoose.Schema(
  {
    sent_to: {
      type: String,
      ref: "user",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: true,
    },
    requested_by: {
      type: String,
      ref: "user",
      required: true,
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {timestamps:true,paranoid:true}
);

module.exports = mongoose.model("connections", connection_schema);
