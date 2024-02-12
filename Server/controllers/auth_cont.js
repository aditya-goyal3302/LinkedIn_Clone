const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try{
        const data = req.body;
        const hashedpass = await bcrypt.hash(data.password, 10);
        const user = new User({
            firstName: data.fname,
            lastName: data.lname,
            username: data.uname,
            email: data.email,
            password: hashedpass    
        });
        const result = await user.save();
        console.log(result);
        if (!result) {
            res.status(500).send({code:501,m:"Error in creating user"});
        }
        else
            res.status(200).send({code:201,m:"sucess in creating user"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({code:501,m:"Error in creating user"});
    }
}

exports.login = async (req, res) => {
    const data = req.body;
    console.log('data: ', data);
    const user = await User.findOne({ email: data.email })
    if (!user) {
        return res.status(500).send({code:2,e:"Invalid email or password"});
    }
    const check = await bcrypt.compare(data.password, user.password)
    if (!check) {
        return res.status(500).send({code:3,e:"Invalid email or password"});
    }
    else{
        const token = jwt.sign({email:user.email,userId:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});
        // req.session.user = user;
        // req.session.isAuth = true;
        const userdata = {
            id:user._id,
            name:user.name,
            email:user.email,
            image:user.image
        }
        res.status(201).send({code:1,data:userdata,token:token});
    }
}