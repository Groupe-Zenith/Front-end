"use client"

import { Search } from 'lucide-react'
import "./HistoryTab.scss"

export default function HistoryTab() {
  const historyItems = [
    { date: "2023-05-12", activity: "Viewed Report", section: "Equipment Reports", details: "Annual Inventory Report" },
    { date: "2023-05-10", activity: "Created Request", section: "Purchase Requests", details: "Office Supplies Order #1234" },
    { date: "2023-05-08", activity: "Updated Profile", section: "User Settings", details: "Changed department information" },
    { date: "2023-05-05", activity: "Viewed Report", section: "Equipment Reports", details: "Q1 Equipment Usage" }
  ];

  return (
    <div className="history-container">
      <div className="history-header">
        <h3>Historique de Navigation</h3>
        <p>Activite de navigation recente </p>
      </div>
      <div className="history-content">
        <div className="history-controls">
          <div className="search-wrapper">
            <input 
              placeholder="Chercher Historique..." 
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
                <th>Activite</th>
                <th>Section</th>
                <th>Details</th>
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