import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "../pages/admin/mainAdminPage";
import ManagerPage from "../pages/manager/mainManagerPage";
import LoginPage from "../pages/auth/LoginPage";
import Signup from "../pages/auth/SignupPage";
import MainUserPage from "../pages/user/mainUserPage";
import ProfilePage from "../pages/user/layout/content/profil/ProfilPage";
import NotificationsPage from "../pages/user/layout/content/notification/NotificationPage";
import OTPVerification from "../pages/auth/OTPVerification";

function RoutesApplication() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/dashboard/*" element={<AdminPage />} /> 
      <Route path="/manager-dashboard/*" element={<ManagerPage/>}/>    
      <Route path="/user" element={<MainUserPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
    </Routes>
  );
}

export default RoutesApplication;
