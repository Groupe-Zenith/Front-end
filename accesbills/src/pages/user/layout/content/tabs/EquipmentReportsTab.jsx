import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import EquipementTabs from '../../../../../components/common/dataTabsForEquipement/equipementDataTabs';
import bienService from '../../../../../services/bienService';
import { AlertCircle } from 'lucide-react'; 
import './EquipmentReportsTab.scss';

export default function EquipmentReportsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const { getAllBiens, inventoryData } = bienService();

  const columns = [
    { key: 'labelBien', label: 'Nom' },
    { key: 'number', label: 'Nombre' },
    { key: 'state', label: 'Etat' },
    { key: 'description', label: 'Description' },
    { key: 'numberdamaged', label: 'Nombre de dommage' },
    { key: 'numberlost', label: 'Nombre de perte' },
  ];

  const filteredData = inventoryData.filter((item) => {
    return columns.some((column) =>
      item[column.key]
        ? item[column.key].toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    );
  });

  // Traite les cellules vides pour chaque item
  const handleEmptyCells = (item) => {
    const updatedItem = { ...item }; // Crée une copie de l'item pour ne pas le modifier directement
    columns.forEach((column) => {
      const value = item[column.key];
      if (value === null || value === undefined || value === '') {
        updatedItem[column.key] = <AlertCircle className="icon" />; // Remplace la valeur vide par "Aucun"
      }
    });
    return updatedItem;
  };
  

  const handleView = (item) => {
    console.log('Voir', item);
    // Ajoutez votre logique pour l'action "View"
  };

  const handleApprove = (item) => {
    console.log('Approuver', item);
    // Ajoutez votre logique pour l'action "Approve"
  };

  const handleReject = (item) => {
    console.log('Rejeter', item);
    // Ajoutez votre logique pour l'action "Reject"
  };

  return (
    <div className="equipment-reports">
      <div className="search-header">
        <div className="search-container">
          <Search className="search-icon" />
          <input 
            placeholder="Rechercher du matériel..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="data-table-section">
        <EquipementTabs
          title="Rapports sur les équipements"
          description="Liste des équipements disponibles"
          searchPlaceholder="Rechercher un équipement"
          columns={columns}
          data={filteredData.map(item => handleEmptyCells(item))}
          onView={handleView}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}
