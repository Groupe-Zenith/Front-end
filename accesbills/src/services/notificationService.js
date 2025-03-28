import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [purchaseRequestsByIdUser, setPurchaseRequestsByIdUser] = useState([]);
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🟢 Connecté au serveur Socket.IO !");
    });

    newSocket.on("PurchaseRequest", (data) => {
      console.log("📦 Données des biens reçues :", data);
      setPurchaseRequests(data);  
    });
    
    newSocket.on("PurchaseRequestUser", (data) => {
      // console.log("📦 Données des biens reçues :", data);
      setPurchaseRequestsByIdUser(data);  
    });
    // return () => {
    //   newSocket.disconnect();
    // };
  }, []);

  const createPurchaseRequest = useCallback((data) => {
    if (socket) {
      socket.emit("createPurchaseRequest", data);
    }
  }, [socket]);

  const getAllPurchaseRequest = useCallback((status) => {
    if (socket) {
      socket.emit("getAllPurchaseRequest",status);
      
    }
  }, [socket]);

  const getPurchaseRequestByIdUser = useCallback((user_id) => {
    if (socket) {
      socket.emit("getPurchaseRequestByIdUser", user_id);
      
    }
  }, [socket]);

  const updateStatus = useCallback((requestId, newStatus) => {
    if (socket) {
      socket.emit("updateStatus", { requestId, newStatus });
    }
    
  }, [socket]);

  return {
    createPurchaseRequest,
    getAllPurchaseRequest,
    getPurchaseRequestByIdUser,
    updateStatus,
    purchaseRequests,
    purchaseRequestsByIdUser
  };
};

export default useSocket;
