import React, { useState, useEffect, useRef } from "react";
import mlgFlag from "../../../../assets/images/.jpeg/mlgFlag.jpeg";
import engFlag from "../../../../assets/images/.jpeg/engFlag.jpeg";
import frFlag from "../../../../assets/images/.jpeg/frFlag.jpeg";
import { LuLogOut, LuUser } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import LogoutModal from "../../../../components/admin/Modal/Modal";
import "./adminHeader.scss"
import { Link } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
    label: "English",
    flag: engFlag,
  });
  const [modalVisible, setModalVisible] = useState(false); 
  const languageSelectorRef = useRef(null);
  const languages = [
    { code: "en", label: "English", flag: engFlag },
    { code: "mg", label: "Malagasy", flag: mlgFlag },
    { code: "fr", label: "Français", flag: frFlag },
  ];

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowMenu(false);
  };

  // Close dropdown when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogoutClick = () => {
    setModalVisible(true);
  };


  const handleCancel = () => {
    setModalVisible(false);
  };


  const handleConfirmLogout = () => {
    setModalVisible(false);
    <Link to="/"/>
    
  };
  return (
    <div className="Header">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input" 
        />
      </div>

      <div className="button-header">
        <div 
          className="language-selector" 
          ref={languageSelectorRef}
        >
          <button 
            className="lang-button" 
            onClick={() => setShowMenu(!showMenu)}
          >
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
                <li 
                  key={lang.code} 
                  onClick={() => handleSelectLanguage(lang)}
                >
                  <img 
                    src={lang.flag} 
                    alt={lang.label} 
                    className="flag-icon" 
                  />
                  {lang.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="user-actions">
            <LuUser className="user-icon" />
            <IoNotifications className="user-icon"/>
          <LuLogOut
           className="logout-icon" 
           onClick={handleLogoutClick} />
        </div>
      </div>
      <LogoutModal
        visible={modalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Header;