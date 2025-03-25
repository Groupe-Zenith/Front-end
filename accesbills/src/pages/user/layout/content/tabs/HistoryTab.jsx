"use client"

import { Search } from 'lucide-react'
import "./HistoryTab.scss"

export default function HistoryTab() {
  const historyItems = [
    { 
      date: "2023-05-15", 
      activity: "Signalement créé", 
      section: "Équipements", 
      details: "Signalement #ER-2023-004 - Souris défectueuse" 
    },
    { 
      date: "2023-05-12", 
      activity: "Demande d'achat", 
      section: "Achats", 
      details: "Demande #PR-2023-005 - Nouveau clavier" 
    },
    { 
      date: "2023-05-10", 
      activity: "Signalement mis à jour", 
      section: "Équipements", 
      details: "Signalement #ER-2023-002 résolu" 
    },
    { 
      date: "2023-05-08", 
      activity: "Profil modifié", 
      section: "Compte", 
      details: "Mise à jour des informations personnelles" 
    }
  ];

  return (
    <div className="history-container">
      <div className="history-header">
        <h3>Historique des Activités</h3>
        <p>Vos actions récentes sur la plateforme</p>
      </div>
      <div className="history-content">
        <div className="history-controls">
          <div className="search-wrapper">
            <input 
              placeholder="Rechercher dans l'historique..." 
              className="search-input"
            />
            <button className="search-button">
              <Search className="search-icon" />
            </button>
          </div>
        </div>
        
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Activité</th>
                <th>Section</th>
                <th>Détails</th>
              </tr>
            </thead>
            <tbody>
              {historyItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.activity}</td>
                  <td>{item.section}</td>
                  <td>{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}