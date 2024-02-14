const {auth_service} = require('../services/index');

exports.signup = async (req, res) => {
    try {
        if(!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.email || !req.body.password){
            throw Object.assign(new Error("Invalid_input"), { code: 400 });
        }
        const result = await auth_service.signup(req);
         return res.status(201).send(result);
    } catch (error) {
        console.log('error_in_signup: ', error);
        res.status(error.code || 500).send(error.message||error);
    }
}

exports.login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            throw Object.assign(new Error("Invalid_email_or_password"), { code: 400 });
        }
        const result = await auth_service.login(req);
        res.status(200).send(result);
    } catch (error) {
        console.log('error_in_login: ', error);
        res.status(error.code||500).send(error.message || error);
    }
}