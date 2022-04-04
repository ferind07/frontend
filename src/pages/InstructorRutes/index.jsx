import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavbarInstructor from "../../components/NavbarInstructor";
import RegisterInstructorPage from "../RegisterInstructorPage";
import InstructorPage from "../InstuctorPage";
import InstructorClass from "../InstructorClass";
import InstructorSchedule from "../InstructorSchedule";
import InstructorDetailSchedule from "../InstructorDetailSchedule/index.jsx";
import InstructorDetailClass from "../InstructorDetailClass";

const InstructorRoutes = () => {
  return (
    <React.Fragment>
      <NavbarInstructor />
      <Routes>
        <Route path="/" element={<RegisterInstructorPage />} />
        <Route path="/home" element={<InstructorPage />} />
        <Route path="/class" element={<InstructorClass />} />
        <Route path="/schedule" element={<InstructorSchedule />} />
        <Route path="/detailClass/:id" element={<InstructorDetailClass />} />
        <Route
          path="/detailSchdule/:id"
          element={<InstructorDetailSchedule />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default InstructorRoutes;
