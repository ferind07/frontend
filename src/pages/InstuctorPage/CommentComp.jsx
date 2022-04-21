import React from "react";
import { Rate } from "antd";

const CommentComp = (props) => {
  return (
    <>
      <div className="card mt-1">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex center">
              <h6 className="mb-0">{props.name}</h6>
            </div>
            <Rate disabled value={props.rating} />
          </div>
          <hr />
          <p>{props.comment}</p>
        </div>
      </div>
    </>
  );
};

export default CommentComp;
