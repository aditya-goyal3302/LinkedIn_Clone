const { comments_service } = require("../services");

exports.create_comment = async (req, res) => {
  try {
    const response = await comments_service.create_comments(req);
    if (!response) {
      throw new Error("Error in creating post");
    }
    res.status(200).send(response);
  } catch (error) {
    console.log("error_in_creating_comment: ", error);
    res.status(500).send(error);
  }
};
exports.view_comment = async (req, res) => {
  try {
    const response = await comments_service.view_comments(req);
    res.status(200).send(response);
  } catch (error) {
    console.log("error_in_fetching_comment: ", error);
    res.status(500).send(error);
  }
};
exports.delete_comment = async (req, res) => {
  try {
    const response = await comments_service.delete_comments(req);
    if (response.deletedCount === 0)
      throw Object.assign(new Error("No comment found or unauthorized user"), {
        status: 401,
      });
    res.status(200).send(true);
  } catch (error) {
    console.log("error_in_deleting_comment: ", error);
    res.status(error.code || 500).send(error.message || error);
  }
};
exports.update_comment = async (req, res) => {
  try {
    const response = await comments_service.update_comments(req);
    console.log("response: ", response);
    if (response.matchedCount === 0)
      throw Object.assign(new Error("No comment found or unauthorized user"), {
        status: 401,
      });
    res.status(200).send(true);
  } catch (error) {
    console.log("error: ", error);
    res.status(error.code || 500).send(error.message || error);
  }
};

exports.create_sub_comment = async (req, res) => {
  try {
    const response = await comments_service.create_sub_comments(req);
    if (!response) throw new Error("Error in creating sub_comment");
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.view_sub_comment = async (req, res) => {
  try {
    const response = await comments_service.view_sub_comments(req);
    res.status(200).send(response);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send(error);
  }
};
