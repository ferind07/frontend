import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../AdminDashboard";
import NavbarAdmin from "../../components/NavbarAdmin";
import AdminMaster from "../AdminMaster";
import AdminReport from "../AdminReport";
import AdminInstructor from "../AdminInstructor";

const AdminRoute = () => {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/report" element={<AdminReport />} />
        <Route path="/master" element={<AdminMaster />} />
        <Route path="/instructor" element={<AdminInstructor />} />
      </Routes>
    </>
  );
};

export default AdminRoute;
