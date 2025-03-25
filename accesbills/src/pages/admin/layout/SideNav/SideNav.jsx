import React, { useState } from "react";
import { LuLayoutDashboard, LuUser, LuUserCheck, LuShoppingCart, LuBox ,LuMenu } from "react-icons/lu"; 
import classnames from "classnames";
import "./SideNav.scss";

const menus = [
  {
    title: "Dashboard",
    icon: <LuLayoutDashboard className="menu-icon" />,
    link: "/dashboard",
    submenu: [],
  },
  {
    title: "Employee Account",
    icon: <LuUser className="menu-icon" />,
    link: "/employee-account",
    submenu: [],
  },
  {
    title: "Manager Account",
    icon: <LuUserCheck className="menu-icon" />,
    link: "/manager-account",
    submenu: [],
  },
  {
    title: "Buying Request",
    icon: <LuShoppingCart className="menu-icon" />,
    link: "/buying-request",
    submenu: [],
  },
  {
    title: "Inventory",
    icon: <LuBox className="menu-icon" />,
    link: "/inventory",
    submenu: [],
  }
];

const SideNav= () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div id="sidebar" className={classnames("sidebar", { collapsed })}>
      <div className="sidebar-header">
        <span className="logo" onClick={handleToggle}>AK-B</span>
        <span className="text-logo">Acces Bill</span>
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
