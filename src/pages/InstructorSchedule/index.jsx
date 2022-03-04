import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import UnconfirmedSchedule from "./UnconfirmedSchedule";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const InstructorSchedule = () => {
  const { TabPane } = Tabs;

  const [submissionList, setSubmissonList] = useState([]);

  useEffect(() => {
    loadSubmission();
  }, []);

  function loadSubmission() {
    axios
      .get(
        BackendUrl +
          "/user/getSubmission?token=" +
          localStorage.getItem("token")
      )
      .then((success) => {
        setSubmissonList(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card card-shadow">
              <div className="card-body">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Unconfirmed schedule" key="1">
                    <UnconfirmedSchedule subMission={submissionList} />
                  </TabPane>
                  <TabPane tab="My Schedule" key="2"></TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorSchedule;
