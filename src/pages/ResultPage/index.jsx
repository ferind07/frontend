import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import background from "../../img/background.jpg";
import "./style.css";
import BackendUrl from "../../components/BackendUrl";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

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
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="child-result text-center">
          <h2>Class Has Been Ended by Host</h2>
          {btnConfirmation()}
        </div>
      </div>
    </>
  );
};

export default ResultPage;
