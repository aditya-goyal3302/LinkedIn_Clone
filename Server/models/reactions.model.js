const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const reaction_schema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reaction: {
        type: String,
        enum:['like','love','haha','wow','sad','angry'],
        required: true
    },
    time_stamp: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('reactions', reaction_schema);;