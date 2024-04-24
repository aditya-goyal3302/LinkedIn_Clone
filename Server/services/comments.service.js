const { comments_model } = require("../models");
//comments_routes
exports.view_comments = async (req, res) => {
  const response = await comments_model
    .find({ post_id: req.params.post_id })
    .populate("user_id", "image first_name last_name headline")
    .exec();
  return response;
};
exports.create_comments = async (req) => {
  const { content } = req.body;
  const comment = await comments_model({
    content,
    user_id: req.body.user.user_id,
    post_id: req.params.post_id,
  });
  await comment.save()
  const resp = await comments_model.findOne({ _id: comment._id },{}, {
    populate: { path: "user_id", select: "headline image first_name last_name" },
  })
  console.log('resp: ', resp);
  return resp
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
  const { comment_id } = req.params;
  const response = await comments_model
    .find({ comment_id: comment_id },{}, {
      populate: { path: "user_id", select: "headline image first_name last_name" },
    })
  return response;
};
exports.create_sub_comments = async (req) => {
  const { content } = req.body;
  console.log('content: ', content);
  const { comment_id } = req.params;
  // console.log('comment_id: ', comment_id);
  const { user_id } = req.body.user;
  const comment = await comments_model.create(
    {
      content: content,
      user_id,
      comment_id: comment_id,
    }
  );
  // return comment;
  const resp = await comments_model.findOne({ _id: comment._id },{}, {
    populate: { path: "user_id", select: "headline image first_name last_name" },
  })
  console.log('resp: ', resp);
  return resp
};
//sub-comments_routes
