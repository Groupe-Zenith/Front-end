import React  , {useState ,useEffect }from "react";
import DataTable from "../../../../../components/common/dataTabs/DataTable";
import { handleGetUsers } from "../../../../../services/ApiUser";

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

const ManagerList = () => {
  const [data, setData] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        const datas = await handleGetUsers("manager")
        
        setData(datas);
      };
      fetchData()
        
    }, []);
  return (
    <div className="Manager">
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
