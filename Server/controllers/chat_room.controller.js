const { chat_room_service } = require("../services/index");
exports.get_chats_for_user = async (req, res) => {
    try {
        const response = await chat_room_service.get_chats_for_user(req, res);
        res.status(200).send(response);
    } catch (error) {
        console.log('error: ', error);  
        res.status(500).send({ error });
    }
}

exports.create_chat_room = async (req, res) => {
    try {
        const response = await chat_room_service.create_chat_room(req, res);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error });
    }
}