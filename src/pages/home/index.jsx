import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from './card';
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
        <h3>Top Categories</h3>
        <hr />
        <div className='container-fluid'>
          <div className='row'>
            <Card catagory="Cooking" url="/asset/home/cooking.png"/>
            <Card catagory="Design" url="/asset/home/design.png"/>
            <Card catagory="Language" url="/asset/home/lang.png"/>
            <Card catagory="Programming" url="/asset/home/progamming.png"/>
            <Card catagory="Sport" url="/asset/home/sport.png"/>
          </div>
        </div>
        <hr />
      </div>
      
      
      <div className='container mentor-container'>
        <div className='row justify-content-md-center'>
          <div className='col-lg-5 col-md-6 col-sm-6 col-8 mentor-container'>
            <img src="/asset/home/mentor.jpeg" className='w-100'/>
          </div>
          <div className='col-lg-3 col-md-4 col-sm-4 col-8 center mentor-container'>
            <div>
              <h1>Become an instructor</h1>
              <p>Many instructor teach millions of students on Odrey. We provide platform for you to be an insturctor in here</p>
              <button className='btn btn-dark'>Register here</button>
            </div>
            
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}



export default Home;