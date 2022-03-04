import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import DetailInstructor from "./pages/DetailInstructor";
import InstructorRoutes from "./pages/InstructorRutes";
import AdminRoute from "./pages/AdminRoute";
import MyAccount from "./pages/myAccount";
import ExploreClass from "./pages/ExploreClass";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="/detailInstructor/:id" element={<DetailInstructor />} />
        <Route path="/exploreClass/:id" element={<ExploreClass />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/instructor/*" element={<InstructorRoutes />} />
      </Routes>
    </>
  );
};

export default App;
