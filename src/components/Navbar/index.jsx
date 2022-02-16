import React, { Component, useState } from "react";
import { NavDropdown, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import MediaQuery from "react-responsive";

//css
import "./navbar.css";

const Navbarr = () => {
  const navigate = useNavigate();

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
                <p className="nav-title">ODREY</p>
              </Link>
              <MediaQuery minWidth={555}>
                <NavDropdown title="Categories" className="center">
                  <NavDropdown.Item onClick={(e) => {navigate("/categories")}}>
                    Language
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Cooking
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Sports</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Design</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.5">
                    Programming
                  </NavDropdown.Item>
                </NavDropdown>
              </MediaQuery>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <MediaQuery minWidth={768}>
              <div className="nav-right">
                <p className="center">Become Teacher</p>
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
                <Nav.Link onClick={(e) => {navigate("/register")}}>Become teacher</Nav.Link>
                <Nav.Link onClick={(e) => {navigate("/login")}}>Log in</Nav.Link>
                <Nav.Link onClick={(e) => {navigate("/register")}}>Register</Nav.Link>
              </Nav>
            </MediaQuery>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
  // return (
  //   <>
  //     <header>
  //       <nav>
  //         <div className='nav-logo'>
  //           <Link to='/' style={{display: 'flex'}}>
  //             <img src="/asset/image/logo.png" />
  //             <p className='nav-title'>DREY</p>
  //           </Link>
  //           <NavDropdown
  //             title="Categories"
  //             className='center'
  //           >
  //             <NavDropdown.Item href="/categories">Language</NavDropdown.Item>
  //             <NavDropdown.Item href="#action/3.2">Cooking</NavDropdown.Item>
  //             <NavDropdown.Item href="#action/3.3">Sports</NavDropdown.Item>
  //             <NavDropdown.Item href="#action/3.4">Design</NavDropdown.Item>
  //             <NavDropdown.Item href="#action/3.5">Programming</NavDropdown.Item>
  //           </NavDropdown>

  //         </div>
  //         <div className='nav-right'>
  //           <p className='center'>Become Teacher</p>
  //           <button className='btn btn-outline-dark' onClick={(e) => {navigate("/login")}}>Login</button>
  //           <button className='btn btn-dark' onClick={(e) => {navigate("/register")}}>Register</button>
  //         </div>
  //       </nav>
  //     </header>
  //   </>
  // )
};

export default Navbarr;
