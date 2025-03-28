import React, { useState, useEffect } from "react";
import { LuLayoutDashboard, LuUser, LuUserCheck, LuBox, LuMenu , LuShoppingBag } from "react-icons/lu"; 
import logo_app from "/App_logo.png";
import classnames from "classnames";
import { useTranslation } from 'react-i18next';
import { startDriverIntro } from "../../../../utils/Driver/IntroGuide";
import "./SideNav.scss";

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
 
  useEffect(() => {
    startDriverIntro();  
  }, []);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const menus = [
    { title: t("Dashboard"), icon: <LuLayoutDashboard />, link: "/admin" },
    { title: t("Employees"), icon: <LuUser />, link: "/admin/employee-account" },
    { title: t("Manager"), icon: <LuUserCheck />, link: "/admin/manager-account" },
    {title: t("Request"), icon: <LuShoppingBag />, link: "/admin/request-list" },
    { title: t("Invotory"), icon: <LuBox />, link: "/admin/inventory" }
  ];

  return (
    <div id="sidebar" className={classnames("sidebar", { collapsed })}>
      <div className="sidebar-header">
        <img src={logo_app} alt="LOGO" onClick={handleToggle} />
        <span className="text-logo">AccesBills</span>
        <button onClick={handleToggle} className="sidebar-collapser">
          <LuMenu className="io-menu" />
        </button>
      </div>

      <div className="sidebar-content">
        <ul className="menu">
          {menus.map((menu, index) => (
            <li key={index} className="menu-item">
              <a href={menu.link}>
                {menu.icon}
                <span>{menu.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
