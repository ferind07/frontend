import React, { useEffect, useState } from "react";
import { Button, Drawer, Input, notification } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import background from "../../img/background.jpg";
import "./style.css";
import BackendUrl from "../../components/BackendUrl";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const [userInfo, setUserInfo] = useState({});

  const [message, setMessage] = useState("");
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const { TextArea } = Input;

  const onClose = () => {
    setVisible(false);
  };

  function getUserInfo() {
    axios
      .get(BackendUrl + "/user/getInfo?token=" + localStorage.getItem("token"))
      .then((success) => {
        //console.log(success.data);
        setUserInfo(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function finishClass() {
    axios
      .post(BackendUrl + "/user/finishClass", {
        idSubmission: id,
      })
      .then((success) => {
        console.log(success);
        navigate("/");
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
    console.log(localStorage.getItem("token"));
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
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const btnConfirmation = () => {
    if (userInfo.role == 1) {
      return (
        <>
          <Button
            onClick={() => {
              finishClass();
            }}
          >
            Finish class
          </Button>{" "}
          <br />
          <Button
            type="danger"
            className="mt-2"
            onClick={(e) => {
              setVisible(true);
            }}
          >
            Report Class
          </Button>
        </>
      );
    } else if (userInfo.role == 2) {
      return (
        <>
          <a href="/" style={{ fontSize: "20px" }}>
            Back to Home
          </a>
        </>
      );
    }
  };

  const { id } = useParams();

  return (
    <>
      <div
        className="container-result"
        // style={{
        //   backgroundImage: `url(${background})`,
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <div className="child-result text-center">
          <h2>Class Has Been Ended by Host</h2>
          {btnConfirmation()}
        </div>
      </div>
      <Drawer
        title="Report class"
        placement="right"
        size="large"
        onClose={onClose}
        visible={visible}
      >
        <h3>Tell us what your problem</h3>

        <TextArea
          placeholder="Tell us your problem here"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <h3 className="mt-3">Upload </h3>
        <input type="file" onChange={(e) => handleImageChange(e)} />
        <br />
        <Button className="mt-3" type="primary" onClick={(e) => submitReport()}>
          Submit
        </Button>
      </Drawer>
    </>
  );
};

export default ResultPage;
