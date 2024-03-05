const { post_model } = require("../models/index");
const { post } = require("../routes/posts.routes");

exports.show_posts = () => {
  return post_model.find(null, null, {
    sort: { createdAt: -1 },
    populate: { path: "user_id", select: "username image first_name last_name" },
  });
};

exports.create_posts = async (req) => {
  const { title, content, link } = req.body;
  const post = new post_model({
    title,
    content,
    link,
    user_id: req.body.user.user_id,
  });
  post.populate({ path: "user_id", select: "username image first_name last_name"})
  return post.save();
};

exports.update_posts = async (req) => {
  const { title, content, link, post_id } = req.body;
  const data = {};
  if (title) data.title = title;
  if (content) data.content = content;
  if (link) data.link = link;
  return post_model.updateOne({ _id: post_id }, data);
};

exports.show_posts_on_scroll = async (req) => {
  const time = req.params.time;
  // console.log('time: ',  Date.now());
  return post_model
    .find({ createdAt: { $lt: time } }, null, {
      sort: { createdAt: -1 },
      populate: { path: "user_id", select: "username image" },
      limit: 2,
    });
};

exports.delete_post = async (req) => {
  const { post_id } = req.body;
  return post_model.deleteOne({ _id: post_id, user_id: req.body.user.user_id });
  // return post_model.deleteOne({ _id: post_id, user_id: req.body.user.user_id });
};
