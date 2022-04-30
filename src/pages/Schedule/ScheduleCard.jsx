import React, { useState, useEffect } from "react";
import BackendUrl from "../../components/BackendUrl";
import moment from "moment";
import axios from "axios";
import { Drawer, notification } from "antd";
import { useNavigate } from "react-router-dom";

const ScheduleCard = (props) => {
  const navigate = useNavigate();
  const id = props.submissionDetail.id;
  const today = new Date(props.submissionDetail.timeInsert);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  const [submissionList, setSubmissionList] = useState([]);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  var formatteddatestr = moment(props.submissionDetail.timeInsert).format(
    "hh:mm a"
  );
  const dateStr = dd + "/" + mm + "/" + yyyy + " " + formatteddatestr;

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
    }

    return text;
  };

  const btnStatus = () => {
    if (props.submissionDetail.status == 1) {
      return (
        <button className="btn btn-primary btn-sm" onClick={showDrawer}>
          Detail
        </button>
      );
    }
  };

  return (
    <>
      <div className="card mt-2">
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
              <p className="mb-1">With {props.submissionDetail.iName}</p>
              <p className="mb-1">Applied at {dateStr}</p>
              <p className="mb-1">Status : {renderStatus()}</p>
              {btnStatus()}
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
                  <div className="card card-shadow mt-2">
                    <div className="card-body">
                      <h5>Class - {i + 1}</h5>
                      <h6>
                        {dateStartString} to {dateEndString}
                      </h6>
                      <button
                        className="btn btn-dark"
                        onClick={(e) => onClickJoin(e, subMissionItem.id)}
                      >
                        Join Class
                      </button>
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
