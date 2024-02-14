const { reactions_service } = require("../services");
exports.set_posts_reactions = async (req, res) => {
  const resp = await reactions_service.get_reactions_of_same_user(req)
  // console.log(resp.length, 'resp.length', resp[0].reaction, 'resp[0]', req.body.reaction, 'req.body.reaction');
    if (resp?.length > 0 ) {
        if(resp[0].reaction == req.body.reaction || false){
            const response = await reactions_service.delete_reactions(req);
            console.log(response, 'response');
            res.send('reaction deleted');
        }
        else{
            reactions_service.update_reactions(req);
            res.send('reaction updated');
        }
    } else {
        reactions_service.set_reactions(req);
        res.send('reaction added');
    }
};
exports.get_posts_reactions = (req, res) => {
  // res.send('get_reactions');
  reactions_service.get_reactions(req, res);
};
