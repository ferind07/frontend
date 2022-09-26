import React, { useState, useEffect } from "react";
import BackendUrl from "../../components/BackendUrl";
import moment from "moment";
import axios from "axios";
import { Drawer, notification, Button, Tag, Input } from "antd";
import { useNavigate } from "react-router-dom";

const ScheduleCard = (props) => {
  const navigate = useNavigate();
  const id = props.submissionDetail.id;
  const today = new Date(props.submissionDetail.timeInsert);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const [submissionList, setSubmissionList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();

  const { TextArea } = Input;

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  var formatteddatestr = moment(new Date(props.submissionDetail.timeInsert))
    .add(-7, "hours")
    .format("dddd, DD MMMM yyyy kk:mm");
  const dateStr = formatteddatestr;

  useEffect(() => {
    getSubmission();
  }, [id]);

  function getSubmission() {
    axios
      .get(BackendUrl + "/user/getSubmissionByIdsubmission?idHsubmission=" + id)
      .then((success) => {
        console.log(success.data);
        setSubmissionList(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onClickJoin(e, id) {
    e.preventDefault();
    console.log(props.socket);
    axios
      .post(BackendUrl + "/joinRoom", {
        roomID: id,
        token: localStorage.getItem("token"),
      })
      .then((success) => {
        if (success.data.status) {
          notification.success({
            description: success.data.msg,
            message: "success",
          });
          navigate("/tutoring/" + id);
        } else {
          notification.error({
            description: success.data.msg,
            message: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const renderStatus = () => {
    var text = "";

    if (props.submissionDetail.status == 0) {
      text = "Unconfirmed";
    } else if (props.submissionDetail.status == 1) {
      text = "Confirmed";
    } else if (props.submissionDetail.status == 2) {
      text = "Declined";
    } else if (props.submissionDetail.status == 3) {
      text = "Complete";
    } else if (props.submissionDetail.status == 4) {
      text = "Expired";
    } else if (props.submissionDetail.status == 5) {
      text = "Waiting for payment";
    } else if (props.submissionDetail.status == 6) {
      text = "Reported";
    } else if (props.submissionDetail.status == 7) {
      text = "Ended by admin";
    }

    return text;
  };

  const btnStatus = () => {
    if (
      props.submissionDetail.status == 1 ||
      props.submissionDetail.status == 6 ||
      props.submissionDetail.status == 0
    ) {
      return (
        <Button type="primary" onClick={showDrawer}>
          Detail
        </Button>
      );
    }
  };

  const renderButton = (subMissionItem) => {
    if (subMissionItem.status == 1) {
      return (
        <button
          className="btn btn-dark"
          onClick={(e) => onClickJoin(e, subMissionItem.id)}
        >
          Join Class
        </button>
      );
    } else if (subMissionItem.status == 2 || subMissionItem.status == 0) {
      return (
        <button
          className="btn btn-dark"
          onClick={(e) => onClickJoin(e, subMissionItem.id)}
          disabled
        >
          Join Class
        </button>
      );
    } else if (subMissionItem.status == 5) {
      return <Tag color="red">Reported</Tag>;
    } else if (subMissionItem.status == 4) {
      return <Tag color="blue">Class Ended</Tag>;
    }
  };

  const renderLinkPayment = () => {
    if (props.submissionDetail.status == 5) {
      return (
        <>
          <Button
            type="primary"
            onClick={(e) => {
              window.open(props.submissionDetail.linkPayment, "_blank");
            }}
          >
            Link payment
          </Button>
        </>
      );
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

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
                src={BackendUrl + props.submissionDetail.image}
                style={{ width: "100%", aspectRatio: "4/3" }}
              />
            </div>
            <div className="col-8">
              <h5 className="mb-1">{props.submissionDetail.title} Class</h5>
              <p className="mb-1">
                With <strong>{props.submissionDetail.iName}</strong>
              </p>
              <p className="mb-1">Applied at {dateStr}</p>
              <p className="mb-1">
                Status : <strong>{renderStatus()}</strong>
              </p>
              {btnStatus()}
              {renderLinkPayment()}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title="Detail class"
        placement="right"
        onClose={onClose}
        visible={visible}
        size="large"
      >
        <div className="row">
          <div className="col-12">
            {submissionList.map((subMissionItem, i) => {
              //console.log(subMissionItem);

              const rendeBtnReport = () => {
                const dateNow = moment(new Date()).add(15, "minutes");
                const dateEnd = moment(subMissionItem.dateEnd).add(-7, "hours");

                if (dateNow > dateEnd && subMissionItem.status != 5) {
                  return (
                    <Button
                      danger
                      onClick={(e) => {
                        navigate("/addReport/" + subMissionItem.id);
                      }}
                    >
                      Report
                    </Button>
                  );
                } else {
                  return (
                    <Button disabled danger>
                      Report
                    </Button>
                  );
                }
              };
              const dateStart = moment(subMissionItem.dateStart).add(
                -7,
                "hours"
              );
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
              const dateEnd = moment(subMissionItem.dateEnd).add(-7, "hours");
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
                  <div className="card mt-2" style={boxStyle}>
                    <div className="card-body">
                      <h5>Class - {i + 1}</h5>
                      <h6>
                        {dateStartString} to {dateEndString}
                      </h6>
                      <div className="d-flex justify-content-between">
                        {renderButton(subMissionItem)}
                        {rendeBtnReport()}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ScheduleCard;
