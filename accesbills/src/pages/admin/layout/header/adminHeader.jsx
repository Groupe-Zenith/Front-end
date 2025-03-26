import React, { useState, useEffect, useRef } from "react";
import mlgFlag from "../../../../assets/images/.jpeg/mlgFlag.jpeg";
import engFlag from "../../../../assets/images/.jpeg/engFlag.jpeg";
import frFlag from "../../../../assets/images/.jpeg/frFlag.jpeg";
import { Bell, User, LucideLogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../../../../components/common/switchMode/themeToggle";
import "./adminHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAudio } from "../../../../assets/sounds/AudioContext";
import notifSound from "../../../../assets/sounds/notif.mp3";
import useSocket from "../../../../services/notificationService";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
    label: t("English"),
    flag: engFlag,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const languageSelectorRef = useRef(null);
  const { audioRef } = useAudio();

  // Utilisation du hook pour récupérer les demandes (pour éventuellement afficher des notifications, etc.)
  const { getAllPurchaseRequest ,purchaseRequests} = useSocket();
  console.log(purchaseRequests);
  
  const languages = [
    { code: "en", label: t("English"), flag: engFlag },
    { code: "mg", label: t("Malagasy"), flag: mlgFlag },
    { code: "fr", label: t("French"), flag: frFlag },
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

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirmLogout = () => {
    setModalVisible(false);
    navigate("/"); // Redirection après déconnexion
  };

  useEffect(() => {
    // Récupère toutes les demandes au montage du composant
    getAllPurchaseRequest();
  }, [getAllPurchaseRequest]);

  return (
    <div className="Header">
      <audio ref={audioRef} src={notifSound} preload="auto" />
      <div className="search-container">
        <input type="text" placeholder={t("Search")} className="search-input" />
      </div>
      <ThemeToggle />
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
          <Bell className="user-icon" />
          <LucideLogOut className="logout-icon" onClick={handleLogoutClick} />
        </div>
      </div>
    </div>
  );
};

export default Header;
