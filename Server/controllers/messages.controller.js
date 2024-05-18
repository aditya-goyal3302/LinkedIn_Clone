const { messages_service } = require("../services");
exports.get_chat_by_room_id = async (req, res) => {
    try {
        const response = await messages_service.get_chat_by_room_id(req);
        res.status(200).send(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ error });
    }
}
