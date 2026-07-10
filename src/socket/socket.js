import { io } from "socket.io-client";
import { store } from "../redux/store";
import { setLockers, updateStatus } from "../redux/features/lockerSlice";

let socket;

export const connectSocket = () => {
  if(socket) return socket; // Return existing socket if already connected
  const token = localStorage.getItem("token");
  console.log("Connecting to socket with token:", token);

  socket = io("http://localhost:3000", {
    auth: {
      token: token,
    }
  });

  socket.on("connect", () => {
    console.log("Connected:", socket.id);
    socket.emit("getlocker");
  });

  socket.on("connect_error", (err) => {
  console.log("Connect Error:", err.message);
  console.log(err);
});

  socket.on("lockerdata", (data) => {
    console.log("Received locker data:", data);
    store.dispatch(setLockers(data));
     console.log(store.getState());
  });

  socket.on("templockerdata", (data) => {
    console.log("Received temporary locker data:", data);
    store.dispatch(updateStatus(data));
  });
  socket.on("unlocktemplockerdata", (data) => {
    store.dispatch(updateStatus(data));
  });
  return socket;
};

export const getSocket = () => socket;