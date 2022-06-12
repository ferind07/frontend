import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import Navbarr from "../../components/Navbar";
import ScheduleCard from "./ScheduleCard";
import { Empty } from "antd";
import {
  ExclamationCircleTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const Schedule = () => {
  const [hSubmission, setHSubmission] = useState([]);
  const [tempHSubmission, setTempHSubmission] = useState([]);

  function getHsubmission() {
    axios
      .get(
        BackendUrl + "/user/getSchedule?token=" + localStorage.getItem("token")
      )
      .then((success) => {
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
    const temp = tempHSubmission.filter((item) => {
      return item.status == option;
    });
    console.log(temp);
    setHSubmission(temp);
  }

  function renderSchedule() {
    if (hSubmission.length == 0) {
      return (
        <div className="d-flex center" style={{ height: "100%" }}>
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
                <h5>Status</h5>
                <hr className="mt-0 mb-2" />
                <div className="w-100 d-flex">
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
                </div>

                <div className="w-100 d-flex">
                  <div
                    className="d-flex w-100 p-1 box-option"
                    style={{ gap: "15px" }}
                    onClick={(e) => {
                      optionSelected(1);
                    }}
                  >
                    <div className="center">
                      <CheckCircleTwoTone
                        style={{ fontSize: "35px", color: "#08c" }}
                      />
                    </div>
                    <h5 className="mb-0">Accepted</h5>
                  </div>
                </div>

                <div className="w-100 d-flex">
                  <div
                    className="d-flex w-100 p-1 box-option"
                    style={{ gap: "15px" }}
                    onClick={(e) => {
                      optionSelected(2);
                    }}
                  >
                    <div className="center">
                      <CloseCircleTwoTone
                        style={{ fontSize: "35px", color: "#08c" }}
                      />
                    </div>
                    <h5 className="mb-0">Rejected</h5>
                  </div>
                </div>
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
