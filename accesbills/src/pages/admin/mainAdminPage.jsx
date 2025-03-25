import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import DashboardContent from "./layout/content/DashboardContent";
import SideNav from "./layout/SideNav/SideNav";
import Header from "./layout/header/adminHeader";
import "./mainAdmin.scss";

const AdminPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={`layout ${collapsed ? "collapsed" : ""}`}>
            <SideNav />
            <div className="main-content">
                <Header />
                <DashboardContent>
                   <Outlet/>
                </DashboardContent>
            </div>
        </div>
    )
}
export default AdminPage;