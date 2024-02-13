const mongooes = require('mongoose');

const comment_schema = new mongooes.Schema({
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        ref: 'user'
    },
    post_id: {
        type: String,
        ref: 'post'
    }
}, {timestamps: true});