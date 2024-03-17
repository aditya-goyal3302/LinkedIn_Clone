const router = require("express").Router();

router.use('/api/notifications', require('./notification.routes'))

module.exports = router;
