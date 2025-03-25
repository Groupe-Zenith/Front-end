import React from "react";
import DataTable from "../../../../../components/common/dataTabs/DataTable"; 
import "./Employee.scss";
const columns = [
  { key: "badgeNumber", label: "Badge Number" },
  { key: "firstName", label: "Name" },
  { key: "lastName", label: "Last Name" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" }
];

const data = [
  {
    badgeNumber: "12345",
    firstName: "John",
    lastName: "Doe",
    mobile: "+1234567890",
    email: "john.doe@example.com",
    role: "Admin"
  },
  {
    badgeNumber: "67890",
    firstName: "Jane",
    lastName: "Smith",
    mobile: "+0987654321",
    email: "jane.smith@example.com",
    role: "User"
  }
];

const handleRowClick = (rowData) => {
  console.log("Row clicked:", rowData);
};

const handleActionClick = () => {
  console.log("Action button clicked");
};

const EmployeeList = () => {
  return (
    <div className="Employee">
      <DataTable
        title="Employee List"
        description="List of users with their details"
        searchPlaceholder="Search users..."
        actionButtonText="Add User"
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default EmployeeList;
