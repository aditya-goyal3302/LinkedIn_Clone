const { reactions_model } = require("../models");

exports.set_reactions = async (req) => {
  const { reaction } = req.body;
  const { post_id } = req.params;
  const { user_id } = req.user;
  return reactions_model.create({
    reaction,
    post_id,
    user_id,
  });
};
exports.get_reactions = async (req) => {
  const { post_id } = req.params;
  return reactions_model.find({ post_id });
};
exports.get_reactions_of_same_user = async (req) => {
  const { post_id } = req.params;
  return reactions_model.find({ post_id, user_id: req.user.user_id });
};
exports.update_reactions = async (req) => {
  const { post_id } = req.params;
  const { reaction } = req.body;
  return reactions_model
    .find({ post_id, user_id: req.user.user_id })
    .updateOne({ reaction });
};
exports.delete_reactions = async (req) => {
  const { post_id } = req.params;
  console.log("delete_reactions", post_id, req.user.user_id);
  return reactions_model.deleteOne({
    post_id: post_id,
    user_id: req.user.user_id,
  });
};
