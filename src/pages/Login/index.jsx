import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { AiFillLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Input, Button, message, notification } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function login() {
    axios({
      method: "post",
      url: BackendUrl + "/user/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        //console.log(response);
        //alert(response.data.msg);
        if (response.status == 200) {
          //alert("success login");
          notification.success({
            message: "Success Login",
            description: response.data.msg,
          });

          if (response.data.role == 2) {
            //instructor login
            if (response.data.status == 0) {
              notification.error({
                message: "User banned",
              });
            } else {
              window.localStorage.setItem("token", response.data.token);
              navigate("/instructor");
            }
          } else if (response.data.role == 1) {
            //user login
            if (response.data.status == 0) {
              notification.error({
                message: "User banned",
              });
            } else {
              window.localStorage.setItem("token", response.data.token);
              navigate("/");
            }
          } else {
            //admin login
            navigate("/admin");
          }
        } else {
          notification.error({
            message: "Login error",
            description: response.data.msg,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Register Fail",
          description: "Email already registered",
        });
      });
  }
  const onClickLogin = (e) => {
    e.preventDefault();

    if (email !== "") {
      if (password !== "") {
        login();
      } else {
        message.error("please input password");
      }
    } else {
      message.error("please input email");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-login">
        <h5>Log in to your account</h5>
        <hr style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }} />
        <AiOutlineUser size="5vw" />
        <div
          style={{
            marginTop: "1vw",
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Input
            size="large"
            placeholder="Email"
            prefix={<AiOutlineMail />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<AiFillLock />}
            className="mt-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="primary"
            size="large"
            style={{ background: "black", borderColor: "black" }}
            className="mt-2 w-100"
            onClick={(e) => {
              onClickLogin(e);
            }}
          >
            Log In
          </Button>
          <p className="mt-2">
            Don't have account <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
