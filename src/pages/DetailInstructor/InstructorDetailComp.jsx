import React from "react";
import { Descriptions } from "antd";
import BackendUrl from "../../components/BackendUrl";

const InstructorDetailComp = (props) => {
  const activeDays = () => {
    console.log(props.activeDays);
    const text = props.activeDays + "";

    const activeDaysData = text.split(",");
    const arrElement = [];
    activeDaysData.forEach((element) => {
      let days = "";
      if (element == 0) {
        days = "Sunday";
      } else if (element == 1) {
        days = "Monday";
      } else if (element == 2) {
        days = "Tuesday";
      } else if (element == 3) {
        days = "Wednesday";
      } else if (element == 4) {
        days = "Thursday";
      } else if (element == 5) {
        days = "Friday";
      } else if (element == 6) {
        days = "Saturday";
      }
      arrElement.push(<p className="mb-1">{days}</p>);
    });
    return arrElement;
  };
  const katagori = () => {
    var katagoriText = "";
    if (props.katagori == 1) {
      katagoriText = "Language";
    } else if (props.katagori == 2) {
      katagoriText = "Cooking";
    } else if (props.katagori == 3) {
      katagoriText = "Sports";
    } else if (props.katagori == 4) {
      katagoriText = "Design";
    } else if (props.katagori == 5) {
      katagoriText = "Programming";
    }
    return katagoriText;
  };

  const time = () => {
    const timeStart = props.timeStart;
    const timeEnd = props.timeEnd;

    return timeStart + " - " + timeEnd;
  };

  return (
    <Descriptions title="Instructor info" bordered size="middle">
      <Descriptions.Item label="Email" span={3}>
        {props.email}
      </Descriptions.Item>
      <Descriptions.Item label="Name" span={3}>
        {props.name}
      </Descriptions.Item>
      <Descriptions.Item label="Detail" span={3}>
        {props.katagoriDetail}
      </Descriptions.Item>
      <Descriptions.Item label="Phone number" span={2}>
        {props.phoneNumber}
      </Descriptions.Item>
      <Descriptions.Item label="Katagori" span={1}>
        {katagori()}
      </Descriptions.Item>
      <Descriptions.Item label="Available time" span={3}>
        {time()}
      </Descriptions.Item>
      <Descriptions.Item label="Available Day" span={3}>
        {activeDays()}
      </Descriptions.Item>
      <Descriptions.Item label="Instructor document" span={3}>
        <a href={BackendUrl + props.berkas} target="_blank">
          View document
        </a>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default InstructorDetailComp;
