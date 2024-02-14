const { reactions_service } = require("../services");
//post reactions
exports.set_posts_reactions = async (req, res) => {
  try {
    const resp = await reactions_service.get_reactions_of_same_user(req);
    if (resp?.length > 0) {
      if (resp[0].reaction == req.body.reaction || false) {
        const response = await reactions_service.delete_reactions(req);
        console.log(response, "response");
        res.send("reaction deleted");
      } else {
        await reactions_service.update_reactions(req);
        res.send("reaction updated");
      }
    } else {
      await reactions_service.set_reactions(req);
      res.send("reaction added");
    }
  } catch (err) {
    console.log("error_in_set/update/delete_reactions:", err);
    res.send(err);
  }
};
exports.get_posts_reactions = async (req, res) => {
 const response = await reactions_service.get_reactions(req, res);
  res.status(200).send(response);
};
//comment reactions
exports.set_comment_reactions = async (req, res) => {
  try {
    const resp = await reactions_service
      .get_comment_reactions_of_same_user(req);
    if (resp?.length > 0) {
      if (resp[0].reaction == req.body.reaction || false) {
        await reactions_service.delete_comment_reactions(req);
        res.send("reaction deleted");
      } else {
        await reactions_service.update_comment_reactions(req);
        res.send("reaction updated");
      }
    } else {
      await reactions_service.set_comment_reactions(req);
      res.send("reaction added");
    }
  } catch (err) {
    console.log("error_in_set/update/delete_reactions:", err);
    res.send(err);
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
