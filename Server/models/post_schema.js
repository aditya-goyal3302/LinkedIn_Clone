const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const linkedPostSchema = new mongoose.Schema({
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
  userId:{
    type: ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('LinkedPost', linkedPostSchema);;
