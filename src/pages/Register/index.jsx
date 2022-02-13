import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {AiFillLock, AiOutlineMail, AiOutlineUser} from 'react-icons/ai';
import './index.css';
import { Input, Button, Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const Register = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        User
      </Menu.Item>
      <Menu.Item key="2">
        Instructor
      </Menu.Item>
      
    </Menu>
  );
  return (
    <>
      <Navbar/>
      <div className='container-login'>
        <h5>Register to ...</h5>
        <hr style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}/>
        <div style={{marginTop: '3vw', width: '70%', marginLeft: 'auto', marginRight: 'auto'}}>
          <Input size="large" placeholder="Email" prefix={<AiOutlineMail />} />
          <Input.Password size="large" placeholder="Password" prefix={<AiFillLock />} className='mt-2'/>
          <Input.Password size="large" placeholder="Password confirmation" prefix={<AiFillLock />} className='mt-2' visibilityToggle={false}/>
          <Input size="large" placeholder="Name" prefix={<AiOutlineUser />} className='mt-2'/>
          
          <Dropdown overlay={menu} className='mt-2'>
            <Button  style={{width: '100%'}}>
              Role <DownOutlined />
            </Button>
          </Dropdown>
          
          <Button type="primary" size='large' style={{ background: "black", borderColor: "black" }} className='mt-2 w-100'>Register</Button>
          
          
          <p className='mt-2'>Already have account <a href="/login">Login</a></p>
          
        </div>

        
      </div>
      <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
        <Footer />
      </div>
      
    </>
  );
}

export default Register;