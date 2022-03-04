import React from "react";
import BackendUrl from "../../components/BackendUrl";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

const ClassListContent = (props) => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div className="row" style={{ overFlow: "auto" }}>
          {props.classList.map((classList) => {
            return (
              <ComponentCard
                title={classList.title}
                duration={classList.duration}
                image={classList.image}
                price={classList.price}
                id={classList.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const ComponentCard = (props) => {
  const navigate = useNavigate();
  return (
    <div className="col-4">
      <div className="card card-shadow">
        <img
          src={BackendUrl + props.image}
          style={{ width: "100%", aspectRatio: "4 / 3" }}
          className="card-img-top"
        />
        <div className="card-body">
          <h6 className="mb-0">{props.title}</h6>
          <p className="text-muted mb-0">{props.duration} minute</p>
          <NumberFormat
            value={props.price}
            prefix="Rp. "
            displayType="text"
            thousandSeparator
          />
          <br />
          <a
            className="mt-2"
            onClick={(e) => {
              e.preventDefault();
              navigate("/exploreClass/" + props.id);
            }}
          >
            Explore
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClassListContent;
