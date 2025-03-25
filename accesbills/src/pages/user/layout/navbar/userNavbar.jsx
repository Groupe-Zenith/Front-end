import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Clock, FileText, Menu, Package, Settings, User, X } from "lucide-react";
import "./UserNavbar.scss";

export default function UserNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true); // État pour les notifications non lues

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <Package className="icon" />
          <span>AccesBills</span>
        </div>

        {/* User Menu avec notification */}
        <div className="user-menu-wrapper">
          {/* Icône de notification */}
          <div className="notification-icon">
            <Bell className="icon" />
            {hasUnreadNotifications && <span className="notification-badge"></span>}
          </div>

          {/* Menu utilisateur */}
          <div className="user-menu">
            <div className="user-icon">
              <User className="icon" />
            </div>
            <div className="dropdown">
              <p className="user-name">Mumu</p>
              <p className="user-email">muriella@example.com</p>
              <hr />
              <Link to="/profile" className="dropdown-item">
                <User className="icon" /> Profile
              </Link>
              <Link to="/settings" className="dropdown-item">
                <Settings className="icon" /> Parametre
              </Link>
              <hr />
              <button className="dropdown-item logout">Deconnexion</button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/history" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>
              <Clock className="icon" /> Historique
            </Link>
            <Link to="/purchase-requests" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>
              <FileText className="icon" /> Demande d'achat 
            </Link>
            <Link to="/equipment-reports" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>
              <Package className="icon" /> Signalement d'equipment
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}