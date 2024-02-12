const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const linked_post_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  link: {
    type: String,
  },
  user_Id:{
    type: ObjectId,
    ref: 'User',
  },
  time_stamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('LinkedPost', linked_post_schema);;
