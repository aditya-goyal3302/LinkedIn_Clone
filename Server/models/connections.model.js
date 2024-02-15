const mongoose = require("mongoose");

const connection_schema = new mongoose.Schema(
  {
    users: {
      type: [
        {
          type: String,
          ref: "User",
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("connection", connection_schema);
