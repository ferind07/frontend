import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { WarningOutlined } from "@ant-design/icons";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { Image, Input, notification, Button } from "antd";
import moment from "moment";

const AddReport = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState({});

  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const { TextArea } = Input;

  const navigate = useNavigate();

  function getClassDetailByIDSubmission(params) {
    axios
      .get(BackendUrl + "/user/getClassDetailByIDSubmission?idSubmission=" + id)
      .then((success) => {
        console.log(success.data);
        setClassDetail(success.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  function checkInput() {
    var valid = true;

    if (message == "") {
      valid = false;
      notification.error({
        message: "Error",
        description: "Please fill message field",
      });
    }

    if (file == undefined) {
      valid = false;
      notification.error({
        message: "Error",
        description: "Please insert image",
      });
    }

    return valid;
  }

  function submitReport() {
    //console.log(localStorage.getItem("token"));
    if (checkInput()) {
      let bodyFormData = new FormData();
      bodyFormData.append("token", localStorage.getItem("token"));
      bodyFormData.append("idSubmission", id);
      bodyFormData.append("message", message);
      bodyFormData.append("report", file);
      axios
        .post(BackendUrl + "/user/submitReport", bodyFormData)
        .then((success) => {
          if (success.data.status) {
            notification.success({
              message: "Success",
              description: "Success submit report",
            });
          }
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getClassDetailByIDSubmission();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-style">
        <div className="container w-50 pt-5">
          <div className="row">
            <div className="col-12">
              <div className="card box-style">
                <div className="card-header d-flex justify-content-between">
                  <h4 className="mb-0">Report</h4>
                  <WarningOutlined style={{ fontSize: "25px" }} />
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-5 ">
                      <Image
                        src={BackendUrl + classDetail.image}
                        style={{ aspectRatio: "4/3" }}
                      />
                    </div>
                    <div className="col-7 text-left">
                      <h4 className="text-left">{classDetail.title}</h4>
                      <p className="mb-1 text-muted">
                        Time start{" "}
                        {moment(classDetail.dateStart)
                          .add(-7, "hours")
                          .format("D MMM YYYY, kk:mm")}
                      </p>
                      <p className="text-muted">
                        Time end{" "}
                        {moment(classDetail.dateEnd)
                          .add(-7, "hours")
                          .format("D MMM YYYY, kk:mm")}
                      </p>
                      <h3>Tell us what your problem</h3>

                      <TextArea
                        placeholder="Tell us your problem here"
                        className="mb-2"
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                      />

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                      />
                      <br />
                      <Button
                        className="mt-3"
                        type="primary"
                        onClick={(e) => submitReport()}
                      >
                        Submit
                      </Button>
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

export default AddReport;
