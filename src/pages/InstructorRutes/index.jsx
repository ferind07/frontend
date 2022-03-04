import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavbarInstructor from "../../components/NavbarInstructor";
import RegisterInstructorPage from "../RegisterInstructorPage";
import InstructorPage from "../InstuctorPage";
import InstructorClass from "../InstructorClass";
import InstructorSchedule from "../InstructorSchedule";

const InstructorRoutes = () => {
  return (
    <React.Fragment>
      <NavbarInstructor />
      <Routes>
        <Route path="/" element={<RegisterInstructorPage />} />
        <Route path="/home" element={<InstructorPage />} />
        <Route path="/class" element={<InstructorClass />} />
        <Route path="/schedule" element={<InstructorSchedule />} />
      </Routes>
    </React.Fragment>
  );
};

export default InstructorRoutes;
