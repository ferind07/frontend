import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { Image, Button, notification, Tag } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AdminDetailProblem = () => {
  const { id } = useParams();

  const [report, setReport] = useState({});
  const [instructor, setInstructor] = useState({});

  const navigate = useNavigate();

  function getReport() {
    axios
      .get(BackendUrl + "/admin/getReportByID?id=" + id)
      .then((success) => {
        console.log(success.data);
        setReport(success.data);
        getInstuctorInfo(success.data.idInstructor);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getInstuctorInfo(id) {
    axios
      .get(BackendUrl + "/admin/instructorInfo?id=" + id)
      .then((success) => {
        console.log(success.data);
        setInstructor(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onClickApprove = () => {
    console.log("approve");
    axios
      .post(BackendUrl + "/admin/approveReport", {
        idReport: id,
        idSubmission: report.idSubmission,
        idHSubmission: report.idHsubmission,
        price: report.price,
        idUser: report.idUser,
      })
      .then((success) => {
        console.log(success);
        if (success.data.status) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          getReport();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickDecline = () => {
    axios
      .post(BackendUrl + "/admin/declineReport", {
        idReport: id,
        idSubmission: report.idSubmission,
        idHSubmission: report.idHsubmission,
      })
      .then((success) => {
        if (success.data.status) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          getReport();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReport();
  }, []);

  const renderButton = () => {
    if (report.status == 2) {
      return (
        <>
          <Button type="primary" onClick={onClickApprove}>
            Approve
          </Button>
          <Button type="danger" onClick={onClickDecline}>
            Decline
          </Button>
        </>
      );
    } else {
      if (report.status == 1) {
        return <Tag color="green">Approved</Tag>;
      } else if (report.status == 0) {
        return <Tag color="red">Declined</Tag>;
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-12">
          <div className="card mt-3 mb-5">
            <div className="card-body">
              <div className="d-flex mb-3 justify-content-between">
                <div>
                  <p className="text-muted mb-1">Problem id : {id}</p>
                  <p className="mb-0">
                    {moment(report.date).format("dddd, DD MMMM yyyy kk:mm")}
                  </p>
                </div>

                <div className="d-flex center" style={{ gap: "10px" }}>
                  {renderButton()}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-5">
                  <h5>Reported by: {report.name}</h5>
                  <p className="text-muted">{report.email}</p>
                  <h5>Class: {report.title}</h5>
                  <p className="text-muted">
                    by{" "}
                    <a
                      style={{ color: "blueviolet" }}
                      onClick={(e) => {
                        navigate(
                          "/admin/detailInstructor/" + report.idInstructor
                        );
                      }}
                    >
                      {instructor.name}
                    </a>{" "}
                    ({instructor.email})
                  </p>
                  <h5>Message: </h5>
                  <p>{report.message}</p>
                </div>
                <div className="col-7">
                  <Image src={BackendUrl + report.image} className="w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDetailProblem;
