const { reactions_model } = require("../models");
//posts reactions
exports.get_reactions = async (req) => {
  const { post_id } = req.params;
  return reactions_model.find({ post_id },null,{populate: { path: "user_id", select: "username image" },});
};

exports.create_update_post_reactions = async (req) => {
  const { post_id } = req.params;
  const { reaction } = req.body;
  const { user_id } = req.body.user;
  const updates ={ 
    reaction: reaction || null,
    is_deleted: reaction? false : true,
  }
  return reactions_model.findOneAndUpdate({ post_id, user_id }, updates, { upsert: true, new: true, populate: { path: "user_id", select: "username image" }, });
};

exports.get_comment_reactions = async (req) => {
  const { comment_id } = req.params;
  return reactions_model.find({ comment_id },null,{populate: { path: "user_id", select: "username image" },});
};

exports.create_update_comment_reactions = async (req) => {
  const { comment_id } = req.params;
  const { reaction } = req.body;
  const { user_id } = req.body.user;
  const updates ={ 
    reaction: reaction || null,
    is_deleted: reaction ? false : true,
  }
  return reactions_model.findOneAndUpdate({ comment_id, user_id }, updates, { upsert: true, new: true, populate: { path: "user_id", select: "username image" }, });
};
