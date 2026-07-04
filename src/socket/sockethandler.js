import {getSocket} from "./socket";
export const tempblocklocker = (lockerId) =>{
    const socket = getSocket();
    socket.emit("templockerdata", { lockerId});
};
export const unblocklocker = (lockerId) =>{
    const socket = getSocket();
    socket.emit("unlocktemplock",{lockerId} );
}