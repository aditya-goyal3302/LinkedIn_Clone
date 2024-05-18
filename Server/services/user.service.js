const { user_model } = require('../models');

exports.get_user_data = async (req)=>{
    const {user_id} = req.params
    const resp = await user_model.findOne({_id:user_id})
    resp.password = undefined
    return resp
}
exports.set_profile_pic = async (req,res)=>{
    const {user} = req.body
    const link = req.files.image[0].location.split("/")
    const resp = await user_model.findOneAndUpdate({_id:user.user_id},{
        image:`uploads/images/${link[link.length-1]}`
    },{upsert:false,new:true})
    resp.password = undefined
    return resp
}
exports.set_cover_pic = async (req,res)=>{
    const {user} = req.body
    const link = req.files.image[0].location.split("/")
    const resp = await user_model.findOneAndUpdate({_id:user.user_id},{
        cover:`uploads/images/${link[link.length-1]}`
    },{upsert:false,new:true})
    resp.password = undefined
    return resp
}
exports.update_user_data = async (req,res)=>{
    const {user,data} = req.body
    const resp = await user_model.findOneAndUpdate({_id:user.user_id},{
        ...data
    },{upsert:false,new:true})
    resp.password = undefined
    return resp
}