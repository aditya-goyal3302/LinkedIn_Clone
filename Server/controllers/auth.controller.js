const {auth_service} = require('../services/index');

exports.signup = async (req, res) => {
    try {
        const result = await auth_service.signup(req);
        if (result.code === 401) {
            return res.status(401).send(result.message);
        }
        else return res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.login = async (req, res) => {
    try {
        const result = await auth_service.login(req);
        res.status(result.code||200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}