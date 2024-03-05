const mongoose = require('mongoose');
const { Schema } = mongoose;

const chat_room_schema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    users: [
        {
            type: String,
            ref: "user",
        },
    ],
    // last_message: {
    //     type: Schema.Types.ObjectId,
    //     ref: "message",
    // },
},{timestamps:true,paranoid:true});

module.exports = mongoose.model("chat_room", chat_room_schema);

