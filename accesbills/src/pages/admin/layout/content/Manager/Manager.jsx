import React  , {useState ,useEffect }from "react";
import DataTable from "../../../../../components/common/dataTabs/DataTable";
import { handleGetUsers } from "../../../../../services/ApiUser";

const columns = [
  { key: "first_name", label: "Nom" },
  { key: "last_name", label: "prénom" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "created_at", label: "Demande de création"}
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
        title="Liste des gestionnaires"
        description="Listes des gestionnaires avec leurs détails"
        searchPlaceholder="Rechercher..."
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default ManagerList;
