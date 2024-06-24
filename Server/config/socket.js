const { Server } = require('socket.io');
const { chat_room_service, messages_service } = require('../../Server/services');

module.exports = async (server) => {
    const io = new Server(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        }
    })

    io.on("connection", (socket) => {
        console.log('Socket.io is connected socketId: ',socket.id);
        socket.on("disconnect", () => {
            console.log('Socket.io is disconnected socketId: ', socket.id);
        });
        socket.on("join", (roomId) => {
            socket.emit("run",{})
            socket.join(roomId);
        });
        socket.on('send-message',async (data)=>{
            try {
                const response = await messages_service.send_message(data)
                if (response) {
                    io.to(data.chat_room).emit('receivemessage',response);
                }
            } catch (error) {
                
            }

        })
    }); 
}

