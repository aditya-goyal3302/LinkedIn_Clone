const { comments_service } = require("../services");

exports.create_comment = async (req, res) => {
  try {
    const { content } = req.body;
    console.log('req.body: ', req.body);
    if (!content) res.status(400).send("Invalid_input");
    const response = await comments_service.create_comments(req);
    if (!response) {
      res.status(404).send("Error_in_creating_comment");
    }
    res.status(201).send(response);
  } catch (error) {
    console.log("error_in_creating_comment: ", error);
    res.status(500).send(error);
  }
};

exports.view_comment = async (req, res) => {
  try {
    const { post_id } = req.params;
    if (!post_id) res.status(400).send("Invalid_input");
    const response = await comments_service.view_comments(req);
    if (!response) res.status(404).send("No_comment_found");
    res.status(200).send(response);
  } catch (error) {
    console.log("error_in_fetching_comment: ", error);
    res.status(500).send(error);
  }
};

exports.delete_comment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    if (!comment_id) res.status(400).send("Invalid_input");
    const response = await comments_service.delete_comments(req);
    if (response.deletedCount === 0)
      throw res.status(401).send("No_comment_found_or_unauthorized_user");
    res.status(202).send(true);
  } catch (error) {
    console.log("error_in_deleting_comment: ", error);
    res.status(error.code || 500).send(error.message || error);
  }
};

exports.update_comment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) res.status(400).send("Invalid_input");
    const response = await comments_service.update_comments(req);
    if (response.matchedCount === 0)
      throw res.status(401).send("No_comment_found_or_unauthorized_user");
    res.status(202).send(true);
  } catch (error) {
    console.log("error_in_updating_comment: ", error);
    res.status(error.code || 500).send(error.message || error);
  }
};

exports.create_sub_comment = async (req, res) => {
  try {
    const { content } = req.body;
    const { comment_id } = req.params;
    if (!content || !comment_id) return res.status(400).send("Invalid_input");
    const response = await comments_service.create_sub_comments(req);
    if (!response) return res.status(404).send("Error_in_creating_sub_comment");
    res.status(201).send(response);
  } catch (error) {
    console.log("error_in_creating_sub_comment: ", error);
    res.status(500).send(error);
  }
};

exports.view_sub_comment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    if (!comment_id) res.status(400).send("Invalid_input");
    const response = await comments_service.view_sub_comments(req);
    res.status(200).send(response);
  } catch (error) {
    console.log("error_in_view_sub_comment: ", error);
    res.status(500).send(error);
  }
};
