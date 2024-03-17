const { notification_services } = require('../services')
const { event_emitter } = require('../config')

exports.send_notification =async (req,res,next)=>{
    try {
        const response = await notification_services.send_notification(req)
        if (response){
            event_emitter.emit('send-notification',response)
            return res.status(200).send({status: "OK"}) 
        }
    } catch (error) {
        console.log('error: ', error);
        return res.status(200).send({status: "Failed"})
    }
}

exports.get_notifications = async (req,res,next)=>{
    try {
        const response  = await notification_services.get_notifications(req)
        console.log('response: ', response);
        res.status(200).send(response)
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send(error)
        
    }
}