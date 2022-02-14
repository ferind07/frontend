import React, { Component } from "react";
import { Rate } from "antd";

const CategoriesCard = (props) => {
  return (
    <>
      <div className="col-md-4 col-sm-6 col-lg-3 col-12 mt-3">
        <div
          className="card"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <img
            class="card-img-top"
            src="./asset/home/mentor.jpeg"
            alt="Card image cap"
          />
          <hr className="mb-0" />
          <div className="card-body">
            <h6 className="mb-0">Ferry Indra Gunawan</h6>
            <p className="text-muted mb-0">Indonesian language</p>
            <Rate disabled value={5} />
            <div className="mt-2 d-flex justify-content-start">
              <a href="#">Explore</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesCard;
