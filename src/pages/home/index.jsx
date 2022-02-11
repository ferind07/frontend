import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import styled from 'styled-components';

const Home = () => { 
  return (
    <>
      <Navbar/>
      <div
        style={{
          height: '500px',
          background: 'url("/asset/home/programming.jpg") no-repeat center center fixed',
          backgroundSize: 'cover',
        }}
      >

      </div>
    </>
  );
}

const Campain = styled.div`
  height: 500px;
  background-color: red;
  background-image: url();
`;

export default Home;