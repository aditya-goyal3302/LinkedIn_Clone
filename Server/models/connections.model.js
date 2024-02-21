const mongoose = require("mongoose");

const connection_schema = new mongoose.Schema(
  {
    users: {
      type: [
        {
          type: String,
          ref: "user",
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("connections", connection_schema);
