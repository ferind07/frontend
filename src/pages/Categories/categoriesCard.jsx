import React, { Component } from "react";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import BackendUrl from "../../components/BackendUrl";

const CategoriesCard = (props) => {
  const navigate = useNavigate();

  const renderImage = () => {
    if (props.image == "") {
      return (
        <img
          class="card-img-top"
          src="../asset/image/noPic.jpg"
          alt="Card image cap"
          style={{ aspectRatio: "3 / 4" }}
        />
      );
    } else {
      return (
        <img
          class="card-img-top"
          src={BackendUrl + props.image}
          alt="Card image cap"
          style={{ aspectRatio: "3 / 4" }}
        />
      );
    }
  };

  return (
    <>
      <div className="col-md-4 col-sm-6 col-lg-3 col-12 mt-3">
        <div
          className="card"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          {renderImage()}
          <hr className="mb-0" />

          <div className="card-body">
            <h6 className="mb-0">{props.name}</h6>
            <p className="text-muted mb-0">
              Indonesian language {props.detail}
            </p>
            <Rate disabled value={5} />
            <div className="mt-2 d-flex justify-content-start">
              <a
                onClick={(e) => {
                  navigate("/detailInstructor/" + props.id);
                }}
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesCard;
