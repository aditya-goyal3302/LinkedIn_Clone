const { connections_service } = require("../services");

exports.get_connections_for_user = async (req, res) => {
    try {
        const user_id = req.query.user_id || req.body.user.user_id;
        const response = await connections_service.get_connections_for_user(user_id);
        if (response.length === 0) return res.status(404).send({ error: "No connections found" });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error: error });
    }
}
exports.create_connection = async (req, res) => {
    try {
        const response = await connections_service.create_connection(req);
        console.log('response: ', response);
        res.status(201).send(response);
    } catch (error) {
        console.log('error_in_create_connection: ', error);
        if (error.status === 403) return res.status(403).send({ message: "Forbidden you can not create this request" });
        if (error.code === 11000) return res.status(409).send({ error: "Connection request already exists" });
        res.status(500).send({ error: error });
    }
}

exports.set_connections = async (req, res) => {
    try {
        const response = await connections_service.set_connections(req);
        console.log('response: ', response);
        if (response)res.status(200).send(response);
        else res.status(404).send({ error: "No pending Connection Request found" });
    } catch (error) {
        console.log('error: ', error);
        if(error.status === 403) return res.status(403).send({ message: "Forbidden you can not set/change this request status" });
        res.status(500).send({ error: error });
    }
}

exports.get_pending_connections = async (req, res) => {
    try {
        const { user_id } = req.body.user;
        const response = await connections_service.get_pending_connections(user_id);
        if (response.length === 0) return res.status(404).send({ error: "No pending Connection Request found" });
        res.status(200).send(response);
    } catch (error) {
        // console.log('error: ', error);
        res.status(500).send({ error: error });
    }

}