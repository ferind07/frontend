import React, { useState, useEffect } from "react";
import { NavDropdown, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import { notification } from "antd";

//css
import "./navbar.css";

const Navbarr = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const onClickLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setToken("");
    notification.info({
      message: "Success logout",
    });
    navigate("/");
  };

  const compLogin = () => {
    if (token == "" || token == null) {
      return (
        <>
          <MediaQuery minWidth={768}>
            <div className="nav-right">
              <p className="center">Become teacher</p>
              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                Log in
              </button>
              <button
                className="btn btn-dark"
                onClick={(e) => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={768}>
            <Nav className="me-auto">
              <Nav.Link
                onClick={(e) => {
                  navigate("/register");
                }}
              >
                Become teacher
              </Nav.Link>
              <Nav.Link
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                Log in
              </Nav.Link>
              <Nav.Link
                onClick={(e) => {
                  navigate("/register");
                }}
              >
                Register
              </Nav.Link>
            </Nav>
          </MediaQuery>
        </>
      );
    } else {
      return (
        <>
          <MediaQuery minWidth={768}>
            <div className="nav-right">
              {dropdownItemMenu()}
              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  navigate("/myAccount");
                }}
              >
                My Account
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => onClickLogout(e)}
              >
                Log out
              </button>
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={768}>
            <Nav className="me-auto">
              <Nav.Link>Dashboard</Nav.Link>
              <Nav.Link>Schedule</Nav.Link>
              <Nav.Link>My account</Nav.Link>
              <Nav.Link onClick={(e) => onClickLogout(e)}>Log out</Nav.Link>
            </Nav>
          </MediaQuery>
        </>
      );
    }
  };

  const dropdownItem = () => {
    return (
      <NavDropdown title="Categories" className="center">
        <NavDropdown.Item
          onClick={(e) => {
            navigate("/categories/1");
          }}
        >
          Language
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={(e) => {
            navigate("/categories/2");
          }}
        >
          Cooking
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={(e) => {
            navigate("/categories/3");
          }}
        >
          Sports
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={(e) => {
            navigate("/categories/4");
          }}
        >
          Design
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={(e) => {
            navigate("/categories/5");
          }}
        >
          Programming
        </NavDropdown.Item>
      </NavDropdown>
    );
  };

  const dropdownItemMenu = () => {
    return (
      <NavDropdown title="Menu" className="center">
        <NavDropdown.Item
          onClick={(e) => {
            navigate("/userDashboard");
          }}
        >
          Dashboard
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={(e) => {
            navigate("/schedule");
          }}
        >
          Schedule
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={(e) => {
            navigate("/review");
          }}
        >
          History
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={(e) => {
            navigate("/reportPage");
          }}
        >
          Report
        </NavDropdown.Item>
      </NavDropdown>
    );
  };

  return (
    <>
      <Navbar
        bg="light"
        variant="dark"
        sticky="top"
        collapseOnSelect
        expand="md"
      >
        <Container fluid>
          <Navbar.Brand className="text-dark" href="#home">
            <div className="nav-logo">
              <Link to="/" style={{ display: "flex" }}>
                <img src="/asset/image/logo.png" />
                <p className="nav-title">DEMY</p>
              </Link>

              <MediaQuery minWidth={555}>
                {props.instructor == true ? "" : dropdownItem()}
              </MediaQuery>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            {compLogin()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbarr;
