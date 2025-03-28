import React, { useEffect, useState } from "react";
import DataTable from "../../../../../components/common/dataTabs/DataTable"; 
import "./Employee.scss";

import { handleGetUsers } from "../../../../../services/ApiUser";

// Colonnes adaptées au schéma User
const columns = [
  { key: "first_name", label: "FNom" },
  { key: "last_name", label: "Prénom" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "created_at", label: "Date de création", render: (row) => row.created_at.split("T")[0] }
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
      const formattedData = datas.map(user => ({
        ...user,
        created_at: user.created_at ? user.created_at.split("T")[0] : "N/A"
      }));
      setData(formattedData);
    };
    fetchData()
      
  }, []);

  return (
    <div className="Employee">
      <DataTable
        title="Liste des utilisateurs"
        description="Liste des utilisateurs avec leurs details"
        searchPlaceholder="Rechercher..."
        columns={columns}
        data={data || []} 
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default EmployeeList;
