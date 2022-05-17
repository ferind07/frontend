import React, { useState } from "react";
import { LaptopOutlined, TeamOutlined } from "@ant-design/icons";
import { Tag, Button, Drawer, Rate, Input } from "antd";

const HistoryComp = () => {
  const [visible, setVisible] = useState(false);
  const { TextArea } = Input;

  const showLargeDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
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
              <Button type="primary" onClick={(e) => showLargeDrawer()}>
                Give review
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title="Review"
        placement="right"
        size="large"
        onClose={onClose}
        visible={visible}
      >
        <div className="d-flex" style={{ gap: "10px" }}>
          <div>
            <img
              src="/asset/image/noPic.jpg"
              width="150px"
              style={{ aspectRatio: "4/3" }}
            />
          </div>

          <div>
            <h6>Course name</h6>
            <p className="text-muted mb-0">How about your course</p>
            <Rate />
            <TextArea className="mt-2" placeholder="Place your review here" />
            <div className="mt-2">
              <Button type="primary">Send</Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HistoryComp;
