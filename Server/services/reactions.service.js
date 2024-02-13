const { reactions_model } = require('../models');

exports.set_reactions_model = (req, res) => {
    const { reaction } = req.body;
    const { post_id } = req.params;
    const { user_id } = req.user;
    reactions_model.create({
        reaction,
        post_id,
        user_id
    }).then(reaction => {
        res.status(201).json(reaction);
    }).catch(err => {
        res.status(400).json(err);
    });
}