import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../../../pages/admin/mainAdminPage";

const RoutesDashboard = () => {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<AdminPage />} />
    </Routes>
  );
};

export default RoutesDashboard;
