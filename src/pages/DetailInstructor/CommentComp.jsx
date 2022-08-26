import React from "react";
import { Rate } from "antd";
import { TeamOutlined } from "@ant-design/icons";

const CommentComp = (props) => {
  return (
    <>
      <div className="card mt-1">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex center" style={{ gap: "10px" }}>
              <TeamOutlined style={{ color: "#1890ff", fontSize: "20px" }} />
              <h6 className="mb-0">{props.name}</h6>
              <p className="mb-0 text-muted">({props.className})</p>
            </div>
            <Rate disabled value={props.rating} />
          </div>
          <hr className="mb-2 mt-2" />
          <p className="mb-0">{props.comment}</p>
        </div>
      </div>
    </>
  );
};

export default CommentComp;
