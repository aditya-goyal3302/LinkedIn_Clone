const router = require('express').Router();
const { auth_middleware } = require('../middlewares');
const { connections_controller } = require('../controllers');

// router.use(auth_middleware);
router.get('/', auth_middleware.verify_auth, connections_controller.get_connections_for_user);
router.post('/', auth_middleware.verify_auth, connections_controller.create_connection);
router.put('/:connection_id', auth_middleware.verify_auth, connections_controller.set_connections);
router.get('/pending', auth_middleware.verify_auth, connections_controller.get_pending_connections);

module.exports = router;