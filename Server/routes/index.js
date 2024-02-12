const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
 })

router.use('/posts', require('./posts_routes'));
router.use('/auth', require('./auth_routes'));

module.exports = router;