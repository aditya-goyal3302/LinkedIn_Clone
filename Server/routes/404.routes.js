const router = require('express').Router();
router.get('*', (req, res) => {
    res.status(404).send({e:'404: Page not found'});

})

module.exports = router;