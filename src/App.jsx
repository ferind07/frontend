import React, { useEffect, useRef } from "react";
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
import Schedule from "./pages/Schedule";
import io from "socket.io-client";
import BackendUrl from "./components/BackendUrl";
import { notification } from "antd";
import TutoringPage from "./pages/TutoringPage";

const App = () => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(BackendUrl, {
      transports: ["websocket"],
    });

    socket.current.on("notif", (data) => {
      notification.success({
        description: "ada notif",
        message: "notifikasi",
        duration: 0,
      });
    });
    checkLogin();
  }, []);

  function checkLogin() {
    if (localStorage.getItem("token") != null) {
      socket.current.emit("login", {
        token: localStorage.getItem("token"),
      });
      console.log("success login");
    }
  }

  function login(token) {
    socket.current.emit("login", {
      token: token,
    });
    console.log("success login");
  }
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login loginSocket={login} />} />
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="/detailInstructor/:id" element={<DetailInstructor />} />
        <Route path="/exploreClass/:id" element={<ExploreClass />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route
          path="/tutoring/:id"
          element={<TutoringPage socket={socket} />}
        />
        <Route path="/schedule" element={<Schedule socket={socket} />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/instructor/*" element={<InstructorRoutes />} />
      </Routes>
    </>
  );
};

export default App;
