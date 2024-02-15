const { reactions_model } = require("../models");
//posts reactions
exports.get_reactions = async (req) => {
  const { post_id } = req.params;
  console.log('post_id: ', post_id);
  return reactions_model.find({ post_id });
};
exports.set_reactions = async (req) => {
  const { reaction } = req.body;
  const { post_id } = req.params;
  const { user_id } = req.body.user;
  return reactions_model.create({
    reaction,
    post_id,
    user_id,
  });
};
exports.get_reactions_of_same_user = async (req) => {
  const { post_id } = req.params;
  return reactions_model.find({ post_id, user_id: req.body.user.user_id });
};
exports.update_reactions = async (req) => {
  const { post_id } = req.params;
  const { reaction } = req.body;
  return reactions_model
    .find({ post_id, user_id: req.body.user.user_id })
    .updateOne({ reaction });
};
exports.delete_reactions = async (req) => {
  const { post_id } = req.params;
  return reactions_model.deleteOne({
    post_id: post_id,
    user_id: req.body.user.user_id,
  });
};
//comments reactions
exports.get_comment_reactions = async (req) => {
  const { comment_id } = req.params;
  console.log('comment_id: ', comment_id); 
  return reactions_model.find({ comment_id });
};
exports.set_comment_reactions = async (req) => {
  const { reaction } = req.body;
  const { comment_id } = req.params;
  const { user_id } = req.body.user;
  return reactions_model.create({
    reaction,
    comment_id,
    user_id,
  });
};
exports.get_comment_reactions_of_same_user = async (req) => {
  const { comment_id } = req.params;
  return reactions_model.find({ comment_id, user_id: req.body.user.user_id });
};
exports.update_comment_reactions = async (req) => {
  const { comment_id } = req.params;
  const { reaction } = req.body;
  return reactions_model
    .find({ comment_id, user_id: req.body.user.user_id })
    .updateOne({ reaction });
};
exports.delete_comment_reactions = async (req) => {
  const { comment_id } = req.params;
  return reactions_model.deleteOne({
    comment_id: comment_id,
    user_id: req.body.user.user_id,
  });
};
