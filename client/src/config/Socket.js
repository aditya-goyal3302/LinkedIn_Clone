import { io } from "socket.io-client";
const connect = ()=>{return io.connect(`http://localhost:8080`);}
export default connect;
