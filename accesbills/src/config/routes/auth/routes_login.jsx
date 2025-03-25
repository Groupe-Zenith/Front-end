import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../../pages/auth/LoginPage";

const RoutesLogin = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default RoutesLogin;
