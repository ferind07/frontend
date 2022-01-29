import React, { Component } from 'react';
//css
import './navbar.css';

const Navbar = () => {
  return (
    <>
      <nav>
        <div className='nav-items flex-start'>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>
        <div className='nav-items flex-end'>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;