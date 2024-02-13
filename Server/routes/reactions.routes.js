const router = require('express').Router();
const {Reaction} = require('../models');

router.get('/:post_id')
router.post('/:post_id')
router.put('/:reaction_id')
router.delete('/:reaction_id')

module.exports = router;