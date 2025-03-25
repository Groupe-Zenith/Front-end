"use client"

import { Search } from 'lucide-react'
import "./EquipmentReportsTab.scss"

export default function EquipmentReportsTab() {
  const reports = [
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
  ];

  return (
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
          <button className="generate-button">
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
  )
}