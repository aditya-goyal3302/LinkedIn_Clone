const { post_model } = require("../models/index");
const { post } = require("../routes/posts.routes");

exports.show_posts = () => {
  return post_model
    .find()
    .sort({ time_stamp: -1 })
    .populate("user_id", "username image")
    .exec();
};

exports.create_posts = (req) => {
  const { title, content, link } = req.body;
  const post = new post_model({
    title,
    content,
    link,
    user_id: req.body.user.user_id,
  });
  return post.save();
};

exports.Update_posts = async (req) => {
  const { title, content, link, post_id } = req.body;
  const data = {};
  if (title) data.title = title;
  if (content) data.content = content;
  if (link) data.link = link;
  return post_model.updateOne({ _id: post_id }, data);
};
exports.show_posts_on_scroll = async (req) => {
  const time = req.params.time;
  return post_model
    .find({ time_stamp: { $lt: time } })
    .sort({ time_stamp: -1 })
    .limit(10)
    .populate("user_id", "username image")
    .exec();
};
exports.delete_post = async (req) => {
  const { post_id } = req.body;
  return post_model.deleteOne({ _id: post_id, user_id: req.body.user.user_id });
};
