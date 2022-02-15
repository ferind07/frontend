import React, { Component, useState } from 'react';
import {NavDropdown, Container, Nav, Navbar} from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';

//css
import './navbar.css';

const Navbarr = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="light" variant="dark" sticky='top'>
        <Container fluid>
        <Navbar.Brand className='text-dark' href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
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
}


export default Navbarr;