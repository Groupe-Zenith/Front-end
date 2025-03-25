import React from "react";
import { Route, Routes } from "react-router-dom";
import MainUserPage from "../../../pages/user/mainUserPage";

const UserMain = () => {
  return (
    <Routes>
      <Route path="/user" element={<MainUserPage />} />
    </Routes>
  );
};

export default UserMain;
