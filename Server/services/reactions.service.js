const { reactions_model } = require("../models");

exports.set_reactions = async (req) => {
  const { reaction } = req.body;
  const { post_id } = req.params;
  const { user_id } = req.user;
  const resp = reactions_model.create({
    reaction,
    post_id,
    user_id,
  });
  return resp;
};
exports.get_reactions = async (req) => {
  const { post_id } = req.params;
  const resp = reactions_model.find({ post_id });
  return resp;
};
exports.get_reactions_of_same_user = async (req) => {
  const { post_id } = req.params;
  const resp = reactions_model.find({ post_id, user_id: req.user.user_id });
  return resp;
};
exports.update_reactions = async (req) => {
  const { post_id } = req.params;
  const { reaction } = req.body;
  const resp = reactions_model
    .find({ post_id, user_id: req.user.user_id })
    .updateOne({ reaction });
  return resp;
};
exports.delete_reactions = async (req) => {
  const { post_id } = req.params;
  console.log("delete_reactions", post_id, req.user.user_id);
  const resp = reactions_model.deleteOne({
    post_id: post_id,
    user_id: req.user.user_id,
  });
  return resp;
};
