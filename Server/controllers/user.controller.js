const User = require('../models/user.model');
const { user_service } = require('../services');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(null, { password: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.set_profile_pic = async (req,res)=>{
    try {
        const resp = await user_service.set_profile_pic(req)
        res.status(200).send(resp)
    } catch (error) {
        console.log('error_in_profile_pic: ', error);
        res.status(500).send(error)
    }
}
exports.set_cover_pic = async (req,res)=>{
    try {
        const resp = await user_service.set_cover_pic(req)
        res.status(200).send(resp)
    } catch (error) {
        console.log('error_in_profile_pic: ', error);
        res.status(500).send(error)
    }
}