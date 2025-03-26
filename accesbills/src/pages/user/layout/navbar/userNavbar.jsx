import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, TableOfContents, Menu, Package, Settings, User, X } from "lucide-react";
import ThemeToggle from "../../../../components/common/switchMode/themeToggle";
import "./UserNavbar.scss";

export default function UserNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const handleNotificationClick = () => {
    setHasUnreadNotifications(false); 
  };
  const userRole = JSON.parse(localStorage.getItem("user"));
  ;
  console.log(userRole);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <Package className="icon" />
          <span>AccesBills</span>
        </div>

        <div className="desktop-controls">
          <ThemeToggle />
          <Link to="/notifications" className="notification-icon" onClick={handleNotificationClick}>
            <Bell className="icon" />
            {hasUnreadNotifications && <span className="notification-badge"></span>}
          </Link>

          <div className="user-menu">
            <div className="user-icon">
              <User className="icon" />
            </div>
            <div className="dropdown">
              <p className="user-name">{userRole.first_name}</p>
              <p className="user-email">{userRole.email}</p>
              <hr />
              <Link to="/profile" className="dropdown-item">
                <User className="icon" /> Profile
              </Link>
              <Link to="/user" className="dropdown-item">
                <TableOfContents className="icon" />Contenue
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