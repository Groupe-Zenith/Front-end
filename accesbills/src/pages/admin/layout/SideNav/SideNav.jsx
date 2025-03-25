import React, { useState } from "react";
import { LuLayoutDashboard, LuUser, LuUserCheck, LuShoppingCart, LuBox ,LuMenu } from "react-icons/lu"; 
import logo_app from "/App_logo.png"
import classnames from "classnames";
import "./SideNav.scss";

const menus = [
  { title: "Dashboard", icon: <LuLayoutDashboard />, link: "/dashboard" },
  { title: "Employee Account", icon: <LuUser />, link: "/dashboard/employee-account" },
  { title: "Manager Account", icon: <LuUserCheck />, link: "/dashboard/manager-account" },
  { title: "Buying Request", icon: <LuShoppingCart />, link: "/dashboard/buying-request" },
  { title: "Inventory", icon: <LuBox />, link: "/dashboard/inventory" }
];

const SideNav= () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div id="sidebar" className={classnames("sidebar", { collapsed })}>
      <div className="sidebar-header">
        <img src={logo_app} alt="LOGO"  onClick={handleToggle}/>
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
