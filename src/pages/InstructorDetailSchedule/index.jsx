import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import {
  notification,
  Button,
  Collapse,
  Descriptions,
  Tag,
  Drawer,
  Rate,
  Input,
  Table,
  Empty,
} from "antd";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import moment from "moment";

const InstructorDetailSchedule = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const [hSubmission, setHSubmission] = useState({});
  const [listSubmission, setListSubmission] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [classDetail, setClassDetail] = useState({});
  const [review, setReview] = useState([]);

  const { Panel } = Collapse;
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userReview, setUserReview] = useState([]);

  const showDrawer = () => {
    setOpen(true);
    getListUserReview();
  };

  const onClose = () => {
    setOpen(false);
  };

  function getUserDetail(idUser) {
    axios
      .get(BackendUrl + "/user/getUser?id=" + idUser)
      .then((success) => {
        setUserDetail(success.data);
        console.log(success.data);
        getUserReview(success.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getListUserReview() {
    axios
      .get(
        BackendUrl +
          `/user/userReview?idUser=${userDetail.id}&idHSubmission=${hSubmission.id}`
      )
      .then((success) => {
        console.log(success.data);
        setReview(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function placeReview() {
    axios
      .post(BackendUrl + "/user/placeUserReview", {
        token: localStorage.getItem("token"),
        idUser: userDetail.id,
        rating: rating,
        comment: comment,
        idHSubmission: hSubmission.id,
      })
      .then((success) => {
        if (success.data.status == true) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          getListUserReview();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUserReview(idUser) {
    axios
      .get(BackendUrl + `/user/getUserReview?idUser=${idUser}`)
      .then((success) => {
        console.log(success.data);
        setUserReview(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const renderReviewComp = () => {
    console.log(review.length);
    if (review.length == 0) {
      return (
        <>
          <Rate
            value={rating}
            onChange={(value) => {
              setRating(value);
            }}
          />
          <TextArea
            className="mt-2"
            placeholder="Place your review here"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <div className="d-flex justify-content-end mt-2">
            <Button
              type="primary"
              onClick={() => {
                placeReview();
              }}
            >
              Place review
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Rate disabled value={review[0].rating} />
          <TextArea
            className="mt-2"
            placeholder="Place your review here"
            disabled
            value={review[0].comment}
          />
        </>
      );
    }
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthText = [
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

  function getClassDetail(idClass) {
    axios
      .get(BackendUrl + "/user/getClassDetail?id=" + idClass)
      .then((success) => {
        setClassDetail(success.data);
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        const idUser = success.data[0].idUser;
        const idClass = success.data[0].idClass;

        getClassDetail(idClass);
        getUserDetail(idUser);
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
            className=""
            style={{ aspectRatio: "3/4", width: "50%" }}
          />
        </>
      );
    } else {
      return (
        <>
          <img
            src={BackendUrl + hSubmission.userImage}
            className="w-75"
            style={{ aspectRatio: "3/4" }}
          />
        </>
      );
    }
  };

  const renderTimeApliedAT = () => {
    var timeText = "";
    const momentAppliedat = moment(hSubmission.timeInsert).add(-7, "hours");
    timeText =
      momentAppliedat.date() +
      " " +
      monthText[momentAppliedat.month()] +
      " " +
      momentAppliedat.year() +
      " at " +
      (momentAppliedat.hours() < 10
        ? "0" + momentAppliedat.hours()
        : momentAppliedat.hours()) +
      ":" +
      (momentAppliedat.minutes() < 10
        ? "0" + momentAppliedat.minutes()
        : momentAppliedat.minutes());
    return timeText;
  };

  const renderPotentialIncome = () => {
    let potentialIncome = classDetail.price;

    potentialIncome = (potentialIncome * 95) / 100;

    return potentialIncome;
  };

  const userDescription = () => {
    return (
      <>
        <Descriptions bordered title="Student Info" size="small">
          <Descriptions.Item label="Email" span={3}>
            {userDetail.email}
          </Descriptions.Item>
          <Descriptions.Item label="Name" span={3}>
            {userDetail.name}
          </Descriptions.Item>
          <Descriptions.Item label="Phone number" span={3}>
            {userDetail.phoneNumber}
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  };

  const classDesciption = () => {
    return (
      <>
        <Descriptions bordered title="Class Info" size="small">
          <Descriptions.Item label="Title" span={3}>
            {classDetail.title}
          </Descriptions.Item>
          <Descriptions.Item label="Duration" span={3}>
            {classDetail.duration} minutes
          </Descriptions.Item>
          <Descriptions.Item label="Phone number" span={3}>
            <NumberFormat
              value={classDetail.price}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
            />
          </Descriptions.Item>
        </Descriptions>
      </>
    );
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
          idUser: userDetail.id,
          saldoUser: userDetail.saldo,
          price: classDetail.price,
        })
        .then((success) => {
          console.log(success);
          notification.error({
            message: "Success",
            description: "Success reject class",
          });
          getHSumbission();
          getListSubmission();
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
        notification.success({
          message: "Success",
          description: "Success accept class",
        });
        getHSumbission();
        getListSubmission();
      })
      .catch((error) => {
        console.log(error);
      });

    // const temp = hSubmission;
    // temp.status = action;
    // setHSubmission(temp);
    // window.location.reload();
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
      hSubmission.status == 0 || //unconfirm
      hSubmission.status == 2 || //decline
      hSubmission.status == 7 ||
      subMissionItem.status == 2 ||
      subMissionItem.status == 5
    ) {
      return (
        <>
          <button
            style={{ marginRight: "10px" }}
            className="btn btn-primary"
            onClick={(e) => {
              createClass(e, subMissionItem.idUser, subMissionItem.id);
            }}
            disabled
          >
            Create Class
          </button>
          {subMissionItem.status == 5 ? <Tag color="red">Reported</Tag> : ""}
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
          <p></p>
        </>
      );
    }
  };

  function finishClass(id) {
    axios
      .post(BackendUrl + "/user/finishClass", {
        idSubmission: id,
      })
      .then((success) => {
        if (success.data.status == true) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          getListSubmission();
          getHSumbission();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const renderBtnFinish = (subMissionItem) => {
    const dateEnd = moment(subMissionItem.dateEnd)
      .add(-7, "hours")
      .add(1, "day");

    if (
      moment().isAfter(dateEnd) &&
      subMissionItem.status !== 5 &&
      subMissionItem.status !== 2
    ) {
      return (
        <Button
          onClick={(e) => {
            finishClass(subMissionItem.id);
          }}
        >
          Finish Class
        </Button>
      );
    }
  };

  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };

  const renderReviewStudent = () => {
    if (hSubmission.status == 3) {
      return (
        <>
          <Button onClick={showDrawer}>Review Student</Button>
          <Drawer
            title="Review student"
            placement="right"
            onClose={onClose}
            visible={open}
          >
            <h5>Give review to your student</h5>
            {renderReviewComp()}
          </Drawer>
        </>
      );
    }
  };

  const reviewComp = (detailReview) => {
    const dateStr = moment(detailReview.createAt).format("D MMM YYYY");
    return (
      <>
        <div className="card mt-1" style={boxStyle}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex center" style={{ gap: "20px" }}>
                <h6 className="mb-0">{detailReview.name}</h6>
              </div>
              <Rate disabled value={detailReview.rating} />
            </div>
            <hr className="mt-1 mb-1" />
            <div className="d-flex justify-content-between">
              <p className="mb-0">{detailReview.comment}</p>
              <p className="mb-0 text-muted" style={{ fontWeight: "bold" }}>
                {dateStr}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderUserReview = () => {
    if (userReview.length == 0) {
      return <Empty description="No reviews yet" />;
    } else {
      return (
        <>
          <div style={{ height: "300px", overflowY: "auto" }}>
            {userReview.map((detailReview) => {
              return reviewComp(detailReview);
            })}
          </div>
        </>
      );
    }
  };
  const { TextArea } = Input;
  return (
    <>
      <div className="container-style">
        <div className="container mt-3 mb-4">
          <div className="row">
            <div className="col-7">
              <div className="card mb-5" style={boxStyle}>
                <div className="card-body">
                  <h3>Class Info</h3>
                  <div className="row">
                    <div className="col-6">
                      <img
                        src={BackendUrl + hSubmission.image}
                        className="w-100"
                        style={{ aspectRatio: "4/3" }}
                      />
                    </div>
                    <div className="col-6">
                      <h5 className="mb-1">{hSubmission.title} class</h5>
                      <p className="text-muted">
                        Applied at {renderTimeApliedAT()}
                      </p>
                      <h6>Potential Income</h6>
                      <NumberFormat
                        value={renderPotentialIncome()}
                        className="foo"
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value, props) => (
                          <h5 {...props}>Rp. {value}</h5>
                        )}
                      />
                      <div>{btnAction()}</div>
                      <div>{renderReviewStudent()}</div>
                    </div>
                  </div>

                  <Collapse className="mt-3">
                    <Panel header="Detail Student" key="1">
                      <div className="row">
                        <div className="col-6 text-center">
                          {renderUserImage()}
                        </div>
                        <div className="col-6">{userDescription()}</div>
                      </div>
                    </Panel>
                    <Panel header="Detail Class" key="2">
                      <div className="row">
                        <div className="col-5">
                          <img
                            src={BackendUrl + hSubmission.image}
                            className="w-100"
                            style={{ aspectRatio: "4/3" }}
                          />
                        </div>
                        <div className="col-7">{classDesciption()}</div>
                      </div>
                    </Panel>
                    <Panel header="User review" key="3">
                      <div>{renderUserReview()}</div>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="card" style={boxStyle}>
                <div className="card-body">
                  <h3>Schedule</h3>
                  <div>
                    <div className="row">
                      <div className="col-12">
                        {listSubmission.map((subMissionItem, i) => {
                          //console.log(subMissionItem);
                          const dateStart = moment(
                            subMissionItem.dateStart
                          ).add(-7, "hours");
                          const dateStartString =
                            dateStart.date() +
                            "/" +
                            (dateStart.month() + 1) +
                            "/" +
                            dateStart.year() +
                            " " +
                            (dateStart.hours() < 10
                              ? "0" + dateStart.hours()
                              : dateStart.hours()) +
                            ":" +
                            (dateStart.minutes() < 10
                              ? "0" + dateStart.minutes()
                              : dateStart.minutes());
                          const dateEnd = moment(subMissionItem.dateEnd).add(
                            -7,
                            "hours"
                          );
                          const dateEndString =
                            dateEnd.date() +
                            "/" +
                            (dateEnd.month() + 1) +
                            "/" +
                            dateEnd.year() +
                            " " +
                            (dateEnd.hours() < 10
                              ? "0" + dateEnd.hours()
                              : dateEnd.hours()) +
                            ":" +
                            (dateEnd.minutes() < 10
                              ? "0" + dateEnd.minutes()
                              : dateEnd.minutes());
                          return (
                            <>
                              <div className="mt-2" key={i}>
                                <div className="card">
                                  <div className="card-body">
                                    <h6>Date start</h6>
                                    <p>{dateStartString}</p>
                                    <h6>Date end</h6>
                                    <p>{dateEndString}</p>
                                    <div className="d-flex justify-content-between">
                                      {renderButton(subMissionItem)}
                                      {renderBtnFinish(subMissionItem)}
                                    </div>
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
      </div>
    </>
  );
};

export default InstructorDetailSchedule;
