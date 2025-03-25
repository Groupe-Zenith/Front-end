"use client"

import { Search } from 'lucide-react'
import "./EquipmentReportsTab.scss"

export default function EquipmentReportsTab() {
  const reports = [
    { title: "Annual Inventory", value: "243 items", date: "May 12, 2023" },
    { title: "Q1 Equipment Usage", value: "87% utilization", date: "May 5, 2023" },
    { title: "Maintenance Schedule", value: "12 upcoming", date: "May 1, 2023" }
  ];

  return (
    <div className="equipment-reports">
      <div className="reports-header">
        <h3>Signalement d'equipement</h3>
        <p>Afficher et générer des rapports sur l'inventaire et l'utilisation des équipements.</p>
      </div>
      <div className="reports-content">
        <div className="reports-controls">
          <div className="search-container">
            <input 
              placeholder="recherche..." 
              className="search-input"
            />
            <button className="search-button">
              <Search className="search-icon" />
            </button>
          </div>
          <button className="generate-button">
            Signaler un equipement
          </button>
        </div>
        
        <div className="reports-grid">
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <div className="card-header">
                <h4>{report.title}</h4>
              </div>
              <div className="card-content">
                <div className="report-value">{report.value}</div>
                <p className="report-date">Last updated: {report.date}</p>
                <button className="view-button">View Report</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}