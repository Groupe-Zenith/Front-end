import { useState } from 'react';
import { Search } from 'lucide-react';
import NewEquipmentReportModal from '../../../../../components/user/NewEquipmentReportModal';
import "./EquipmentReportsTab.scss";

export default function EquipmentReportsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState([
    { 
      id: "ER-2023-001", 
      equipment_id: "EQ-1001", 
      issue_type: "Panne", 
      description: "Écran ne s'allume plus", 
      status: "En attente",
      created_at: "2023-05-12"
    },
    { 
      id: "ER-2023-002", 
      equipment_id: "EQ-2045", 
      issue_type: "Maintenance", 
      description: "Clavier défectueux", 
      status: "Résolu",
      created_at: "2023-05-10"
    },
    { 
      id: "ER-2023-003", 
      equipment_id: "EQ-3012", 
      issue_type: "Panne", 
      description: "Souris sans fil ne fonctionne plus", 
      status: "En attente",
      created_at: "2023-05-08"
    }
  ]);

  const handleNewReportClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitReport = (newReport) => {
    // Simuler la création d'un nouveau signalement
    const newReportWithId = {
      ...newReport,
      id: `ER-${new Date().getFullYear()}-${reports.length + 1}`
    };
    
    console.log('Nouveau signalement soumis:', newReportWithId);
    
    setReports([newReportWithId, ...reports]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="equipment-reports">
        <div className="reports-header">
          <h3>Signalement d'équipement</h3>
          <p>Liste de vos signalements d'équipements défectueux ou en panne.</p>
        </div>
        <div className="reports-content">
          <div className="reports-controls">
            <div className="search-container">
              <input 
                placeholder="Rechercher un signalement..." 
                className="search-input"
              />
              <button className="search-button">
                <Search className="search-icon" />
              </button>
            </div>
            <button 
              className="generate-button"
              onClick={handleNewReportClick}
            >
              Nouveau signalement
            </button>
          </div>
          
          <div className="reports-grid">
            {reports.map((report, index) => (
              <div key={index} className="report-card">
                <div className="card-header">
                  <h4>Signalement #{report.id}</h4>
                  <span className={`status-badge ${report.status === "Résolu" ? "status-resolved" : "status-pending"}`}>
                    {report.status}
                  </span>
                </div>
                <div className="card-content">
                  <p><strong>Équipement:</strong> {report.equipment_id}</p>
                  <p><strong>Type de problème:</strong> {report.issue_type}</p>
                  <p><strong>Description:</strong> {report.description}</p>
                  <p className="report-date">Date: {report.created_at}</p>
                  <button className="view-button">Voir détails</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewEquipmentReportModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmitReport}
      />
    </>
  );
}