import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { Descriptions, notification } from "antd";
import NumberFormat from "react-number-format";

const HtmlToReactParser = require("html-to-react").Parser;

const AdminDetailClass = () => {
  const { id } = useParams();

  const [classDetail, setClassDetail] = useState({});

  const htmlToReactParser = new HtmlToReactParser();

  function laodClass() {
    axios
      .get(BackendUrl + "/user/getClassDetail?id=" + id)
      .then((success) => {
        setClassDetail(success.data);
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteClass(e) {
    e.preventDefault();
    axios
      .post(BackendUrl + "/user/deleteClass", {
        idClass: id,
      })
      .then((success) => {
        if (success.data.status == true) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    laodClass();
  }, []);

  return (
    <>
      <div className="container-style">
        <div className="container mt-3">
          <div className="row">
            <div className="col-12">
              <div className="card card-shadow">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="center">
                      <h6 className="text-muted mb-0">
                        Class id : {classDetail.id}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-5">
                      <img
                        src={BackendUrl + classDetail.image}
                        width="100%"
                        style={{ aspectRatio: "4/3" }}
                      />
                    </div>
                    <div className="col-7">
                      <Descriptions title="Class info" bordered>
                        <Descriptions.Item label="Title" span={3}>
                          {classDetail.title}
                        </Descriptions.Item>
                        <Descriptions.Item label="Duration">
                          {classDetail.duration} minutes
                        </Descriptions.Item>
                        <Descriptions.Item label="Price">
                          <NumberFormat
                            value={classDetail.price}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Class">
                          {classDetail.classCount}
                        </Descriptions.Item>
                      </Descriptions>

                      <hr />
                      <h4>Detail Class</h4>
                      {htmlToReactParser.parse(classDetail.detail)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDetailClass;
