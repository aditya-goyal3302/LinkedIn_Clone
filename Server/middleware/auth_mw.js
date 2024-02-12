const jwt = require('jsonwebtoken');

exports.verify_auth = async (req,res,next)=>{
    const token = req.headers['authorization']
    console.log('token: ', token);
    if (!token) {
        return res.status(401).send({ code:401 ,message: 'Unauthorized' });
      }
    try{
        const decodetoken = jwt.verify(token,"hfff")
        console.log('decodetoken: ', decodetoken);
        next();
    }
    catch(err){
        console.log("err  ",err)
    }
}