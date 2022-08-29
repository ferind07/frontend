import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { Descriptions, Button, notification } from "antd";

const AdminDetailInstructor = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [instructorInfo, setInstructorInfo] = useState({});

  function getDetailInstructor() {
    axios
      .get(BackendUrl + "/admin/getDetailInstructor?id=" + id)
      .then((success) => {
        console.log(success.data);
        setInstructorInfo(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUserInfo() {
    axios
      .get(BackendUrl + "/admin/getUserInfo?id=" + id)
      .then((success) => {
        console.log(success.data);
        setUserInfo(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function approveInstructor() {
    axios
      .post(BackendUrl + "/admin/approveInstructor", {
        idUser: id,
      })
      .then((success) => {
        if (success.data.status == true) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          getDetailInstructor();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDetailInstructor();
    getUserInfo();
  }, []);

  function renderImage(image) {
    if (image == "") {
      return (
        <img
          src="/asset/image/noPic.jpg"
          alt="Avatar"
          style={{
            borderRadius: "50%",
            width: "100%",
            border: "2px solid black",
          }}
        />
      );
    } else {
      return (
        <img
          src={BackendUrl + image}
          alt="Avatar"
          style={{ width: "100%", aspectRatio: "3/4" }}
        />
      );
    }
  }

  function banUser() {
    axios
      .post(BackendUrl + "/admin/banUser", {
        id: id,
        status: userInfo.status,
      })
      .then((success) => {
        if (userInfo.status == 1) {
          notification.success({
            message: "Success",
            description: "Success ban user",
          });
        } else {
          notification.success({
            message: "Success",
            description: "Success unban user",
          });
        }
        getUserInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const katagori = () => {
    var katagoriText = "";
    if (instructorInfo.katagori == 1) {
      katagoriText = "Language";
    } else if (instructorInfo.katagori == 2) {
      katagoriText = "Cooking";
    } else if (instructorInfo.katagori == 3) {
      katagoriText = "Sports";
    } else if (instructorInfo.katagori == 4) {
      katagoriText = "Design";
    } else if (instructorInfo.katagori == 5) {
      katagoriText = "Programming";
    }
    return katagoriText;
  };
  const time = () => {
    const timeStart = instructorInfo.timeStart;
    const timeEnd = instructorInfo.timeEnd;

    return timeStart + " - " + timeEnd;
  };
  const renderButton = () => {
    if (instructorInfo.valid == 0) {
      return (
        <Button
          type="primary"
          onClick={() => {
            approveInstructor();
          }}
        >
          Accept
        </Button>
      );
    } else {
      if (userInfo.status == 1) {
        return (
          <Button type="danger" onClick={() => banUser()}>
            Ban
          </Button>
        );
      } else if (userInfo.status == 0) {
        return (
          <Button type="primary" onClick={() => banUser()}>
            Unban
          </Button>
        );
      }
    }
  };

  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };

  return (
    <>
      <div className="container-style">
        <div className="container mt-3">
          <div className="card mb-5" style={boxStyle}>
            <div className="card-body">
              <h3>Detail Instructor</h3>
              <hr />
              <div className="row">
                <div className="col-4">
                  <div>{renderImage(userInfo.image)}</div>
                  <div className="mt-3">
                    <h5 className="text-center text-muted">{userInfo.name}</h5>
                  </div>
                  <div className="text-center">{renderButton()}</div>
                </div>
                <div className="col-8">
                  <h6>Instructor Info</h6>
                  <Descriptions bordered size="middle">
                    <Descriptions.Item label="Email" span={3}>
                      {userInfo.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Name" span={3}>
                      {userInfo.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone number" span={2}>
                      {userInfo.phoneNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Katagori" span={1}>
                      {katagori()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Available time" span={3}>
                      {time()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Instructor document" span={3}>
                      <a
                        href={BackendUrl + instructorInfo.berkas}
                        target="_blank"
                      >
                        View document
                      </a>
                    </Descriptions.Item>
                  </Descriptions>
                  <div className="mt-3">
                    <h6>Instructor Detail</h6>
                    <p>{instructorInfo.instructorDetail}</p>
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

export default AdminDetailInstructor;
