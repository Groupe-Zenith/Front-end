import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

// Connexion au socket
export const connectSocket = () => {
  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      console.log("🟢 Connecté au serveur Socket.IO !");
      resolve(true);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Erreur de connexion :", error);
      reject(error);
    });
  });
};

// // Créer une demande d'achat
// export const createPurchaseRequest = (data) => {
//   return new Promise((resolve, reject) => {
//     socket.emit("createPurchaseRequest", data);

//     socket.on("PurchaseRequest", (response) => {
//       console.log("📦 Données des biens reçues :", response);
//       resolve(response);
//     });

//     socket.on("error", (error) => {
//       console.error("❌ Erreur lors de la création :", error);
//       reject(error);
//     });
//   });
// };

// Récupérer toutes les demandes d'achat
export const getAllPurchaseRequest = () => {
  return new Promise((resolve, reject) => {
    socket.emit("getAllPurchaseRequest");

    socket.on("PurchaseRequest", (response) => {
      console.log("📦 Toutes les demandes reçues :", response);
      resolve(response);
    });

    socket.on("error", (error) => {
      console.error("❌ Erreur lors de la récupération :", error);
      reject(error);
    });
  });
};
