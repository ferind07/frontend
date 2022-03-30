import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import Navbarr from "../../components/Navbar";
import ScheduleCard from "./ScheduleCard";

const Schedule = () => {
  const [hSubmission, setHSubmission] = useState([]);

  function getHsubmission() {
    axios
      .get(
        BackendUrl + "/user/getSchedule?token=" + localStorage.getItem("token")
      )
      .then((success) => {
        setHSubmission(success.data);
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div className="card">
              <div className="card-body">
                <h2>Your Schedule</h2>
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
