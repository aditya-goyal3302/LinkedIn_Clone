const router = require('express').Router();
const { company_controller } = require('../controllers');
const {auth_middleware} = require('../middlewares');

router
    .use(auth_middleware.verify_auth)
    .get("/:search")
    .post('/')
    .get("/:company_id")
    .delete("/")
    .patch("/")
    

module.exports = router;
