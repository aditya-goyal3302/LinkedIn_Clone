const router = require('express').Router();
const { posts_controller } = require('../controllers');
const {auth_middleware} = require('../middlewares')

router.get('/', auth_middleware.verify_auth, posts_controller.show_posts)
router.post('/', auth_middleware.verify_auth, posts_controller.create_posts)
router.put('/', auth_middleware.verify_auth, posts_controller.update_posts)
router.delete('/', auth_middleware.verify_auth, posts_controller.delete_post)
router.get('/next/:time', auth_middleware.verify_auth, posts_controller.show_posts_on_scroll)

module.exports = router;
