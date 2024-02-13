const { comments_model, user_model } = require("../models");
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
    user_id: req.user.user_id,
    post_id: req.params.post_id,
  });
  const response = await comment.save();
  if (response) {
    return { code: 200, message: "Comment Posted" };
  } else throw new Error("Error in creating post");
};
exports.delete_comments = async (req) => {
    // const{user_id} = req.body
    // if(user_id !== req.user.user_id) throw new Error("You are not authorized to delete this comment")
    const response = comments_model.deleteOne({
        _id: req.params.comment_id,
        user_id: req.user.user_id,
    });
    if (response.deletedCount === 0) throw new Error("No comment found or anauthorized user");
    else return response;
};
exports.update_comments = async (req) => {
    // const {user_id,content} = req.body
    // if(user_id !== req.user.user_id) throw new Error("You are not authorized to update this comment")
    const response = await comments_model.updateOne(
        { _id: req.params.comment_id, user_id: req.user.user_id },
        { content: req.body.content }
    );
    if (response.nModified === 0) throw new Error("No comment found or anauthorized user");
    else return response;
};
//comments_routes
//sub-comments_routes
exports.view_sub_comments = async (req, res) => {
const response = await comments_model
    .find({ post_id: req.params.post_id })
    .populate("user_id", "username image")
    .exec();
return response;
};
exports.create_sub_comments = async (req) => {
    const { content } = req.body;
    const comment = new comments_model({
        content,
        user_id: req.user.user_id,
        comment_id: req.params.comment_id,
    });
    const response = await comment.save();
    if (response) {
        return { code: 200, message: "sub_Comment Posted" };
    } else throw new Error("Error in creating sub_comment");
};

