import React, { useState } from "react";
import Navbarr from "../../components/Navbar";
import { Rate } from "antd";
const DetailInstructor = (props) => {
  const name = props.name;
  return (
    <>
      <Navbarr />
      <div className="container mt-3">
        <h1 className="mb-2">Ferry Indra Gunawan</h1>
        <div className="d-flex justify-content-between mb-0">
          <h5 className="text-muted mt-0">Bahasa Indonesia istructor</h5>
          <Rate value={5} />
        </div>
        <hr className="mt-1" />
      </div>
    </>
  );
};

export default DetailInstructor;
