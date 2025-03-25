import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "../pages/admin/mainAdminPage";
import LoginPage from "../pages/auth/LoginPage";
import MainUserPage from "../pages/user/mainUserPage";
import EmployeeList from "../pages/admin/layout/content/Employee/Employee";
import ManagerList from "../pages/admin/layout/content/Manager/Manager";
import Dashboard from "../pages/admin/layout/content/Dashboard/Dashboard";

function RoutesApplication() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/dashboard/*" element={<AdminPage />}>
        <Route index element={<Dashboard />} /> 
        <Route path="employee-account" element={<EmployeeList />} />
        <Route path="manager-account" element={<ManagerList />} />
      </Route>

      <Route path="/user" element={<MainUserPage />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default RoutesApplication;
