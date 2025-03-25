"use client"

import { useState } from "react"
import { Clock, FileText, Package } from 'lucide-react'
import HistoryTab from "./tabs/HistoryTab"
import PurchaseRequestsTab from "./tabs/PurchaseRequestsTab"
import EquipmentReportsTab from "./tabs/EquipmentReportsTab"
import "./UserContent.scss"

export default function UserContent() {
  const [activeTab, setActiveTab] = useState("history")

  return (
    <main className="user-content">
      <div className="content-container">
        <div className="tab-buttons-group" role="group">
          <button
            onClick={() => setActiveTab("history")}
            className={`tab-button ${activeTab === "history" ? 'active' : ''}`}
          >
            <Clock className="icon" />
            <span className="text">Historique</span>
          </button>
          <button
            onClick={() => setActiveTab("purchase-requests")}
            className={`tab-button ${activeTab === "purchase-requests" ? 'active' : ''}`}
          >
            <FileText className="icon" />
            <span className="text">Demande d'achat</span>
          </button>
          <button
            onClick={() => setActiveTab("equipment-reports")}
            className={`tab-button ${activeTab === "equipment-reports" ? 'active' : ''}`}
          >
            <Package className="icon" />
            <span className="text">Signalement d'etat d'equipement </span>
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "history" && <HistoryTab />}
          {activeTab === "purchase-requests" && <PurchaseRequestsTab />}
          {activeTab === "equipment-reports" && <EquipmentReportsTab />}
        </div>
      </div>
    </main>
  )
}