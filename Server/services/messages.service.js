const { messages_model } = require('../models');

exports.get_chat_by_room_id = async (req, res) => {
    const room_id = req.params.room_id;
    // console.log('room_id: ', req.params);
    return await messages_model.find({ chat_room:room_id });
    
}

exports.send_message = async (data) => {
    const { chat_room, sender, message } = data;
    console.log('chat_room, sender, message: ', chat_room, sender, message);
    const newMessage = await messages_model.create({
        chat_room,
        sender,
        message
    });
    console.log('newMessage: ', newMessage);
    return newMessage;  
}