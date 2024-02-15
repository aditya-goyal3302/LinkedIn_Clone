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
    const resp = await reactions_service.get_comment_reactions_of_same_user(req);
    if (resp?.length > 0) {
      if (resp[0].reaction == req.body.reaction || false) {
        await reactions_service.delete_comment_reactions(req);
        res.status(202).send("reaction deleted");
      } else {
        await reactions_service.update_comment_reactions(req);
        res.status(202).send("reaction updated");
      }
    } else {
      await reactions_service.set_comment_reactions(req);
      res.status(201).send("reaction added");
    }
  } catch (err) {
    console.log("error_in_set/update/delete_reactions:", err);
    res.status(400).send(err);
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
