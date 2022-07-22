import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-awesome-calendar";
import BackendUrl from "../../components/BackendUrl";
import moment from "moment";

const CalendarComp = (props) => {
  const idInstructor = props.idInstructor;
  const [schedule, setSchedule] = useState([]);
  const [event, setEvent] = useState([]);

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
            id: index + 1,
            color: "#fd3153",
            from: moment(element.dateStart).add(7, "hours").format(),
            to: moment(element.dateEnd).add(7, "hours").format(),
            title: "Unavailable",
          };
          eventDataArr.push(temp);
        });
        setEvent(eventDataArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadSchedule();
  }, []);
  return (
    <>
      <Calendar events={event} />
    </>
  );
};

export default CalendarComp;
