import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardContent from "./layout/content/DashboardContent";
import SideNav from "./layout/SideNav/SideNav";
import Header from "./layout/header/adminHeader";
import Manager from "./layout/content/Dashboard/Dashboard";
import ProductList from "./layout/content/Product/Product";
import OrderList from "./layout/content/Command/Command";
import Financial from "./layout/content/Financial/Financial";
import "./mainManager.scss";

const ManagerPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`layout ${collapsed ? "collapsed" : ""}`}>
            <SideNav />
            <Header />
            <div className="main-content">
                <DashboardContent>
                    <Routes>
                        <Route index element={<Manager />} />
                        <Route path="productlist" element={<ProductList />} />
                        <Route path="commandlist" element={<OrderList />} />
                        <Route path="financial" element={<Financial />} />
                    </Routes>
                </DashboardContent>
            </div>
        </div>
    );
};

export default ManagerPage;
