import { io } from "socket.io-client";
import { store } from "../redux/store";
import { setLockers, updateStatus } from "../redux/features/lockerSlice";

let socket;

export const connectSocket = () => {
  const token = localStorage.getItem("token");

  socket = io("http://localhost:5000", {
    auth: {
      token
    }
  });

  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  socket.emit("getlocker");

  socket.on("lockerdata", (data) => {
    store.dispatch(setLockers(data));
  });

  socket.on("templockerdata", (data) => {
    store.dispatch(updateStatus(data));
  });
  socket.on("unlocktemplockerdata", (data) => {
    store.dispatch(updateStatus(data));
  });
  return socket;
};

export const getSocket = () => socket;