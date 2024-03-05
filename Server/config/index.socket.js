const { Server } = require('socket.io');
const { chat_room_controller, messages_controller } = require('../controllers');

module.exports = async (server) => {
    const io = new Server(server,{
        cors: {
            origin: "http://localhost:3000",
            // methods: ["GET", "POST", "PUT", "DELETE"],
        }
    })
    let activeusers = [];

    const addUser = (userId, socketId) => {
    !activeusers.some((user) => user.userId === userId) &&
        activeusers.push({ userId, socketId });
    };

    const removeUser = (socketId) => {
    activeusers = activeusers.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId) => {
    return activeusers.find((user) => user.userId === userId);
    };

    io.on("connection", (socket) => {
        console.log('Socket.io is connected socketId: ', socket.id);
        socket.on("disconnect", () => {
            console.log('Socket.io is disconnected socketId: ', socket.id);
        });
        socket.on("join", (roomId) => {
            socket.join(roomId);
        });
        socket.on('abc',(data)=>{
            console.log('data: ', data);
        })
    }); 
}

