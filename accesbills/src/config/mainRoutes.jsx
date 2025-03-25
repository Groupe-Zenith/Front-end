import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "../pages/admin/mainAdminPage";
import LoginPage from "../pages/auth/LoginPage";
import MainUserPage from "../pages/user/mainUserPage";


function RoutesApplication() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminPage />} />  
      <Route path="/user" element={<MainUserPage/>}/>
    </Routes>
  );
}

export default RoutesApplication;
