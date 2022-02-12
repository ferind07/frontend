import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import './index.css';

const Home = () => { 
  return (
    <>
      <Navbar/>
      <div className='billboard'>
        <img src="/asset/home/banner.jpg"/>
        <div className='banner'>
          <h2>Learning thats gets you</h2>
          <p>Skill for your present and your future. Now come to your home</p>
        </div>
      </div>
      <div className='catagory-container'>
        <h2>Top Categories</h2>
      </div>
      
    </>
  );
}



export default Home;