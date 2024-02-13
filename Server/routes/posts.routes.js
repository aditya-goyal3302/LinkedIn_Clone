const router = require('express').Router();
const { posts_controller } = require('../controllers/index');
const {auth} = require('../middlewares')

router.get('/', auth.verify_auth, posts_controller.show_posts)
router.post('/', auth.verify_auth, posts_controller.create_posts)
router.put('/', auth.verify_auth, posts_controller.Update_posts)
router.delete('/', auth.verify_auth, posts_controller.delete_post)

module.exports = router