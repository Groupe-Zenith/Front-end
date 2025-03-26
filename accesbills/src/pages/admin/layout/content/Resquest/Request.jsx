
import React, { useState, useEffect } from "react";
import DataTable from "../../../../../components/common/dataTabs/DataTable";
import useSocket from "../../../../../services/notificationService";


const columns = [
  { key: "user_id.first_name", label: "Nom d'utilisateur" },
  { key: "item_name", label: "Article demande" },
  { key: "quantity", label: "Nombre" },
  { key: "prix", label: "Prix estimé" },
  { key: "reason", label: "Description" },
  { key: "createdAt", label: "Date du demande" }
];

const handleRowClick = (rowData) => {
  console.log("Row clicked:", rowData);
};

const handleActionClick = () => {
  console.log("Action button clicked");
};

const RequestList = () => {
  const { getAllPurchaseRequest ,purchaseRequests} = useSocket();

  useEffect(() => {
    getAllPurchaseRequest();
  }, [getAllPurchaseRequest]);

  return (
    <div className="Request">
      <DataTable
        title="Liste des demandes"
        description="Liste des demandes avec leurs détails"
        searchPlaceholder="Recherche une demande..."
        columns={columns}
        data={purchaseRequests}
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default RequestList;
