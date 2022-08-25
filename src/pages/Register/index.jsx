import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  AiFillLock,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineMobile,
} from "react-icons/ai";
import { Input, Button, Menu, Dropdown, notification, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import "./index.css";
import BackendUrl from "../../components/BackendUrl";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleMenuClick(e) {
    //e.preventDefault();
    if (e.key == 1) {
      message.info("Role user selected");
      setRole(e.key);
      console.log(e.key);
    } else {
      message.info("Role instructor selected");
      setRole(e.key);
      console.log(e.key);
    }
  }

  function returnRole() {
    if (role == 0) {
      return "Choose role";
    } else if (role == 1) {
      return "Register as user";
    } else {
      return "Register as instructor";
    }
  }

  const [emailError, setEmailError] = useState({});
  const [nameError, setNameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(
    {}
  );
  const [phoneNumberError, setPhoneNumberError] = useState({});

  function validateEmail(email) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return true;
    } else {
      if (email == "") {
        message.error("Insert email");
        return false;
      }
      message.error("Wrong email");
      return false;
    }
  }

  function validateInput() {
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError({ borderColor: "red" });
      valid = false;
    }
    if (
      password == "" ||
      email == "" ||
      passwordConfirmation == "" ||
      phoneNumber == "" ||
      name == ""
    ) {
      if (password == "") setPasswordError({ borderColor: "red" });
      if (passwordConfirmation == "")
        setPasswordConfirmationError({ borderColor: "red" });
      if (phoneNumber == "") setPhoneNumberError({ borderColor: "red" });
      if (name == "") setNameError({ borderColor: "red" });
      valid = false;
    }
    if (password != passwordConfirmation) {
      setPasswordConfirmationError({ borderColor: "red" });
      message.error("Password confirmation error");
      valid = false;
    }
    if (phoneNumber.length < 12) {
      setPhoneNumberError({ borderColor: "red" });
      message.error("Invalid phone number");
      valid = false;
    }
    if (role == 0) {
      message.error("Please select role");
      valid = false;
    }
    return valid;
  }

  function register() {
    axios({
      method: "post",
      url: BackendUrl + "/user/register",
      data: {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        role: role,
        name: name,
      },
    })
      .then((response) => {
        alert(response.data.msg);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Register Fail",
          description: "Email already registered",
        });
      });
  }

  const registerClick = (e) => {
    e.preventDefault();
    //alert(role);
    if (validateInput()) {
      register();
    }
  };

  const menu = (
    <Menu onClick={(e) => handleMenuClick(e)}>
      <Menu.Item key="1">User</Menu.Item>
      <Menu.Item key="2">Instructor</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Navbar />
      <div className="container-login">
        <div className="d-flex justify-content-center" style={{ gap: "10px" }}>
          <h5 className="mb-0">Register to </h5>
          <div className="d-flex justify-content-center">
            <img src="/asset/image/logo.png" width="40px" />
            <p className="nav-title mb-0">DEMY</p>
          </div>
        </div>

        <hr style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }} />
        <AiOutlineUserAdd size="5vw" />
        <div
          style={{
            marginTop: "1vw",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Input
            size="large"
            placeholder="Email"
            prefix={<AiOutlineMail />}
            style={emailError}
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
            style={passwordError}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Input.Password
            size="large"
            placeholder="Password confirmation"
            prefix={<AiFillLock />}
            className="mt-2"
            visibilityToggle={false}
            value={passwordConfirmation}
            style={passwordConfirmationError}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
          />
          <Input
            size="large"
            placeholder="Name"
            prefix={<AiOutlineUser />}
            className="mt-2"
            value={name}
            style={nameError}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            className="w-100 mt-2"
            controls={false}
            placeholder="Phone number"
            type="number"
            prefix={<AiOutlineMobile />}
            value={phoneNumber}
            style={phoneNumberError}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />

          <Dropdown overlay={menu} className="mt-2" trigger={["click"]}>
            <Button style={{ width: "100%" }}>
              {returnRole()} <DownOutlined />
            </Button>
          </Dropdown>

          <Button
            type="primary"
            size="large"
            style={{ background: "black", borderColor: "black" }}
            className="mt-2 w-100"
            onClick={(e) => {
              registerClick(e);
            }}
          >
            Register
          </Button>

          <p className="mt-2">
            Already have account <a href="/login">Login</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
