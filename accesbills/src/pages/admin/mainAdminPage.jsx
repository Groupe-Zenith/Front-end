import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import DashboardContent from "./layout/content/DashboardContent";
import SideNav from "./layout/SideNav/SideNav";
import Header from "./layout/header/adminHeader";
import Dashboard from "./layout/content/Dashboard/Dashboard";
import "./mainAdmin.scss";

const AdminPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={`layout ${collapsed ? "collapsed" : ""}`}>
            <SideNav />
            <Header />
            <div className="main-content">
              
                <DashboardContent>
                   <Outlet/>
                    <Dashboard/>
                </DashboardContent>
            </div>
        </div>
    )
}
export default AdminPage;