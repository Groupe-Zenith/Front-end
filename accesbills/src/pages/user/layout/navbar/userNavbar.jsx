import { useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { Bell, Clock, FileText, Menu, Package, Settings, User, X } from "lucide-react";
=======
import { Bell, TableOfContents, Menu, Package, Settings, User, X } from "lucide-react";
import ThemeToggle from "../../../../components/common/switchMode/themeToggle";
>>>>>>> ef90b9b0c6b900755044b1efbb5217e089d2400e
import "./UserNavbar.scss";

export default function UserNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
<<<<<<< HEAD
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true); // État pour les notifications non lues
=======
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const handleNotificationClick = () => {
    setHasUnreadNotifications(false); 
  };
>>>>>>> ef90b9b0c6b900755044b1efbb5217e089d2400e

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <Package className="icon" />
          <span>AccesBills</span>
        </div>

<<<<<<< HEAD
        {/* User Menu avec notification */}
        <div className="user-menu-wrapper">
          {/* Icône de notification */}
          <div className="notification-icon">
            <Bell className="icon" />
            {hasUnreadNotifications && <span className="notification-badge"></span>}
          </div>

          {/* Menu utilisateur */}
=======
        <div className="desktop-controls">
          <ThemeToggle />
          <Link to="/notifications" className="notification-icon" onClick={handleNotificationClick}>
            <Bell className="icon" />
            {hasUnreadNotifications && <span className="notification-badge"></span>}
          </Link>

>>>>>>> ef90b9b0c6b900755044b1efbb5217e089d2400e
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
<<<<<<< HEAD
              <Link to="/settings" className="dropdown-item">
                <Settings className="icon" /> Parametre
=======
              <Link to="/user" className="dropdown-item">
                <TableOfContents className="icon" />Contenue
>>>>>>> ef90b9b0c6b900755044b1efbb5217e089d2400e
              </Link>
              <hr />
              <button className="dropdown-item logout">Deconnexion</button>
            </div>
          </div>
        </div>

        <button className="menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
        </button>
      </div>
    </nav>
  );
}