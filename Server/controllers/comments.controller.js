const { comments_service } = require("../services");

exports.create_comment = async (req, res) => {
  try {
    const response = await comments_service.create_comments(req);
    res.status(response.code).send(response.message);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.view_comment = async (req, res) => {
  try {
    const response = await comments_service.view_comments(req);
    res.status(200).send(response);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send(error);
  }
};
exports.delete_comment = async (req, res) => {
  try {
    const response = await comments_service.delete_comments(req);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.update_comment = async (req, res) => {
  try {
    const response = await comments_service.update_comments(req);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create_sub_comment = async (req, res) => {
  try {
    const response = await comments_service.create_sub_comments(req);
    res.status(response.code).send(response.message);
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