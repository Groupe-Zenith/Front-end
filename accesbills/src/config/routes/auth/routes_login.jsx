import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../../pages/auth/LoginPage";
import Signup from "../../../pages/auth/SignupPage";

const RoutesLogin = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default RoutesLogin;
