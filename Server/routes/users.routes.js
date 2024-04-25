const router = require("express").Router();
const { user_controller } = require("../controllers");
const { auth_middleware } = require("../middlewares");

router.get("/", user_controller.getAllUsers); // this route is for testing purpose only and will be removed in production
router.get("/:user_id",auth_middleware.verify_auth, user_controller.getUserData); 
router.post('/profile_pic',auth_middleware.verify_auth,user_controller.set_profile_pic)
router.post('/cover_pic',auth_middleware.verify_auth,user_controller.set_cover_pic)
router.put('/',auth_middleware.verify_auth,user_controller.update_user_data)


module.exports = router;