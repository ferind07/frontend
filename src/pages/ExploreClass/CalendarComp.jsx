import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-awesome-calendar";
import BackendUrl from "../../components/BackendUrl";
import moment from "moment";

const CalendarComp = (props) => {
  const idInstructor = props.idInstructor;
  const [schedule, setSchedule] = useState([]);
  const [event, setEvent] = useState([]);
  const [userSchedule, setUserSchedule] = useState([]);
  const [userEvent, setUserEvent] = useState([]);

  function loadUserSchedule() {
    const token = localStorage.getItem("token");
  }

  function loadSchedule() {
    axios
      .get(BackendUrl + "/user/instructorSchedule?id=" + idInstructor)
      .then((success) => {
        const data = success.data;
        setSchedule(success.data);

        const eventDataArr = [];
        data.forEach((element, index) => {
          //console.log(element);
          const temp = {
            color: "#fd3153",
            from: moment(element.dateStart).add(0, "hours").format(),
            to: moment(element.dateEnd).add(0, "hours").format(),
            title: "Unavailable",
          };
          eventDataArr.push(temp);
        });

        console.log(eventDataArr);
        setEvent(eventDataArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadSchedule();
    loadUserSchedule();
  }, []);
  return (
    <>
      <Calendar events={event} />
    </>
  );
};

export default CalendarComp;
