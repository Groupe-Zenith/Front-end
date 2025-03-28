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
import ErrorPage from "../pages/errorPage/errorPage";
import ProtectedRoute from "../config/routes/protectedRoute/protectRoutes"

function RoutesApplication() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      
      {/* Protected Routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'admin_principal']}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/manager/*" 
        element={
          <ProtectedRoute allowedRoles={['manager']}>
            <ManagerPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/user/*" 
        element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'manager']}>
            <MainUserPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/user/profile" 
        element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'manager']}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/user/notifications" 
        element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'manager']}>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default RoutesApplication;
