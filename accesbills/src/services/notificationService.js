import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const connectSocket = () => {
  socket.on("connect", () => {
    console.log("🟢 Connecté au serveur Socket.IO !");
  });
  socket.on("PurchaseRequest", (data) => {
    console.log("📦 Données des biens reçues :", data);
  });
  

 
};
export const createPurchaseRequest = (data) => {
  socket.emit("createPurchaseRequest", data);
}
export const getAllPurchaseRequest = () => {
  socket.emit("getAllPurchaseRequest");
};

export default socket;
