const router = require('express').Router();
const { reactions_controller } = require('../controllers');
const { auth_middleware } = require("../middlewares");

router.get('/posts/:post_id', auth_middleware.verify_auth, reactions_controller.get_posts_reactions)
router.post('/posts/:post_id', auth_middleware.verify_auth, reactions_controller.set_posts_reactions)
router.get('/comments/:comment_id', auth_middleware.verify_auth, reactions_controller.get_comment_reactions)
router.post('/comments/:comment_id', auth_middleware.verify_auth, reactions_controller.set_comment_reactions)

module.exports = router;