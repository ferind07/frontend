import React, { useState, useEffect } from "react";
import moment from "moment";
import BackendUrl from "../../components/BackendUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";

const UnconfirmedSchedule = (props) => {
  const listSchedule = props.scheduleList;
  const navigate = useNavigate();

  const [tempListSchedule, setTempListSchedule] = useState([]);
  //var tempListSchedule = props.scheduleList;

  const { Option } = Select;

  function loadSubmission() {
    axios
      .get(
        BackendUrl + "/user/getSchedule?token=" + localStorage.getItem("token")
      )
      .then((success) => {
        setTempListSchedule(success.data);
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadSubmission();
  }, []);

  const compRenderSchedule = (detailSchedule, dateStr) => {
    return (
      <>
        <div className="card mt-2">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-4">
                <img
                  src={BackendUrl + detailSchedule.image}
                  style={{ width: "100%", aspectRatio: "4/3" }}
                />
              </div>
              <div className="col-8">
                <h5 className="mb-2">{detailSchedule.title} Class</h5>
                <p className="mb-2 font-italic">With {detailSchedule.name}</p>
                <p className="mb-2">Applied at {dateStr}</p>
                <p>
                  Status{" "}
                  {detailSchedule.status == 4
                    ? "Expired"
                    : detailSchedule.status}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    navigate("/instructor/detailSchdule/" + detailSchedule.id);
                  }}
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderSchedule = () => {
    const componentList = [];
    tempListSchedule.map((detailSchedule) => {
      const today = new Date(detailSchedule.timeInsert);
      const yyyy = today.getFullYear();
      let mm = today.getMonth(); // Months start at 0!
      let dd = today.getDate();

      const dayList = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const monthList = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      if (dd < 10) dd = "0" + dd;
      //if (mm < 10) mm = "0" + mm;

      var formatteddatestr = moment(detailSchedule.timeInsert).format(
        "hh:mm a"
      );
      const dateStr =
        dayList[today.getDay()] +
        ", " +
        dd +
        " " +
        monthList[mm] +
        " " +
        yyyy +
        " " +
        formatteddatestr;

      componentList.push(compRenderSchedule(detailSchedule, dateStr));
    });
    return componentList;
  };

  function onStatusChange(e) {
    if (e == 10) {
      setTempListSchedule(listSchedule);
    } else {
      const temp = listSchedule.filter((element) => {
        return element.status == e;
      });
      console.log(temp);
      setTempListSchedule(temp);
    }

    //tempListSchedule = temp;
  }

  return (
    <>
      <div className="row">
        <div className="col-3">
          <h5>Filter</h5>
          <hr />
          <p className="mb-1">Status</p>
          <div>
            <Select
              className="w-100 mt-0"
              onChange={(e) => {
                onStatusChange(e);
              }}
            >
              <Option value="0">Unconfirmed</Option>
              <Option value="1">Confirmed</Option>
              <Option value="2">Cancelled</Option>
              <Option value="10">All</Option>
            </Select>
          </div>
        </div>
        <div className="col-9">
          <div className="card">
            <div
              className="card-body"
              style={{ height: "75vh", overflowY: "auto" }}
            >
              {renderSchedule()}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-12" style={{ height: "80vh", overflowY: "auto" }}>
          Status :{" "}
          <select
            name="status"
            id="status"
            onChange={(e) => {
              onStatusChange(e);
            }}
          >
            <option value="0">Unconfirmed</option>
            <option value="1">Confirmed</option>
            <option value="2">Cancelled</option>
            <option value="">All</option>
          </select>
          {renderSchedule()}
        </div>
      </div> */}
    </>
  );
};

export default UnconfirmedSchedule;
