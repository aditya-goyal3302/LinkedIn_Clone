const router = require("express").Router();
const { comments_controller } = require("../controllers");
const { auth } = require("../middlewares");
//comments_routes
router.post("/:post_id", auth.verify_auth, comments_controller.create_comment);
router.get("/:post_id", auth.verify_auth, comments_controller.view_comment);
router.delete(
  "/:comment_id",
  auth.verify_auth,
  comments_controller.delete_comment
);
router.put(
  "/:comment_id",
  auth.verify_auth,
  comments_controller.update_comment
);
//comments_routes
//sub-comments_routes
router.post(
  "/sub-comment/:comment_id",
  auth.verify_auth,
  comments_controller.create_sub_comment
);
router.get(
  "/sub-comment/:comment_id",
  auth.verify_auth,
  comments_controller.view_sub_comment
);
//sub-comments_routes
module.exports = router;
