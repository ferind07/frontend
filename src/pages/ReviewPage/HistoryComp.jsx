import React from "react";
import { LaptopOutlined, TeamOutlined } from "@ant-design/icons";
import { Tag, Button } from "antd";

const HistoryComp = () => {
  return (
    <>
      <div className="w-100">
        <div className="card card-shadow">
          <div className="card-body">
            <div className="d-flex" style={{ gap: "10px" }}>
              <div className="d-flex center">
                <LaptopOutlined
                  style={{ color: "#1890ff", fontSize: "16px" }}
                />
              </div>
              <div className="d-flex center">
                <h6 className="mb-0">Course</h6>
              </div>
              <div className="d-flex center">
                <p className="mb-0">10 Dec 2021</p>
              </div>
              <div className="d-flex center">
                <Tag color="blue">Done</Tag>
              </div>
              <div className="d-flex center">
                <p className="mb-0 text-muted">Order ID</p>
              </div>
            </div>
            <div className="d-flex mt-2" style={{ gap: "5px" }}>
              <div className="d-flex center">
                <TeamOutlined style={{ fontSize: "16px" }} />
              </div>
              <div className="d-flex center">
                <h6 className="mb-0">Instructor name</h6>
              </div>
            </div>
            <div className="d-flex mt-2" style={{ gap: "15px" }}>
              <img
                src="/asset/image/noPic.jpg"
                width="150px"
                style={{ aspectRatio: "4/3" }}
              />
              <div>
                <h5>Course name</h5>
                <p className="text-muted">Rp.100.000</p>
              </div>
            </div>
            <div
              className="d-flex mt-2 justify-content-end"
              style={{ gap: "10px" }}
            >
              <Button>Detail transaction</Button>
              <Button type="primary">Give review</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryComp;
