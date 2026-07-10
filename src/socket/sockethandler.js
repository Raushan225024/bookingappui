import {getSocket} from "./socket";
export const tempblocklocker = (lockerId) =>{
    const socket = getSocket();
    console.log("Emitting templockerdata for lockerId:", lockerId);
    socket.emit("templock", { lockerId});
};
export const unblocklocker = (lockerId) =>{
    const socket = getSocket();
    console.log("Emitting unlocktemplock for lockerId:", lockerId);
    socket.emit("unlocktemplock",{lockerId} );
}