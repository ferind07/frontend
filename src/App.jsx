import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import DetailInstructor from "./pages/DetailInstructor";
import AdminPage from "./pages/AdminPage";
import InstructorRoutes from "./pages/InstructorRutes";
import InstructorPage from "./pages/instuctorPage";
import Agung from "./pages/agung";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/agung" element={<Agung />} />
          <Route path="/detailInstructor" element={<DetailInstructor />} />
          <Route path="/instructor/*" element={<InstructorRoutes />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/instructorPage" element={<InstructorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
