const {auth_service} = require('../services/index');

exports.signup = async (req, res) => {
    try {
        const result = await auth_service.signup(req);
        res.status(result.code).send(result);
    } catch (error) {
        res.status(500).send({code:500,m:"Error in creating user"});
    }
}

exports.login = async (req, res) => {
    try {
        const result = await auth_service.login(req);
        res.status(result.code).send(result);
    } catch (error) {
        res.status(500).send({code:500,m:"Error in creating user"});
    }
}