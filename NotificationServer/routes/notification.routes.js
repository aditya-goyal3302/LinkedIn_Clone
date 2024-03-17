const router = require("express").Router();
const { auth_middleware }= require('../middlewares')
const { notification_controller } = require('../controllers')

// router.get('/',auth_middleware.verify_auth,notification_controller.get_notifications)
router.post('/',notification_controller.send_notification)
router.get('/',auth_middleware.verify_auth,notification_controller.get_notifications)

module.exports = router;
