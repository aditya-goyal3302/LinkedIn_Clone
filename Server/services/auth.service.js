const {user_model} = require('../models/index');
const jwt = require('jsonwebtoken');

exports.signup = async (req) => {
        const {first_name, last_name,username,email,password} = req.body;
        const exesting_user = await user_model.findOne({ email: email})
        if(exesting_user){
            return {code:401,message:"User already exists"}
        }
        const user = new user_model({
            first_name,
            last_name,
            username,
            email,
            password    
        });
        return await user.save();
        
}

exports.login = async (req, res) => {
        const {email, password} = req.body;
        const user = await user_model.findOne({ email })
        if (!user) {
            return {code:401,e:"Invalid email or password"}
        }
        const check = await user.comparePassword(password);
        if (!check) {
            return {code:401,e:"Invalid email or password"}
        }
        else{
            const token = jwt.sign({email:user.email,user_id:user._id, username:user.username},process.env.JWT_SECRET,{expiresIn:'2d'});
            const user_data = {
                id:user._id,
                name:user.name,
                email:user.email,
                image:user.image
            }
            return {data:user_data,token:token}
        }
}