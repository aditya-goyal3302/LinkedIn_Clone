const router = require("express").Router();
const { user_controller } = require("../controllers");
const { authMiddleware, auth_middleware } = require("../middlewares");

router.get("/", user_controller.getAllUsers); // this route is for testing purpose only and will be removed in production
router.post('/profile_pic',auth_middleware.verify_auth,user_controller.set_profile_pic)
router.post('/cover_pic',auth_middleware.verify_auth,user_controller.set_cover_pic)


module.exports = router;