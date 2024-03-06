const mongoose = require('mongoose');
const { Schema } = mongoose;

const message_schema = new Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        ref: "user",
        required: true,
    },
    chat_room: {
        type: String,
        ref: "chat_room",
        required: true,
    },
},{timestamps:true,paranoid:true});

module.exports = mongoose.model("message", message_schema);