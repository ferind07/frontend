import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const InstructorDetailSchedule = () => {
  let { id } = useParams();

  const [hSubmission, setHSubmission] = useState({});
  const [listSubmission, setListSubmission] = useState([]);

  function getListSubmission() {
    axios
      .get(
        BackendUrl +
          "/user/getSubmission?token=" +
          localStorage.getItem("token") +
          "&id=" +
          id
      )
      .then((success) => {
        console.log(success.data);
        setListSubmission(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getHSumbission() {
    axios
      .get(BackendUrl + "/user/getHSubmissionbyID?id=" + id)
      .then((success) => {
        console.log(success.data[0]);
        setHSubmission(success.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getListSubmission();
    getHSumbission();
  }, []);

  function timeString(time) {
    const dateStart = new Date(time);
    const dateStartString =
      dateStart.getDate() +
      "/" +
      (dateStart.getMonth() + 1) +
      "/" +
      dateStart.getFullYear() +
      " " +
      (dateStart.getHours() < 10
        ? "0" + dateStart.getHours()
        : dateStart.getHours()) +
      ":" +
      (dateStart.getMinutes() < 10
        ? "0" + dateStart.getMinutes()
        : dateStart.getMinutes());
    return dateStartString;
  }

  function actionClass(action) {
    axios
      .post(BackendUrl + "/user/actionClass", {
        token: localStorage.getItem("token"),
        action: action,
        id: id,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h3>{hSubmission.title} Class</h3>
                <h6>Applied by {hSubmission.name}</h6>
                <p>Applied At {timeString(hSubmission.timeInsert)}</p>
                <button onClick={(e) => actionClass(1)}>Accept</button>
                <button onClick={(e) => actionClass(2)}>Decline</button>
                <hr />
                <h5>Detail Class</h5>
                <div className="row">
                  <div className="col-6">
                    {listSubmission.map((subMissionItem) => {
                      const dateStart = new Date(subMissionItem.dateStart);
                      const dateStartString =
                        dateStart.getDate() +
                        "/" +
                        (dateStart.getMonth() + 1) +
                        "/" +
                        dateStart.getFullYear() +
                        " " +
                        (dateStart.getHours() < 10
                          ? "0" + dateStart.getHours()
                          : dateStart.getHours()) +
                        ":" +
                        (dateStart.getMinutes() < 10
                          ? "0" + dateStart.getMinutes()
                          : dateStart.getMinutes());
                      const dateEnd = new Date(subMissionItem.dateEnd);
                      const dateEndString =
                        dateEnd.getDate() +
                        "/" +
                        (dateEnd.getMonth() + 1) +
                        "/" +
                        dateEnd.getFullYear() +
                        " " +
                        (dateEnd.getHours() < 10
                          ? "0" + dateEnd.getHours()
                          : dateEnd.getHours()) +
                        ":" +
                        (dateEnd.getMinutes() < 10
                          ? "0" + dateEnd.getMinutes()
                          : dateEnd.getMinutes());
                      return (
                        <>
                          <div className="mt-2">
                            <div className="card">
                              <div className="card-body">
                                <h6>Date start</h6>
                                <p>{dateStartString}</p>
                                <h6>Date end</h6>
                                <p>{dateEndString}</p>
                              </div>
                            </div>
                          </div>
                        </>
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

export default InstructorDetailSchedule;
