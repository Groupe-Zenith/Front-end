import { useState } from 'react';
import DataTable from '../../../../../components/common/dataTabs/DataTable';
import NewPurchaseRequestModal from '../../../../../components/user/NewPurchaseRequestModal';
import './PurchaseRequestsTab.scss';
import { handlePostPurchase } from '../../../../../services/APIPurchase';

const PurchaseRequestsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user =JSON.parse(localStorage.getItem("user"));
  const [requests, setRequests] = useState([
    { 
      id: "PR-2023-004", 
      date: "2023-05-15", 
      item_name: "Écran 24\"", 
      quantity: 2, 
      estimated_price: 200000,
      reason: "Remplacement d'écrans défectueux",
      status: "En attente" 
    },
    { 
      id: "PR-2023-003", 
      date: "2023-05-10", 
      item_name: "Claviers sans fil", 
      quantity: 5, 
      estimated_price: 50000,
      reason: "Équipement nouveau bureau",
      status: "Approuvé" 
    },
    { 
      id: "PR-2023-002", 
      date: "2023-05-05", 
      item_name: "Licence Microsoft Office", 
      quantity: 1, 
      estimated_price: 30000,
      reason: "Nouvel employé",
      status: "Rejeté",
      admin_comment: "Budget dépassé pour ce trimestre"
    }
  ]);

  const statusConfig = {
    "En attente": { className: "status-pending" },
    "Approuvé": { className: "status-approved" },
    "Rejeté": { className: "status-rejected" }
  };

  const columns = [
    { key: 'id', label: 'ID Demande' },
    { key: 'date', label: 'Date' },
    { key: 'item_name', label: 'Article' },
    { key: 'quantity', label: 'Quantité' },
    { 
      key: 'estimated_price', 
      label: 'Prix estimé', 
      format: (value) => `${value} Ar` 
    },
    { key: 'status', label: 'Statut' },
  ];

  const handleNewRequestClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitRequest = async (newRequest) => {
    // Simuler la création d'une nouvelle demande
    const newRequestWithId = {
      user_id: user._id,
      ...newRequest,
      quantity: parseInt(newRequest.quantity),
      estimated_price: parseFloat(newRequest.estimated_price),

    };
    await handlePostPurchase(newRequestWithId);

    setRequests([newRequestWithId, ...requests]);
    setIsModalOpen(false);
  };
  const fetchPurchaseRequest = () => {
      getAllPurchaseRequest();
    };
  const handleRowClick = (item) => {
    console.log('Détails de la demande:', item);
  };

  return (
    <>
      <DataTable
        title="Demandes d'achat"
        description="Vos demandes d'achat récentes"
        searchPlaceholder="Rechercher une demande..."
        actionButtonText="Nouvelle demande"
        columns={columns}
        data={requests}
        onActionClick={handleNewRequestClick}
        onRowClick={handleRowClick}
        statusConfig={statusConfig}
      />

      <NewPurchaseRequestModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmitRequest}
      />
    </>
  );
};

export default PurchaseRequestsPage;