const router = require('express').Router();
const { posts } = require('../controllers/index');
const {auth} = require('../middleware/index')

router.get('/', auth.verify_auth,posts.getposts)
router.post('/', auth.verify_auth,posts.postposts)

module.exports = router