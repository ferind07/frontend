import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

const NavbarAdmin = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar justify-content-between">
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
            <button className="btn btn-danger">Logout</button>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars d-flex">
                <div className="center">
                  <AiIcons.AiOutlineClose color="#29affcf3" />
                </div>
                <p>Close</p>
              </Link>
            </li>
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
