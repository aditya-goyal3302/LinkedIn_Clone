const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required:true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  experience: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    required: false,
    default: [],
  },
  education: {
    type: [
      {
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        fieldOfStudy: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    required: false,
    default: [],
  },
  skills: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    required: false,
    default: [],
  },
  connections:{
    type: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    required:false,
    default:[],
  },
});

module.exports = mongoose.model("User", userSchema);
