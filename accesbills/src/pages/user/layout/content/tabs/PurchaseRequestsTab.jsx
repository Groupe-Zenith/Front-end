"use client"

import DataTable from '../../../../../components/common/dataTabs/DataTable'

const PurchaseRequestsPage = () => {
  const requests = [
    { id: "PR-2023-001", date: "2023-05-10", items: "Fournitures de bureau", status: "En attente" },
    { id: "PR-2023-002", date: "2023-04-28", items: "Équipement informatique", status: "Approuvé" },
    { id: "PR-2023-003", date: "2023-04-15", items: "Licences logicielles", status: "Rejeté" }
  ];

  const statusConfig = {
    "En attente": { className: "status-pending" },
    "Approuvé": { className: "status-approved" },
    "Rejeté": { className: "status-rejected" }
  };

  const columns = [
    { key: 'id', label: 'ID Demande' },
    { key: 'date', label: 'Date' },
    { key: 'items', label: 'Bien' },
    { key: 'status', label: 'Statut' },
    { key: 'actions', label: 'Actions' }
  ];

  const handleNewRequest = () => {
    console.log('Nouvelle demande créée');
  };

  const handleRowClick = (item) => {
    console.log('Détails de la demande:', item);
  };

  return (
    <DataTable
      title="Demande d'achat"
      description="Demande d'achat récentes"
      searchPlaceholder="Rechercher demande..."
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