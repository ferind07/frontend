import React, { Component, useState } from 'react';
import {NavDropdown} from "react-bootstrap";

//css
import './navbar.css';

const Navbar = () => {
  return (
    <>
      <header>
        <nav>
          <div className='nav-logo'>
            <img src="/asset/image/logo.png" />
            <p className='nav-title'>DREY</p>
            
            <NavDropdown
              title="Categories"
              className='center'
            >
              <NavDropdown.Item href="#action/3.1">Language</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Cooking</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Sports</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Design</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">Programming</NavDropdown.Item>
            </NavDropdown>
            
          </div>
          <div className='nav-right'>
            <p className='center'>Become Teacher</p>
            <button className='btn btn-outline-dark'>Login</button>
            <button className='btn btn-dark'>Register</button>
          </div>
          
        </nav>
      </header>
    </>
  )
}


export default Navbar;