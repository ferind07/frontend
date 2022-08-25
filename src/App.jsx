import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import DetailInstructor from "./pages/DetailInstructor";
import InstructorRoutes from "./pages/InstructorRoutes";
import AdminRoute from "./pages/AdminRoute";
import MyAccount from "./pages/myAccount";
import ExploreClass from "./pages/ExploreClass";
import Schedule from "./pages/Schedule";
import io from "socket.io-client";
import BackendUrl from "./components/BackendUrl";
import { notification } from "antd";
import TutoringPage from "./pages/TutoringPage";
import UserDashboard from "./pages/UserDashboard";
import Payment from "./pages/Payment";
import ReviewPage from "./pages/ReviewPage";
import ForgetPassword from "./pages/ForgetPassword";
import UserCashOut from "./pages/UserCashOut";
import ResultPage from "./pages/ResultPage";
import ActiveUser from "./pages/ActiveUser";
import ReportPage from "./pages/reportPage";
import AdminDashboardTemplate from "./pages/AdminDashboardTemplate";
import "./assets/styles/main.css";

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
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/tutoring/:id"
          element={<TutoringPage socket={socket} />}
        />
        <Route path="/schedule" element={<Schedule socket={socket} />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/instructor/*" element={<InstructorRoutes />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/reportPage" element={<ReportPage />} />
        <Route path="/userCashOut" element={<UserCashOut />} />
        <Route path="/resultPage/:id" element={<ResultPage />} />
        <Route path="/activeUser/:id" element={<ActiveUser />} />
        <Route
          path="/adminDashboardTemplate"
          element={<AdminDashboardTemplate />}
        />
      </Routes>
    </>
  );
};

export default App;
