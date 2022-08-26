import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const navigate = useNavigate();

  const onClickLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    notification.info({
      message: "Success logout",
    });
    navigate("/");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar-admin justify-content-between">
          <div className="d-flex">
            <Link to="#" className="menu-bars center">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <h3
              style={{
                marginBottom: "0px",
                marginLeft: "1rem",
                color: "white",
              }}
              className="center"
            >
              Welcome Admin
            </h3>
          </div>

          <div style={{ paddingRight: "1rem" }}>
            <button
              className="btn btn-danger"
              onClick={(e) => onClickLogout(e)}
            >
              Logout
            </button>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle justify-content-center w-100">
              <Link
                to="#"
                className="menu-bars d-flex"
                style={{ marginLeft: "0px" }}
              >
                <div className="center w-100">
                  <img src="/asset/image/logo.png" />
                  <p style={{ fontSize: "25px" }}>ADMIN</p>
                </div>
              </Link>
            </li>
            <hr />
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default NavbarAdmin;
