const { post_service } = require("../services");

exports.get_posts = async (req, res) => {
  try{
    const responseonse = await post_service.get_posts();
    return res.status(200).send(responseonse);
  }
  catch(err){
    console.log(err)
    res.status(500).send(err);
  }
};
exports.post_posts = async (req, res ) => {
  try {
    const response = await post_service.post_posts(req);
    res.status(201).send(response);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send(error );
  }
  
};
exports.Update_posts = async (req, res) => {
  try {
    const response = await post_service.Update_posts(req);
    res.status(response.code).send(response.m);
  }
  catch(err){
    console.log(err)
    res.status(500).send(err);
  } 
}
