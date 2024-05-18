const { chat_room_model } = require('../models');

exports.get_chats_for_user = async (req, res) => {
    const user_id = req.body.user.user_id;
    const response = await chat_room_model.find({users:{$in:[user_id]}}, null, { populate: { path: 'users', select: '_id headline first_name last_name image username'}});
    return response;
}
exports.create_chat_room = async (req, res) => {
    const { user, requested_user } = req.body;
    const uuid = user.user_id < requested_user ? user.user_id + requested_user : requested_user + user.user_id;
    const response = await chat_room_model.findOneAndUpdate({ uuid }, { users: [user.user_id, requested_user] }, { upsert: true, new: true, populate:{ path: 'users', select: 'first_name last_name image username' } });
   
    return response;
    
}