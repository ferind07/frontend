import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavbarInstructor from "../../components/NavbarInstructor";
import RegisterInstructorPage from "../RegisterInstructorPage";
import InstructorPage from "../InstuctorPage";
import InstructorClass from "../InstructorClass";
import InstructorSchedule from "../InstructorSchedule";
import InstructorDetailSchedule from "../InstructorDetailSchedule/index.jsx";
import InstructorDetailClass from "../InstructorDetailClass";
import InstructorAboutMe from "../InstructorAboutMe";
import InstructorWaiting from "../InstructorWaiting";
import InstructorDirbushment from "../InstructorDirbushment";

const InstructorRoutes = () => {
  const location = useLocation().pathname;
  const navbar = () => {
    if (location == "/instructor" || location == "/instructor/waiting") {
      return <NavbarInstructor register />;
    } else {
      return <NavbarInstructor />;
    }
  };
  return (
    <React.Fragment>
      {navbar()}
      <Routes>
        <Route path="/" element={<RegisterInstructorPage />} />
        <Route path="/waiting" element={<InstructorWaiting />} />
        <Route path="/home" element={<InstructorPage />} />
        <Route path="/class" element={<InstructorClass />} />
        <Route path="/schedule" element={<InstructorSchedule />} />
        <Route path="/aboutMe" element={<InstructorAboutMe />} />
        <Route path="/dirbushment" element={<InstructorDirbushment />} />
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
