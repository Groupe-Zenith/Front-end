import React from "react";
import DataTable from "../../../../../components/common/dataTabs/DataTable";

const columns = [
  { key: "badgeNumber", label: "Nom d'utilisateur" },
  { key: "firstName", label: "Article demande" },
  { key: "lastName", label: "Nombre" },
  { key: "mobile", label: "Prix estimé" },
  { key: "email", label: "Description" },
  { key: "role", label: "Date du demande" }
];

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

const handleRowClick = (rowData) => {
  console.log("Row clicked:", rowData);
};

const handleActionClick = () => {
  console.log("Action button clicked");
};

const RequestList = () => {
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
