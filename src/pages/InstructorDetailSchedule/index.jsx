import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { notification, Button } from "antd";
import { useNavigate } from "react-router-dom";

const InstructorDetailSchedule = () => {
  let { id } = useParams();

  const navigate = useNavigate();
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

  const renderUserImage = () => {
    if (hSubmission.userImage == "") {
      return (
        <>
          <img
            src="/asset/image/noPic.jpg"
            className="w-100"
            style={{ aspectRatio: "4/3" }}
          />
        </>
      );
    } else {
      return (
        <>
          <img
            src={BackendUrl + hSubmission.userImage}
            className="w-100"
            style={{ aspectRatio: "4/3" }}
          />
        </>
      );
    }
  };

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
    if (action == 2) {
      axios
        .post(BackendUrl + "/user/declineClass", {
          idUser: hSubmission.idUser,
          price: hSubmission.price,
        })
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

    const temp = hSubmission;
    temp.status = action;
    setHSubmission(temp);
    window.location.reload();
  }

  function createClass(e, idUser, idSubmission) {
    e.preventDefault();
    axios
      .post(BackendUrl + "/createRoom", {
        token: localStorage.getItem("token"),
        idUser: idUser,
        idSubmission: idSubmission,
      })
      .then((success) => {
        console.log(success);
        if (success.data.status) {
          notification.success({
            description: success.data.msg,
            message: "Success",
          });
          navigate("/tutoring/" + idSubmission);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const btnAction = () => {
    if (hSubmission.status == 0) {
      return (
        <>
          <Button
            type="primary"
            onClick={(e) => actionClass(1)}
            style={{ marginRight: "10px" }}
          >
            Accept
          </Button>
          <Button danger type="primary" onClick={(e) => actionClass(2)}>
            Decline
          </Button>
        </>
      );
    } else if (hSubmission.status == 1) {
      return <h6>Status accepted</h6>;
    } else if (hSubmission.status == 2) {
      return <h6>Status rejected</h6>;
    }
  };

  const renderButton = (subMissionItem) => {
    console.log(subMissionItem);
    if (
      hSubmission.status == 0 ||
      hSubmission.status == 2 ||
      subMissionItem.status == 2
    ) {
      return (
        <>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              createClass(e, subMissionItem.idUser, subMissionItem.id);
            }}
            disabled
          >
            Create Class
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              createClass(e, subMissionItem.idUser, subMissionItem.id);
            }}
          >
            Create Class
          </button>
        </>
      );
    }
  };

  return (
    <>
      {/* <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h3>{hSubmission.title} Class</h3>
                <h6>Applied by {hSubmission.name}</h6>
                <p>Applied At {timeString(hSubmission.timeInsert)}</p>
                {btnAction()}
                <hr />
                <h5>Detail Class</h5>
                <div className="row">
                  <div className="col-12">
                    {listSubmission.map((subMissionItem, i) => {
                      //console.log(subMissionItem);
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
                          <div className="mt-2" key={i}>
                            <div className="card">
                              <div className="card-body">
                                <h6>Date start</h6>
                                <p>{dateStartString}</p>
                                <h6>Date end</h6>
                                <p>{dateEndString}</p>
                                <button
                                  className="btn btn-primary"
                                  onClick={(e) => {
                                    createClass(
                                      e,
                                      subMissionItem.idUser,
                                      subMissionItem.id
                                    );
                                  }}
                                >
                                  Create Class
                                </button>
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
      </div> */}
      <div className="container mt-3 mb-4">
        <div className="row">
          <div className="col-5">
            <div className="card">
              <div className="card-body">
                <h3>Detail Class</h3>
                <hr />
                <div>
                  <img
                    src={BackendUrl + hSubmission.image}
                    className="w-100"
                    style={{ aspectRatio: "4/3" }}
                  />
                  <h5 className="text-muted mt-2 mb-0">
                    {hSubmission.title} class
                  </h5>
                  <p>Applied at {timeString(hSubmission.timeInsert)}</p>
                </div>

                <h4>Detail student</h4>
                <hr />
                <div>
                  {renderUserImage()}
                  <h5 className="text-muted mt-2">{hSubmission.name}</h5>
                </div>
                <hr />
                <div>{btnAction()}</div>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="card">
              <div className="card-body">
                <h3>Schedule</h3>
                <div>
                  <div className="row">
                    <div className="col-12">
                      {listSubmission.map((subMissionItem, i) => {
                        //console.log(subMissionItem);
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
                            <div className="mt-2" key={i}>
                              <div className="card">
                                <div className="card-body">
                                  <h6>Date start</h6>
                                  <p>{dateStartString}</p>
                                  <h6>Date end</h6>
                                  <p>{dateEndString}</p>
                                  {renderButton(subMissionItem)}
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
      </div>
    </>
  );
};

export default InstructorDetailSchedule;
