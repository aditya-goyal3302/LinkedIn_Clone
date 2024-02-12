const { Post } = require("../models/index");

exports.getposts = async (req, res, next) => {
  const data = await Post.find();
  console.log(" user  ",req.user)
  return res.status(200).send(data);
};

exports.postposts = async (req, res, next) => {
  const { title, body } = req.body;
  const post = new Post({
    title,
    content:body,
    link,
    // userId: req.session.userId,  
  });
  const resp = post.save();
  res.status(201).send(resp);
};
