import { useState, useEffect } from 'react';
import DataTable from '../../../../../components/common/dataTabs/DataTable';
import NewPurchaseRequestModal from '../../../../../components/user/NewPurchaseRequestModal';
import './PurchaseRequestsTab.scss';
import { handlePostPurchase } from '../../../../../services/APIPurchase';
import useSocket from '../../../../../services/notificationService';

const PurchaseRequestsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { getPurchaseRequestByIdUser, purchaseRequests,purchaseRequestsByIdUser } = useSocket();
  console.log(purchaseRequestsByIdUser);
  
  const statusConfig = {
    "En attente": { className: "status-pending" },
    "Approuvé": { className: "status-approved" },
    "Rejeté": { className: "status-rejected" }
  };

  const columns = [
    { key: 'createdAt', label: 'Date' },
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
    const newRequestWithId = {
      user_id: user._id,
      ...newRequest,
      quantity: parseInt(newRequest.quantity),
      estimated_price: parseFloat(newRequest.estimated_price),
    };
    await handlePostPurchase(newRequestWithId);
    setIsModalOpen(false);
  };

  useEffect(() => {
    getPurchaseRequestByIdUser(user._id);
  }, [ getPurchaseRequestByIdUser,user._id]);

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
        data={purchaseRequestsByIdUser}
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
