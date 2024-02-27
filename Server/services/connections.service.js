const { connections_model } = require('../models');

exports.get_connections_for_user = async (user_id) => {
    return await connections_model.find({ users: { $in: [user_id] }, status: "accepted" }, null, { populate: { path: 'requested_by', select: 'username image heading' } });
}

exports.create_connection = async (req) => {
    const { requested_user_id, user } = req.body;
    const uuid = requested_user_id < user.user_id ? `${requested_user_id}-${user.user_id}` : `${user.user_id}-${requested_user_id}`;
    console.log('requested_user_id, user: ', requested_user_id, user.user_id);
    if (!requested_user_id || !user) throw Object.assign(new Error('Invalid/Bad Request'), { status: 400 });
    const connection = await connections_model.findOneAndUpdate({ uuid, status: { $in: ["rejected", "deleted"], $nin: ['pending', 'accepted'] },updatedAt:{$lte: new Date()} }, {
        users: [requested_user_id, user.user_id],
        requested_by: user.user_id,
        status: "pending",
    }, { new: true, upsert: true });
    return await connection.save();
}

exports.set_connections = async (req) => {
    const { connection_id } = req.params;
    const { requested_by, status, user } = req.body;
    if (requested_by === user.user_id) throw Object.assign(new Error('Forbidden'), { status: 403 })
    if (!status || !connection_id || !requested_by) throw Object.assign(new Error('Invalid/Bad Request'), { status: 400 });
    const uuid = requested_by < user.user_id ? `${requested_by}-${user.user_id}` : `${user.user_id}-${requested_by}`;
    console.log('uuid: ', uuid);
    return await connections_model.findOneAndUpdate(
        {
            requested_by,
            status: "pending",
            users: { $in: [user.user_id] },
            uuid
        },
        { status },
        { new: true, upsert: false }
    );
}
exports.get_pending_connections = async (user_id) => {
    return await connections_model.find({ users: { $in: [user_id] }, status: "pending" }, null, { populate: { path: 'users', select: 'username image heading' } });
}
