import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "../pages/admin/mainAdminPage";
import LoginPage from "../pages/auth/LoginPage";


function RoutesApplication() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminPage />} />  
 
    </Routes>
  );
}

export default RoutesApplication;
