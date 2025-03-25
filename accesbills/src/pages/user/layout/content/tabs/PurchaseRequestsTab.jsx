import DataTable from '../../../../../components/common/dataTabs/DataTable'
import './PurchaseRequestsTab.scss';

const PurchaseRequestsPage = () => {
  const requests = [
    { 
      id: "PR-2023-004", 
      date: "2023-05-15", 
      item_name: "Écran 24\"", 
      quantity: 2, 
      reason: "Remplacement d'écrans défectueux",
      status: "En attente" 
    },
    { 
      id: "PR-2023-003", 
      date: "2023-05-10", 
      item_name: "Claviers sans fil", 
      quantity: 5, 
      reason: "Équipement nouveau bureau",
      status: "Approuvé" 
    },
    { 
      id: "PR-2023-002", 
      date: "2023-05-05", 
      item_name: "Licence Microsoft Office", 
      quantity: 1, 
      reason: "Nouvel employé",
      status: "Rejeté",
      admin_comment: "Budget dépassé pour ce trimestre"
    }
  ];

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
    { key: 'status', label: 'Statut' },
  ];

  const handleNewRequest = () => {
    console.log('Nouvelle demande créée');
    // Navigation vers le formulaire de création
  };

  const handleRowClick = (item) => {
    console.log('Détails de la demande:', item);
    // Affichage des détails complets avec raison et commentaire admin si existe
  };

  return (
    <DataTable
      title="Demandes d'achat"
      description="Vos demandes d'achat récentes"
      searchPlaceholder="Rechercher une demande..."
      actionButtonText="Nouvelle demande"
      columns={columns}
      data={requests}
      onActionClick={handleNewRequest}
      onRowClick={handleRowClick}
      statusConfig={statusConfig}
    />
  );
};

export default PurchaseRequestsPage;