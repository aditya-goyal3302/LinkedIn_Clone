const { Server } = require('socket.io');
const  event_emitter = require('../config/event_emitter');

module.exports = async (server) => {
    const io = new Server(server,{
        cors: {
            origin: "http://localhost:3000",
            // methods: ["GET", "POST", "PUT", "DELETE"],
        }
    })

    io.on("connection", (socket) => {
        console.log('Socket.io is connected for notifications socketId: ', socket.id);
        socket.on("disconnect", () => {
            console.log('Socket.io is disconnected socketId: ', socket.id);
        });
        socket.on("join", (roomId) => {
            socket.emit("run",{})
            console.log('roomId: ', roomId);
            socket.join(roomId);
        });
        const listen = (response)=>{
            console.log('send-notification: ');
            socket.to(response.send_to).emit('get-notifications', response)
        }

        event_emitter.on('send-notification',listen)
    }); 
}

