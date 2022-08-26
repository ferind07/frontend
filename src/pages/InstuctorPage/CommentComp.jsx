import React from "react";
import { Rate } from "antd";
import moment from "moment";

const CommentComp = (props) => {
  const dateStr = moment(props.createAt).format("D MMM YYYY");
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  return (
    <>
      <div className="card mt-1" style={boxStyle}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex center" style={{ gap: "20px" }}>
              <h6 className="mb-0">{props.name}</h6>
              <p className="mb-0 text-muted">({props.classTitle})</p>
            </div>
            <Rate disabled value={props.rating} />
          </div>
          <hr className="mt-1 mb-1" />
          <div className="d-flex justify-content-between">
            <p className="mb-0">{props.comment}</p>
            <p className="mb-0 text-muted" style={{ fontWeight: "bold" }}>
              {dateStr}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentComp;
