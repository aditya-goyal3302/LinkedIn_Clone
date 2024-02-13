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
    user_id: req.user.user_id,
  });
  const response = post.save();
  if (response) {
    return response;
  } else throw new Error("Error in creating post");
};

exports.Update_posts = async (req) => {
  const { title, content, link, post_id } = req.body;
  const data = {};
  if (title) data.title = title;
  if (content) data.content = content;
  if (link) data.link = link;
  return post_model.updateOne({ _id: post_id }, data);
};
