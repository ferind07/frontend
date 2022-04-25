import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import Navbarr from "../../components/Navbar";
import ScheduleCard from "./ScheduleCard";
import { Empty } from "antd";

const Schedule = () => {
  const [hSubmission, setHSubmission] = useState([]);
  var tempHsubmission = useRef([]);

  function getHsubmission() {
    axios
      .get(
        BackendUrl + "/user/getSchedule?token=" + localStorage.getItem("token")
      )
      .then((success) => {
        setHSubmission(success.data);
        tempHsubmission.current = success.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onChangeOption(e) {
    e.preventDefault();
    //alert(e.target.value);

    const temp = tempHsubmission.current.filter((item) => {
      return item.status == e.target.value;
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
        <div className="row">
          <div className="col-12">
            <div className="card card-shadow">
              <div className="card-body">
                <h2>Your Schedule</h2>
                status :{" "}
                <select
                  name="filter"
                  id="filter"
                  onChange={(e) => onChangeOption(e)}
                >
                  <option value="0">Unconfirmed</option>
                  <option value="1">Accepted</option>
                  <option value="2">Rejected</option>
                </select>
                <hr />
                <div className="row">
                  <div className="col-12" style={{ height: "75vh" }}>
                    {renderSchedule()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
