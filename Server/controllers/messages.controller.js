const { messages_service } = require("../services");
exports.get_chat_by_room_id = async (req, res) => {
    // const room_id = req.params.room_id;
    try {
        const response = await messages_service.get_chat_by_room_id(room_id);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error });
    }
}
