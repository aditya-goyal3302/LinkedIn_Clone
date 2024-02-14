const { comments_model } = require("../models");
//comments_routes
exports.view_comments = async (req, res) => {
  const response = await comments_model
    .find({ post_id: req.params.post_id })
    .populate("user_id", "username image")
    .exec();
  return response;
};
exports.create_comments = async (req) => {
  const { content } = req.body;
  const comment = new comments_model({
    content,
    user_id: req.body.user.user_id,
    post_id: req.params.post_id,
  });
  return comment.save();
};
exports.delete_comments = async (req) => {
  const response = comments_model.deleteOne({
    _id: req.params.comment_id,
    user_id: req.body.user.user_id,
  });
  return response;
};
exports.update_comments = async (req) => {
  return comments_model.updateOne(
    { _id: req.params.comment_id, user_id: req.body.user.user_id },
    { content: req.body.content }
  );
};
//comments_routes
//sub-comments_routes
exports.view_sub_comments = async (req, res) => {
  const response = await comments_model
    .find({ comment_id: req.params.comment_id })
    .populate("user_id", "username image")
    .exec();
  return response;
};
exports.create_sub_comments = async (req) => {
  const { content } = req.body;
  const comment = new comments_model({
    content,
    user_id: req.body.user.user_id,
    comment_id: req.params.comment_id,
  });
  return comment.save();
};
//sub-comments_routes