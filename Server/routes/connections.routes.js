const router = require('express').Router();
const { auth_middleware } = require('../middlewares');
const { connections_controller } = require('../controllers');

router.use(auth_middleware.verify_auth)
.get('/', connections_controller.get_connections_for_user)
.post('/', connections_controller.create_connection)
.put('/:connection_id', connections_controller.set_connections)
.get('/pending', connections_controller.get_pending_connections)
.get('/suggestions', connections_controller.get_suggestions_for_user)

module.exports = router;