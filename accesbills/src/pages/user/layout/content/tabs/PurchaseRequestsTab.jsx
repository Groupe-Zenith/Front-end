"use client"

import { Search } from 'lucide-react'
import "./PurchaseRequestsTab.scss"

export default function PurchaseRequestsTab() {
  const requests = [
    { id: "PR-2023-001", date: "2023-05-10", items: "Fournitures de bureau", status: "En attente", statusClass: "status-pending" },
    { id: "PR-2023-002", date: "2023-04-28", items: "Équipement informatique", status: "Approuvé", statusClass: "status-approved" },
    { id: "PR-2023-003", date: "2023-04-15", items: "Licences logicielles", status: "Rejeté", statusClass: "status-rejected" }
  ];

  return (
    <div className="purchase-requests-container">
      <div className="header-section">
        <h3>Demande d'achat</h3>
        <p>Demande d'achat recement</p>
      </div>
      <div className="content-section">
        <div className="controls-wrapper">
          <div className="search-container">
            <input 
              placeholder="rechercher demande..." 
              className="search-input"
            />
            <button className="search-button">
              <Search className="search-icon" />
            </button>
          </div>
          <button className="new-request-button">
            Nouvelle demande
          </button>
        </div>
        
        <div className="table-container">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Date</th>
                <th>Bien</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.items}</td>
                  <td>
                    <span className={`status-badge ${item.statusClass}`}>{item.status}</span>
                  </td>
                  <td>
                    <button className="view-button">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}