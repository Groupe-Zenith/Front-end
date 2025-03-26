import React , {useEffect}from "react";
import DataTable from "../../../../../components/common/dataTabs/DataTable";
import socket, { connectSocket, getAllPurchaseRequest } from "../../../../../services/notificationService";

const columns = [
  { key: "badgeNumber", label: "Nom d'utilisateur" },
  { key: "firstName", label: "Article demande" },
  { key: "lastName", label: "Nombre" },
  { key: "mobile", label: "Prix estimé" },
  { key: "email", label: "Description" },
  { key: "role", label: "Date du demande" }
];

const handleRowClick = (rowData) => {
  console.log("Row clicked:", rowData);
};

const handleActionClick = () => {
  console.log("Action button clicked");
};

const RequestList = () => {
  const [purchaseRequests, setPurchaseRequests] = useState([]);

  useEffect(() => {
    const initSocket = async () => {
      try {
        await connectSocket();
        console.log("Socket connecté !");
        await fetchPurchaseRequest();
      } catch (error) {
        console.error("Erreur lors de l'initialisation :", error);
      }
    };

    initSocket();

    return () => {
      socket.disconnect(); // Déconnecter lors du démontage
    };
  }, []);

  const fetchPurchaseRequest = async () => {
    try {
      const data = await getAllPurchaseRequest();
      console.log("Données des demandes d'achat :", data);
      setPurchaseRequests(data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

 
    
    
    const data = [
      {
        badgeNumber: "54321",
        firstName: "Alice",
        lastName: "Johnson",
        mobile: "+1122334455",
        email: "alice.johnson@example.com",
        role: "Manager"
      },
      {
        badgeNumber: "98765",
        firstName: "Bob",
        lastName: "Williams",
        mobile: "+5566778899",
        email: "bob.williams@example.com",
        role: "Manager"
      }
    ];
  return (
    <div className="Request">
      <DataTable
        title="Liste des demandes"
        description="Liste des demandes avec leurs détails"
        searchPlaceholder="Recherche une demande..."
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default RequestList;
