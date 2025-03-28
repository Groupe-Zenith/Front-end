import React, { useState, useEffect, useRef } from "react";
import mlgFlag from "../../../../assets/images/.jpeg/mlgFlag.jpeg";
import engFlag from "../../../../assets/images/.jpeg/engFlag.jpeg";
import frFlag from "../../../../assets/images/.jpeg/frFlag.jpeg";
import { Bell, User, LucideLogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../../../../assets/sounds/AudioContext";
import notifSound from "../../../../assets/sounds/notif.mp3";
import useSocket from "../../../../services/notificationService";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../../../../components/common/switchMode/themeToggle";
import "./adminHeader.scss";


const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "fr",
    label: t("Français"),
    flag: frFlag,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [modalNotification, setModalNotification] = useState(false);
  const languageSelectorRef = useRef(null);
  const { audioRef } = useAudio();

  const { getAllPurchaseRequest,updateStatus, purchaseRequests } = useSocket();

  console.log(purchaseRequests);
  
  const languages = [
    { code: "fr", label: t("French"), flag: frFlag },
    { code: "mg", label: t("Malagasy"), flag: mlgFlag },
    { code: "en", label: t("English"), flag: engFlag },
  ];

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowMenu(false);
    i18n.changeLanguage(language.code);
    audioRef.current
      .play()
      .catch((error) => console.log("Playback prevented: ", error));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageSelectorRef.current &&
        !languageSelectorRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setModalVisible(true);
  };

  const handleConfirmLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('authToken');
    
    // Redirection vers le login
    navigate("/", { replace: true });
    setModalVisible(false);
  };

  const handleNotificationClick = () => {
    setModalNotification(true); // Show notification modal when clicking on the bell
  };

  useEffect(() => {
    getAllPurchaseRequest('pending');
    console.log("Purchase Requests", purchaseRequests);
    
  }, [getAllPurchaseRequest]);

  return (
    <header className="Header">
      <audio ref={audioRef} src={notifSound} preload="auto" />
      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder={t("navBar.Search")} className="search-input" />
      </div>
      <ThemeToggle className="Toggle-menu"/>
      <div className="button-header">
        <div className="language-selector" ref={languageSelectorRef}>
          <button className="lang-button" onClick={() => setShowMenu(!showMenu)}>
            <img
              src={selectedLanguage.flag}
              alt={selectedLanguage.label}
              className="flag-icon"
            />
            ▼
          </button>
          {showMenu && (
            <ul className="lang-menu">
              {languages.map((lang) => (
                <li key={lang.code} onClick={() => handleSelectLanguage(lang)}>
                  <img src={lang.flag} alt={lang.label} className="flag-icon" />
                  {lang.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="user-actions">
          <User className="user-icon" />
          <div className="notification-container">
            <Bell className="user-icon" onClick={handleNotificationClick} />
            {purchaseRequests.length > 0 && (
              <span className="notification-badge">{purchaseRequests.length}</span>
            )}
          </div>
          <LucideLogOut className="logout-icon" onClick={handleLogoutClick} />
        </div>
      </div>

      {modalVisible && (
        <div className="logout-modal">
          <div className="modal-content">
            <h2>{t("Deconnexion")}</h2>
            <p>{t("Etes vous sure de vous deconnecter?")}</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModalVisible(false)}>
                {t("Annuler")}
              </button>
              <button className="btn btn-primary" onClick={handleConfirmLogout}>
                {t("Oui")}
              </button>
            </div>
          </div>
        </div>
      )}

{modalNotification && (
  <div className="notification-modal">
    <div className="modal-container">
      <h2 className="modal-title">{t("Notifications")}</h2>
      <ul className="notification-list">
        {purchaseRequests.map((request, index) => (
          <li key={index} className="notification-item">
            <h3 className="notification-text">
              <b>{t("Venant de")}</b>: <strong>{request.user_id.email}</strong>
            </h3>
            <p className="notification-text">
              {t("Détails")}: <em>{request.item_name}</em>
            </p>
            <p className="notification-status" onClick={()=>updateStatus(request._id,"approved")}>
              {t("Action")}: <span className={`status-${request.status.toLowerCase()}`} style={{ backgroundColor: 'green' }}>Accepter</span>
            </p>
            <p className="notification-status" onClick={()=>updateStatus(request._id,"rejected")}>
              {t("Action")}: <span className={`status-${request.status.toLowerCase()}`} style={{ backgroundColor: 'red' }}>Rejeter</span>
            </p>

          </li>
        ))}
      </ul>
      <div className="modal-footer">
        <button className="btn-close" onClick={() => setModalNotification(false)}>
          {t("Fermer")}
        </button>
      </div>
    </div>
  </div>
)}

    </header>
  );
};

export default Header;
