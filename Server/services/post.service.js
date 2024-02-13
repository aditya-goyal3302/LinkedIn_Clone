const { post_model } = require("../models/index");

exports.get_posts = async () => {
  try {
    const data = await post_model.find();
    return data;
  } catch (err) {
    console.log(err);
    return { code: 500, m: "Internal Server Error" };
  }
  //   console.log(" user  ",req.user)
};

exports.post_posts = async (req) => {
  try {
    const { title, content, link } = req.body;
    // console.log(" user  ",req.user)
    const post = new post_model({
      title,
      content,
      link,
      user_id: req.user.user_id,
    });
    const response = post.save();

    if (response) {
      return response;
    } else {
      return { code: 500, m: "Internal Server Error" };
    }
  } catch (err) {
    console.log(err);
    return { code: 500, m: "Internal Server Error" };
  }
};

exports.Update_posts = async (req) => {
  try {
    const { title, content, link, post_id } = req.body;
    const data = {};
    if (title) data.title = title;
    if (content) data.content = content;
    if (link) data.link = link;
    const response = await post_model.updateOne(
      { _id: post_id, user_id: req.user.user_id },
      data
    );
    if (response) {
      return { code: 200, m: "Post Updated" };
    } else {
      return { code: 500, m: "Internal Server Error" };
    }
  } catch (err) {
    console.log(err);
    return { code: 500, m: "Internal Server Error" };
  }
};
