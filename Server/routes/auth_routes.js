const express = require('express');
const router = express.Router();
const { auth } = require('../controllers/index');

router.post('/signup', auth.signup);
router.post('/login', auth.login);

module.exports = router;