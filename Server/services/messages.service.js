const { messages_model } = require('../models');

exports.get_chat_by_room_id = async (req, res) => {
    const room_id = req.params.room_id;
    return await messages_model.find({ chat_room:room_id });
    
}

exports.send_message = async (data) => {
    const { chat_room, sender, message } = data;
    const newMessage = await messages_model.create({
        chat_room,
        sender,
        message
    });
    return newMessage;  
}