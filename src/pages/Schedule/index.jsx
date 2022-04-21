import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import Navbarr from "../../components/Navbar";
import ScheduleCard from "./ScheduleCard";

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
    alert(e.target.value);

    const temp = tempHsubmission.current.filter((item) => {
      return item.status == e.target.value;
    });
    console.log(temp);
    setHSubmission(temp);
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
                <p>{hSubmission.length}</p>
                <p></p>
                <div className="row">
                  <div className="col-12">
                    {hSubmission.map((submissionDetail, i) => {
                      return (
                        <ScheduleCard
                          submissionDetail={submissionDetail}
                          key={i}
                        />
                      );
                    })}
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
