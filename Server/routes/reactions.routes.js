const router = require('express').Router();
const { reactions_controller } = require('../controllers');
const { auth } = require("../middlewares");

router.get('/:post_id', auth.verify_auth, reactions_controller.get_posts_reactions)
router.post('/:post_id', auth.verify_auth, reactions_controller.set_posts_reactions)
// router.put('/:reaction_id')
// router.delete('/:reaction_id')

module.exports = router;