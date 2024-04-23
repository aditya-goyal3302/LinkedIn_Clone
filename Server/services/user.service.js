const { user_model } = require('../models');

exports.set_profile_pic = async (req,res)=>{
    const {user} = req.body
    // console.log('user: ', req.body);
    const file = req.files.image[0].path
    console.log('file: ', file);
    const resp = await user_model.findOneAndUpdate({_id:user.user_id},{
        image:file
    },{upsert:false,new:true})
    return resp
}
exports.set_cover_pic = async (req,res)=>{
    const {user} = req.body
    // console.log('user: ', req.body);
    const file = req.files.image[0].path
    console.log('file: ', file);
    const resp = await user_model.findOneAndUpdate({_id:user.user_id},{
        cover:file
    },{upsert:false,new:true})
    return resp
}