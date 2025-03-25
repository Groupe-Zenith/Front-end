import { useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import NewEquipmentReportModal from '../../user/NewEquipmentReportModal';
import './InventoryList.scss';

const InventoryList = ({ inventoryItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleReportClick = (item) => {
    setSelectedItem(item);
    setIsReportModalOpen(true);
  };

  const handleSubmitReport = (reportData) => {
    console.log('Signalement soumis pour:', selectedItem);
    console.log('Données du signalement:', reportData);
    // Ici vous enverriez les données à votre API
    setIsReportModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventaire des équipements</h2>
      </div>

      <div className="inventory-list">
        <div className="inventory-header-row">
          <div className="header-cell">Nom</div>
          <div className="header-cell">Catégorie</div>
          <div className="header-cell">Quantité</div>
          <div className="header-cell">État</div>
          <div className="header-cell">Localisation</div>
          <div className="header-cell">Actions</div>
        </div>

        {inventoryItems.map((item) => (
          <div key={item.id} className="inventory-item">
            <div className="item-cell" data-label="Nom">
              {item.name}
            </div>
            <div className="item-cell" data-label="Catégorie">
              {item.category}
            </div>
            <div className="item-cell" data-label="Quantité">
              {item.quantity}
            </div>
            <div className="item-cell" data-label="État">
              <span className={`status-badge ${item.condition}`}>
                {item.condition === 'new' && 'Neuf'}
                {item.condition === 'used' && 'Usagé'}
                {item.condition === 'damaged' && 'Endommagé'}
              </span>
            </div>
            <div className="item-cell" data-label="Localisation">
              {item.current_location}
            </div>
            <div className="item-cell actions" data-label="Actions">
              <button 
                className="report-button"
                onClick={() => handleReportClick(item)}
              >
                <AlertTriangle size={16} /> Signaler
              </button>
            </div>
          </div>
        ))}
      </div>

      <NewEquipmentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleSubmitReport}
        initialEquipmentId={selectedItem?.id}
      />
    </div>
  );
};

export default InventoryList;