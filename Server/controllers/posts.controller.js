const { post_service } = require("../services");

exports.show_posts = async (req, res) => {
  try {
    const response = await post_service.show_posts();
    if (response) {
      return res.status(200).send(response);
    } else throw new Error("Error_in_fetching_post");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
exports.create_posts = async (req, res) => {
  try {
    const response = await post_service.create_posts(req);
    res.status(201).send(response);
  } catch (error) {
    console.log("Creating_post_error: ", error);
    res.status(500).send(error);
  }
};
exports.Update_posts = async (req, res) => {
  try {
    const response = await post_service.Update_posts(req);
    // console.log("response: ", response);
    res.status(200).send(response);
  } catch (err) {
    console.log("Error_in_updating_post: ",err);
    res.status(500).send(err);
  }
};
exports.show_posts_on_scroll = async (req, res) => {
  try {
    const response = await post_service.show_posts_on_scroll(req);
    return res.send(response);
  } catch (err) {
    console.log("Error_in_fetching_post_on_scroll: ", err);
    throw new Error(err);
  }
};
exports.delete_post = async (req, res) => {
  try {
    const response = await post_service.delete_post(req);
    if(response.deletedCount === 0) throw new Error("Error_in_deleting_post");
    else res.status(200).send(response);
  } catch (err) {
    console.log("Error_in_deleting_post:", err);
    res.status(500).send(err);
  }
};
