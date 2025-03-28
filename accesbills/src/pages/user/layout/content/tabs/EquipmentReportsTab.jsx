import { useState } from 'react';
import { Search } from 'lucide-react';
import InventoryList from '../../../../../components/common/inventoryList/inventoryList';
import "./EquipmentReportsTab.scss";

export default function EquipmentReportsTab() {
  const [inventoryData, setInventoryData] = useState([
    {
      id: 'EQ-1001',
      name: 'Ordinateur Portable Dell XPS',
      category: 'Informatique',
      quantity: 5,
      condition: 'new',
      purchase_date: '2023-05-15',
      order_id: 'CMD-2023-042',
      current_location: 'Bureau 101',
      notes: 'Neuf, jamais utilisé'
    },
    {
      id: 'EQ-2045',
      name: 'Écran 24" Samsung',
      category: 'Informatique',
      quantity: 3,
      condition: 'used',
      purchase_date: '2022-11-10',
      order_id: 'CMD-2022-187',
      current_location: 'Salle de conférence',
      notes: 'Bon état général'
    },
    {
      id: 'EQ-3012',
      name: 'Clavier sans fil Logitech',
      category: 'Périphérique',
      quantity: 2,
      condition: 'damaged',
      purchase_date: '2023-01-20',
      order_id: 'CMD-2023-015',
      current_location: 'Entrepôt',
      notes: 'Certaines touches ne fonctionnent pas'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventoryData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.current_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="inventory-section">
        <InventoryList inventoryItems={filteredInventory} />
      </div>
    </div>
  );
}