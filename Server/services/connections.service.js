const { connections_model, user_model } = require('../models');
const connectionsModel = require('../models/connections.model');

exports.get_connections_for_user = async (user_id) => {

    return await connections_model.find({ $or:[{sent_to:user_id},{requested_by:user_id}], status: "accepted" }, null, { populate: { path: 'requested_by sent_to', select: '_id username first_name last_name image headline' } });
}

exports.create_connection = async (req) => {
    const { requested_user_id, user } = req.body;
    const uuid = requested_user_id < user.user_id ? `${requested_user_id}-${user.user_id}` : `${user.user_id}-${requested_user_id}`;
    // console.log('uuid: ', uuid);
    console.log('requested_user_id, user: ', requested_user_id, user.user_id);
    if (!requested_user_id || !user) throw Object.assign(new Error('Invalid/Bad Request'), { status: 400 });
    if(requested_user_id === user.user_id) throw Object.assign(new Error('Forbidden you can not send request to yourself'), { status: 403 });
    const connection = await connections_model.findOneAndUpdate({ uuid, status: { $in: ["rejected", "deleted", "withdraw"], $nin: ['pending', 'accepted'] },updatedAt:{$lte: new Date()} }, {
        sent_to: requested_user_id,
        requested_by: user.user_id,
        status: "pending",
    }, { new: true, upsert: true });
    return await connection.save();
}

exports.set_connections = async (req) => {
    const { connection_id } = req.params;
    const { requested_by, status, user } = req.body;
    if (requested_by === user.user_id) throw Object.assign(new Error('Forbidden you can not set this request status'), { status: 403 })
    if (!status || !connection_id || !requested_by) throw Object.assign(new Error('Invalid/Bad Request'), { status: 400 });
    const uuid = requested_by < user.user_id ? `${requested_by}-${user.user_id}` : `${user.user_id}-${requested_by}`;
    // console.log('uuid: ', uuid);
    return await connections_model.findOneAndUpdate(
        {
            requested_by,
            status: "pending",
            sent_to: user.user_id,
            uuid
        },
        { status },
        { new: true, upsert: false }
    );
}
exports.get_pending_connections = async (user_id) => {
    return await connections_model.find({ sent_to:user_id, status: "pending" }, null, { populate: {  path: 'requested_by', select: '_id first_name last_name image headline'} });
}
exports.get_suggestions_for_user = async (user_id) => {
    const response = await connections_model.find({ $or:[{sent_to:user_id},{requested_by:user_id}]})
    const suggestions = response.map((connection)=>{
        return connection.sent_to === user_id ? connection.requested_by : connection.sent_to
    })
    const resp = await user_model.find({ _id: { $nin: [...suggestions, user_id] } },null,{limit:12 ,select: '_id username first_name last_name image headline' });
    return resp;
}