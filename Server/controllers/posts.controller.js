const { post_service } = require("../services");

exports.show_posts = async (req, res) => {
  try{
    const responseonse = await post_service.show_posts();
    return res.status(200).send(responseonse);
  }
  catch(err){
    console.log(err)
    res.status(500).send(err);
  }
};
exports.create_posts = async (req, res ) => {
  try {
    const response = await post_service.create_posts(req);
    res.status(201).send(response);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send(error );
  }
  
};
exports.Update_posts = async (req, res) => {
  try {
    const response = await post_service.Update_posts(req);
    console.log('response: ', response);
    res.status(200).send(response);
  }
  catch(err){
    console.log(err)
    res.status(500).send(err);
  } 
}
exports.show_posts_on_scroll = async ()=>{
  try{
    const response = await post_service.show_posts();
    //logic pending
    return response;
  }
  catch(err){
    console.log(err)
    throw new Error(err);
  }
}