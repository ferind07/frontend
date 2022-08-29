import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import AddClassContent from "./AddClassContent";
import MyClassContent from "./MyClassContent";
import { notification } from "antd";

const InstructorClass = () => {
  const { TabPane } = Tabs;
  const [classList, setClassList] = useState([]);

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    getClass();
  }, []);

  function getClass() {
    console.log("getClass");
    axios
      .get(
        BackendUrl + "/user/getClassList?token=" + localStorage.getItem("token")
      )
      .then((success) => {
        if (success.data.status == true) {
          setClassList(success.data.rows);
        } else {
          notification.error({
            message: "Error",
            description: success.data.msg,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="container-style">
        <div className="container mt-3">
          <div className="row">
            <div className="col-12">
              <div className="card card-shadow">
                <div className="card-body">
                  <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="My Class" key="1">
                      <MyClassContent classList={classList} />
                    </TabPane>
                    <TabPane tab="Add Class" key="2">
                      <AddClassContent functionGetClass={getClass} />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorClass;
