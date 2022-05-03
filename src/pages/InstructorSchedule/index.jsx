import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import UnconfirmedSchedule from "./UnconfirmedSchedule";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import MySchedule from "./MySchedule";
import moment from "moment";

const InstructorSchedule = () => {
  const { TabPane } = Tabs;

  const [scheduleList, setScheduleList] = useState([]);
  const [listEvent, setListEvent] = useState([]);

  useEffect(() => {
    loadSubmission();
    getEvent();
  }, []);

  function loadSubmission() {
    axios
      .get(
        BackendUrl + "/user/getSchedule?token=" + localStorage.getItem("token")
      )
      .then((success) => {
        setScheduleList(success.data);
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getEvent() {
    axios
      .get(
        BackendUrl +
          "/user/instructorEvent?token=" +
          localStorage.getItem("token")
      )
      .then((success) => {
        console.log(success.data);

        const event = [];
        for (let index = 0; index < success.data.length; index++) {
          const element = success.data[index];
          const tFrom = moment(element.dateStart).add(7, "hours").format();
          const tEnd = moment(element.dateEnd).add(7, "hours").format();
          event.push({
            id: index,
            color: element.status == 0 ? "#A36A00" : "#0F7C4F",
            from: tFrom,
            to: tEnd,
            title: element.title + " with " + element.name,
          });
        }
        // event.push({
        //   id: 0,
        //   color: "black",
        //   from: moment("2022-03-19T03:00:00Z").add(7, "hours").format(),
        //   to: moment("2022-03-19T04:00:00Z").add(7, "hours").format(),
        //   title: "This is an event",
        // });
        console.log(event);
        setListEvent(event);
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
            <div className="card card-shadow mb-5">
              <div className="card-body">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Unconfirmed schedule" key="1">
                    <UnconfirmedSchedule scheduleList={scheduleList} />
                  </TabPane>
                  <TabPane tab="My Schedule" key="2">
                    <MySchedule listEvent={listEvent} />
                  </TabPane>
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
