import React, { useEffect, useState } from "react";
import DataTable from "../../../../../components/common/dataTabs/DataTable"; 
import "./Employee.scss";

import { handleGetUsers } from "../../../../../services/ApiUser";

// Colonnes adaptées au schéma User
const columns = [
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "is_active", label: "Active" },
  { key: "created_at", label: "Created At" }
];

const handleRowClick = (rowData) => {
  console.log("Row clicked:", rowData);
};

const handleActionClick = () => {
  console.log("Action button clicked");
};

const EmployeeList = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const datas = await handleGetUsers("user")
      
      setData(datas);
    };
    fetchData()
      
  }, []);

  return (
    <div className="Employee">
      <DataTable
        title="Employee List"
        description="List of users with their details"
        searchPlaceholder="Search users..."
        actionButtonText="Add User"
        columns={columns}
        data={data || []}  // Assure que data est toujours un tableau
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default EmployeeList;
