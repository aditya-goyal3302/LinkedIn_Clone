const { reactions_service } = require("../services");
//post reactions
exports.set_posts_reactions = async (req, res) => {
  try {
    const { post_id } = req.params;
    if (!post_id) res.status(400).send("Invalid_input");
    const response = await reactions_service.create_update_post_reactions(req)
    if (!response) res.status(404).send("Error_in_creating_reactions");
    res.status(201).send(response);
  } catch (error) {
    console.log("error_in_set/update_reactions:", error);
    res.status(500).send(error)
  }
};
exports.get_posts_reactions = async (req, res) => {
  const response = await reactions_service.get_reactions(req, res);
  res.status(200).send(response);
};
//comment reactions
exports.set_comment_reactions = async (req, res) => {
  try {
    const { comment_id } = req.params;
    if (!comment_id) res.status(400).send("Invalid_input");
    const response = await reactions_service.create_update_comment_reactions(req)
    if (!response) res.status(404).send("Error_in_creating_reactions");
    res.status(201).send(response);
  } catch (error) {
    console.log("error_in_set/update_reactions:", error);
    res.status(500).send(error)
  }
};
exports.get_comment_reactions = async (req, res) => {
  try {
    const response = await reactions_service.get_comment_reactions(req, res);
    res.status(200).send(response);
  } catch (error) {
    console.log("error_in_get_comment_reactions:", error);
    res.status(500).send(error);
  }
};
