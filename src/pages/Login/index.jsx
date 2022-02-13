import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {AiFillLock, AiOutlineMail} from 'react-icons/ai';
import './index.css';
import { Input, Button } from 'antd';

const Login = () => {
  return (
    <>
      <Navbar/>
      <div className='container-login'>
        <h5>Log in to your account</h5>
        <hr style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}/>
        <div style={{marginTop: '3vw', width: '70%', marginLeft: 'auto', marginRight: 'auto'}}>
          <Input size="large" placeholder="Email" prefix={<AiOutlineMail />} />
          <Input.Password size="large" placeholder="Password" prefix={<AiFillLock />} className='mt-2'/>
          <Button type="primary" size='large' style={{ background: "black", borderColor: "black" }} className='mt-2 w-100'>Log In</Button>
          <p className='mt-2'>Don't have account <a href="/register">Sign Up</a></p>
          
        </div>

        
      </div>
      <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
        <Footer />
      </div>
      
    </>
  );
}

export default Login;