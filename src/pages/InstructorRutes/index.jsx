import React from "react";
import { Routes, Route } from "react-router-dom";
import InstructorPage from "../instuctorPage/index";

const InstructorRoutes = () => {
  console.log("routes");
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<InstructorPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default InstructorRoutes;
