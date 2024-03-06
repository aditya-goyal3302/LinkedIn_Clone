const { messages_model } = require('../models');

exports.get_chat_by_room_id = async (req, res) => {
    const room_id = req.params.room_id;
    // console.log('room_id: ', req.params);
    return await messages_model.find({ chat_room:room_id });
    
}

exports.send_message = async (req, res) => {
    const { chat_room, sender, message } = req.body;
    const newMessage = new messages_model({
        chat_room,
        sender,
        message
    });
    return await newMessage.save();
}