const router = require('express').Router();
const { posts_controller } = require('../controllers');
const {auth} = require('../middlewares')

router.get('/', auth.verify_auth, posts_controller.show_posts)
router.post('/', auth.verify_auth, posts_controller.create_posts)
router.put('/', auth.verify_auth, posts_controller.Update_posts)
router.delete('/', auth.verify_auth, posts_controller.delete_post)
router.get('/next/:time', auth.verify_auth, posts_controller.show_posts_on_scroll)

module.exports = router