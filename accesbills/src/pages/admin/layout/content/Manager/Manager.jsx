import React from "react";
import DataTable from "../../../../../components/common/dataTabs/DataTable";

const columns = [
  { key: "badgeNumber", label: "Badge Number" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" }
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

const ManagerList = () => {
  return (
    <div>
      <DataTable
        title="Manager List"
        description="List of managers with their details"
        searchPlaceholder="Search managers..."
        actionButtonText="Add Manager"
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default ManagerList;
