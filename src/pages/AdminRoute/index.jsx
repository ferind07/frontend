import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../AdminDashboard";
import NavbarAdmin from "../../components/NavbarAdmin";
import AdminMaster from "../AdminMaster";
import AdminReport from "../AdminReport";
import AdminInstructor from "../AdminInstructor";
import AdminDirbushment from "../AdminDirbushment";
import AdminDetailInstructor from "../AdminDetailInstructor";
import AdminProblem from "../AdminProblem";
import AdminDetailProblem from "../AdminDetailProblem";

const AdminRoute = () => {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/report" element={<AdminReport />} />
        <Route path="/master" element={<AdminMaster />} />
        <Route path="/instructor" element={<AdminInstructor />} />
        <Route path="/dirbushment" element={<AdminDirbushment />} />
        <Route path="/problem" element={<AdminProblem />} />
        <Route
          path="/detailInstructor/:id"
          element={<AdminDetailInstructor />}
        />
        <Route path="/detailProblem/:id" element={<AdminDetailProblem />} />
      </Routes>
    </>
  );
};

export default AdminRoute;
