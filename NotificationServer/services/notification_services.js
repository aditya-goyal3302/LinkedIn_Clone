const { notification_model } = require("../models");

exports.send_notification = async (req) => {
  console.log('req.body: ', req.body );
  const { send_to, send_by, content } = req.body;
  const response = new notification_model({
    send_to, send_by, content
  })
  return await response.save()
};

exports.get_notifications = async req =>{
  const { user_id } = req.body.user
  console.log('user_id: ', user_id);
  const response = await notification_model.find({send_to: user_id},null,{sort:{createdAt:-1}})
  return response
}