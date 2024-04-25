import { io } from "socket.io-client";
export default io.connect(`${process.env.REACT_APP_IMG_BASE_URL}`, {
    transports: ['websocket'],
  });
