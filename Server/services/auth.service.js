const {user_model} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req) => {
    try{
        const data = req.body;
        const hashedpass = await bcrypt.hash(data.password, 10);
        const exesting_user = await user_model.findOne({ email: data.email})
        if(exesting_user){
            return {code:400,m:"User already exists"}
        }
        const user = new user_model({
            first_name: data.fname,
            last_name: data.lname,
            username: data.uname,
            email: data.email,
            password: hashedpass    
        });
        const result = await user.save();
        console.log(result);
        if (!result) {
            return {code:500,m:"Error in creating user"}
        }
        else
            return {code:201,m:"sucess in creating user"}
    }
    catch(err){
        console.log(err);
        return {code:500,m:"Error in creating user"}
    }
}

exports.login = async (req, res) => {
    try {
        const data = req.body;
        const user = await user_model.findOne({ email: data.email })
        if (!user) {
            return {code:401,e:"Invalid email or password"}
        }
        const check = await bcrypt.compare(data.password, user.password)
        if (!check) {
            return {code:401,e:"Invalid email or password"}
        }
        else{
            const token = jwt.sign({email:user.email,user_id:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});
            const user_data = {
                id:user._id,
                name:user.name,
                email:user.email,
                image:user.image
            }
            return {code:200,data:user_data,token:token}
        }      
    } catch (error) {
        console.log(err);
        return {code:500,m:"Error in signing in user"}
    }
    
}