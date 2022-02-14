import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import CategoriesCard from './categoriesCard';
import { AiOutlineTeam } from 'react-icons/ai';
import {Input} from 'antd';

const Categories = () => {
  return (
    <>
      <Navbar/>
      <div className='container'>
        <h2 className='mt-5 mb-0'>Language</h2>
        <h5 className='mt-2 text-muted'>Another ways to learn language</h5>
        <div className='d-flex justify-content-between'>
          <p style={{fontSize: '0.8rem'}}><AiOutlineTeam color='#00B4D8' size='1.5rem'/> 10 instructors</p>
          <Input.Search allowClear style={{width: "25vw"}}/>
        </div>
        <hr />
        <div className='row'>
          <CategoriesCard/>
          <CategoriesCard/>
          <CategoriesCard/>
          <CategoriesCard/>
          <CategoriesCard/>
        </div>
      </div>
      
    </>
  );
}

export default Categories;