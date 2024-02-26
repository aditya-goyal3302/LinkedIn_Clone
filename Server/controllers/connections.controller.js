const { connections_service } = require("../services");

exports.get_connections_for_user = async (req, res) => {
    try {
        const user_id = req.query.user_id || req.body.user._id;
        const response = await connections_service.get_connections_for_user(user_id);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
exports.create_connection = async (req, res) => {
    try {
        const response = await connections_service.create_connection(req);
        console.log('response: ', response);
        res.status(201).send(response);
    } catch (error) {
        if (error.code === 11000) return res.status(409).send({ error: "Connection request already exists" });
        res.status(500).send({ error: error.message });
    }
}

exports.set_connections = async (req, res) => {
    try {
        const response = await connections_service.set_connections(req);
        console.log('response: ', response);
        if (response)res.status(200).send(response);
        else res.status(404).send({ error: "No pending Connection Request found" });
    } catch (error) {
        console.log('error: ', error.code, error.message);
        
        res.status(500).send({ error: error.message });
    }
}

exports.get_pending_connections = async (req, res) => {

}