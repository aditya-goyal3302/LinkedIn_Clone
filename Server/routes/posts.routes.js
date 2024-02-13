const router = require('express').Router();
const { posts } = require('../controllers/index');
const {auth} = require('../middleware/index')

router.get('/', auth.verify_auth,posts.get_posts)
router.post('/', auth.verify_auth,posts.post_posts)
router.put('/', auth.verify_auth,posts.Update_posts)

module.exports = router