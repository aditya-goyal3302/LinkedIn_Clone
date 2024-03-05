const { post_service } = require("../services");

exports.show_posts = async (req, res) => {
  try {
    const response = await post_service.show_posts();
    if (response) {
      res.status(200).send(response);
    } else res.status(404).send("No_posts_found");
  } catch (err) {
    console.log("error_in_fetching_post", err);
    res.status(500).send(err);
  }
};

exports.create_posts = async (req, res) => {
  try {
    req.body.link = req.files.link?.map((file) => file.path);
    const { content, title, link } = req.body;
    if (!content || !title || !link) return res.status(400).send("Invalid_input");
    const response = await post_service.create_posts(req);
    if (!response) return res.status(404).send("Error_in_creating_post");
    res.status(201).send(response);
  } catch (error) {
    console.log("Creating_post_error: ", error);
    res.status(500).send(error);
  }
};

exports.update_posts = async (req, res) => {
  try {
    const { content, title, link } = req.body;
    if (!content || !title || !link) return res.status(400).send("Invalid_input");
    const response = await post_service.update_posts(req);
    if (response.nModified === 0) return res.status(404).send("Post_not_found");
    else res.status(200).send(response);
  } catch (err) {
    console.log("Error_in_updating_post: ", err);
    console.log("Error_in_updating_post: ", err);
    res.status(500).send(err);
  }
};

exports.show_posts_on_scroll = async (req, res) => {
  try {
    const { time } = req.params;
    // console.log('time: ', time);
    if (!time) return res.status(400).send("Invalid_input");
    const response = await post_service.show_posts_on_scroll(req);
    // console.log('response: ', response);
    if (response.length === 0) return  res.status(404).send("No_more_posts");
    else res.status(200).send(response);
  } catch (err) {
    console.log("Error_in_fetching_post_on_scroll: ", err);
    res.status(500).send(err);
  }
};

exports.delete_post = async (req, res) => {
  try {
    const { post_id } = req.params;
    if (!post_id) return res.status(400).send("Invalid_input");
    const response = await post_service.delete_post(req);
    if (response.deletedCount === 0) return res.status(404).send("Post_not_found");
    else res.status(200).send(response);
  } catch (err) {
    console.log("Error_in_deleting_post:", err);
    res.status(500).send(err);
  }
};
