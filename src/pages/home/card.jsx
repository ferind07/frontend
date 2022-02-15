import React, { Component } from 'react';
import './card.css';

const Card = (props) => {
  return (
    <div className="col-md-4 col-sm-6 col-lg-4 col-6 mt-3">
      <div className='card' style={{backgroundColor : '#efefef'}}>
        <img className='card-img' src={props.url} width='100%'/>
      </div>
      <h5 style={{marginTop: '10px', marginBottom: '20px'}}>{props.catagory}</h5>
    </div>
  );
}

export default Card;