const router = require('express').Router();
const { auth_middleware } = require('../middlewares');
const { chat_room_controller, messages_controller } = require('../controllers');

router.use(auth_middleware.verify_auth)
router.get('/', chat_room_controller.get_chats_for_user)
router.post('/', chat_room_controller.create_chat_room)
router.get('/:room_id', messages_controller.get_chat_by_room_id)

module.exports = router;