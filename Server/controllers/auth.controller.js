const {auth_service} = require('../services/index');

exports.signup = async (req, res) => {
    try {
        const result = await auth_service.signup(req);
        
         return res.status(201).send(result);
    } catch (error) {
        console.log('error_in_signup: ', error);
        res.status(error.code || 500).send(error.message||error);
    }
}

exports.login = async (req, res) => {
    try {
        const result = await auth_service.login(req);
        res.status(200).send(result);
    } catch (error) {
        console.log('error_in_login: ', error);
        res.status(error.code||500).send(error.message || error);
    }
}