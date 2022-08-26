import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import Navbarr from "../../components/Navbar";
import ScheduleCard from "./ScheduleCard";
import { Empty, Select, Button, Input } from "antd";
import {
  ExclamationCircleTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  WarningTwoTone,
  ClockCircleTwoTone,
} from "@ant-design/icons";

const Schedule = () => {
  const [hSubmission, setHSubmission] = useState([]);
  const [tempHSubmission, setTempHSubmission] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState(9);

  const { Option } = Select;

  function getHsubmission() {
    axios
      .get(
        BackendUrl + "/user/getSchedule?token=" + localStorage.getItem("token")
      )
      .then((success) => {
        console.log(success.data);
        setHSubmission(success.data);
        setTempHSubmission(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onChangeOption(e) {
    e.preventDefault();
    //alert(e.target.value);

    // // const temp = tempHsubmission.current.filter((item) => {
    // //   return item.status == e.target.value;
    // // });
    // console.log(temp);
    // setHSubmission(temp);
  }

  function optionSelected(option) {
    if (option != 9) {
      const temp = tempHSubmission.filter((item) => {
        return item.status == option;
      });
      console.log(temp);

      const data = temp.filter((detailHsubmission) => {
        return detailHsubmission.title
          .toLowerCase()
          .includes(keyword.toLowerCase());
      });
      setHSubmission(data);
    } else {
      const data = tempHSubmission.filter((detailHsubmission) => {
        return detailHsubmission.title
          .toLowerCase()
          .includes(keyword.toLowerCase());
      });
      setHSubmission(data);
    }
  }

  function renderSchedule() {
    if (hSubmission.length == 0) {
      return (
        <div
          className="d-flex justify-content-center center"
          style={{ height: "100%" }}
        >
          <Empty description="No schedule" />
        </div>
      );
    } else {
      const comp = [];
      hSubmission.map((submissionDetail, i) => {
        comp.push(<ScheduleCard submissionDetail={submissionDetail} key={i} />);
      });
      return comp;
    }
  }

  const handleChange = (value) => {
    setOption(value);
  };

  function onClickFilter() {
    console.log("filter");

    //setHSubmission(tempHSubmission);

    optionSelected(option);
  }

  useEffect(() => {
    getHsubmission();
  }, []);
  return (
    <>
      <Navbarr />

      <div className="container mt-3">
        <div className="row ">
          <h2>Your schedule</h2>
          <div className="col-3">
            <div className="card mb-5 card-shadow">
              <div className="card-body">
                <h5>Filter</h5>
                <hr className="mt-0 mb-2" />
                <div className="w-100">
                  <p className="mb-1">Status</p>
                  <Select onChange={handleChange} className="w-100">
                    <Option value={0}>Unconfirmed</Option>
                    <Option value={1}>Accepted</Option>
                    <Option value={2}>Rejected</Option>
                    <Option value={3}>Completed</Option>
                    <Option value={4}>Expired</Option>
                    <Option value={5}>Unpaid</Option>
                    <Option value={9}>All</Option>
                  </Select>
                </div>

                <div className="w-100 mt-2">
                  <p className="mb-1">Course name</p>
                  <Input
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                  />
                  <Button
                    className="mt-2"
                    type="primary"
                    onClick={onClickFilter}
                  >
                    Filter
                  </Button>
                </div>

                {/* <div className="w-100 d-flex">
                  <div
                    className="d-flex w-100 p-1 box-option"
                    style={{ gap: "15px" }}
                    onClick={(e) => {
                      optionSelected(0);
                    }}
                  >
                    <div className="center">
                      <ExclamationCircleTwoTone
                        style={{ fontSize: "35px", color: "#08c" }}
                      />
                    </div>
                    <h5 className="mb-0">Unconfirmed</h5>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="card mb-5 card-shadow">
              <div
                className="card-body"
                style={{ height: "75vh", overflowY: "auto" }}
              >
                {renderSchedule()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
