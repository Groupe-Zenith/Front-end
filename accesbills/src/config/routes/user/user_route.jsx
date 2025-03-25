import React from "react";
import { Route, Routes } from "react-router-dom";
import MainUserPage from "../../../pages/user/mainUserPage";
import ProfilePage from "../../../pages/user/layout/content/profil/ProfilPage";

const UserMain = () => {
  return (
    <Routes>
      <Route path="/user" element={<MainUserPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default UserMain;
