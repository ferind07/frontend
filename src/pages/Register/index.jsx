import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {AiFillLock, AiOutlineMail, AiOutlineUser, AiOutlineUserAdd, AiOutlineMobile} from 'react-icons/ai';
import './index.css';
import { Input, Button, Menu, Dropdown, InputNumber, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Register = () => {

  const [role, setRole] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleMenuClick(e) {
    if (e.key == 1){
      message.info('Role user selected');
      setRole(e.key);
    } else {
      message.info('Role instructor selected');
      setRole(e.key);
    }
  }

  function returnRole() {
    if (role == 0){
      return "Choose role";
    } else if (role == 1){
      return "Register as user";
    } else {
      return "Register as instructor";
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
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
        <AiOutlineUserAdd size='5vw'/>
        <div style={{marginTop: '1vw', width: '70%', marginLeft: 'auto', marginRight: 'auto'}}>
          <Input size="large" placeholder="Email" prefix={<AiOutlineMail />} value={email} onChange={e => {setEmail(e.target.value)}}/>
          <Input.Password size="large" placeholder="Password" prefix={<AiFillLock />} className='mt-2' value={password} onChange={e => {setPassword(e.target.value)}}/>
          <Input.Password size="large" placeholder="Password confirmation" prefix={<AiFillLock />} className='mt-2' visibilityToggle={false} value={passwordConfirmation} onChange={e => {setPasswordConfirmation(e.target.value)}}/>
          <Input size="large" placeholder="Name" prefix={<AiOutlineUser />} className='mt-2' value={name} onChange={e => {setName(e.target.value)}}/>
          <Input className='w-100 mt-2' controls={false} placeholder="Phone number" type='number' prefix={<AiOutlineMobile/>} value={phoneNumber} onChange={e => {setPhoneNumber(e.target.value)}}/>

          <Dropdown overlay={menu} className='mt-2' trigger={['click']}>
            <Button style={{width: '100%'}}>
              {returnRole()} <DownOutlined />
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