import React, { useState, useEffect } from "react";
import moment from "moment";
import BackendUrl from "../../components/BackendUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select, Input, Button, Empty } from "antd";

const UnconfirmedSchedule = (props) => {
  const listSchedule = props.scheduleList;
  const navigate = useNavigate();

  const [tempListSchedule, setTempListSchedule] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState(10);

  //var tempListSchedule = props.scheduleList;

  const { Option } = Select;

  function loadSubmission() {
    console.log(
      BackendUrl + "/user/getSchedule?token=" + localStorage.getItem("token")
    );
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
    function statusText() {
      let text = "";
      if (detailSchedule.status == 0) {
        text = "Unconfirmed";
      } else if (detailSchedule.status == 1) {
        text = "Accepted";
      } else if (detailSchedule.status == 2) {
        text = "Declined";
      } else if (detailSchedule.status == 3) {
        text = "Completed";
      } else if (detailSchedule.status == 4) {
        text = "Expired";
      } else if (detailSchedule.status == 5) {
        text = "Unpaid";
      } else if (detailSchedule.status == 6) {
        text = "Reported";
      } else if (detailSchedule.status == 7) {
        text = "Ended by admin";
      }

      return text;
    }
    const boxStyle = {
      boxShadow: "0px 20px 27px #0000000d",
      borderRadius: "12px",
    };
    return (
      <>
        <div className="card mt-2" style={boxStyle}>
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
                <p>Status {statusText()}</p>
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
    if (tempListSchedule.length > 0) {
      tempListSchedule.map((detailSchedule) => {
        const today = new Date(
          moment(detailSchedule.timeInsert).add(-7, "hours")
        );
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

        var formatteddatestr = moment(detailSchedule.timeInsert)
          .add(-7, "hours")
          .format("hh:mm a");
        // var formatteddatestr = moment(detailSchedule.timeInsert).format(
        //   "hh:mm a"
        // );
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
    } else {
      return <Empty className="mt-5" />;
    }
  };

  function onStatusChange(e) {
    //tempListSchedule = temp;
    setStatus(e);
  }

  const onClickBtnFilter = (e) => {
    console.log(status);
    var hasil;
    if (status == 10) {
      //setTempListSchedule(listSchedule);
      if (keyword != "") {
        hasil = listSchedule.filter((item) => {
          return item.title.toLowerCase().includes(keyword.toLowerCase());
        });
        console.log(hasil);
        setTempListSchedule(hasil);
      } else {
        console.log(hasil);
        setTempListSchedule(listSchedule);
      }
    } else {
      const temp = listSchedule.filter((element) => {
        return element.status == status;
      });

      console.log(temp);

      if (temp.length > 0) {
        if (keyword != "") {
          hasil = temp.filter((item) => {
            return item.title.toLowerCase().includes(keyword.toLowerCase());
          });
          setTempListSchedule(hasil);
        } else {
          setTempListSchedule(temp);
        }
      } else {
        setTempListSchedule(temp);
      }
    }
  };

  const onClickBtnReset = (e) => {
    setKeyword("");
    setTempListSchedule(listSchedule);
  };

  return (
    <>
      <div className="row">
        <div className="col-3">
          <h5>Filter</h5>
          <hr />
          <div className="mb-2">
            <p className="mb-1">Course name</p>
            <Input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </div>
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
              <Option value="2">Canceled</Option>
              <Option value="3">Completed</Option>
              <Option value="10">All</Option>
            </Select>
          </div>
          <div
            className="d-flex mt-3 justify-content-end"
            style={{ gap: "10px" }}
          >
            <Button type="primary" onClick={onClickBtnFilter}>
              Filter
            </Button>
            <Button onClick={onClickBtnReset}>Reset</Button>
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
