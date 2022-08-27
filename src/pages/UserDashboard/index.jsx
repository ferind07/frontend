import React, { useEffect, useState } from "react";
import Navbarr from "../../components/Navbar";
import axios from "axios";
import NumberFormat from "react-number-format";
import BackendUrl from "../../components/BackendUrl";
import moment from "moment";
import Calendar from "react-awesome-calendar";
import { useNavigate } from "react-router-dom";
import {
  DollarCircleOutlined,
  ContainerOutlined,
  UpCircleTwoTone,
} from "@ant-design/icons";

const UserDashboard = () => {
  const [detailUser, setDetailUser] = useState({});
  const [listEvent, setListEvent] = useState([]);

  let navigate = useNavigate();

  function getDetail() {
    axios
      .get(BackendUrl + "/user/getInfo?token=" + localStorage.getItem("token"))
      .then((success) => {
        console.log(success.data);
        setDetailUser(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getEvent() {
    axios
      .get(
        BackendUrl + "/user/userEvent?token=" + localStorage.getItem("token")
      )
      .then((success) => {
        console.log(success.data);

        const event = [];
        for (let index = 0; index < success.data.length; index++) {
          const element = success.data[index];
          const tFrom = moment(element.dateStart).add(0, "hours").format();
          const tEnd = moment(element.dateEnd).add(0, "hours").format();
          event.push({
            id: index,
            color: element.status == 0 ? "#A36A00" : "#0F7C4F",
            from: tFrom,
            to: tEnd,
            title: element.title + " with " + element.name,
          });
        }

        console.log(event);
        setListEvent(event);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };

  useEffect(() => {
    getDetail();
    getEvent();
  }, []);
  return (
    <>
      <Navbarr />
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="card card-shadow" style={boxStyle}>
              <div className="card-body">
                <h5>User Info</h5>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-12 mt-2">
                    <div className="card h-100" style={boxStyle}>
                      <div className="card-body d-flex">
                        <div>
                          <div
                            className="d-flex justify-content-start"
                            style={{ gap: "15px" }}
                          >
                            <h3 className="mb-0">Balance</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <NumberFormat
                              value={detailUser.saldo}
                              className="foo text-muted"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <h5 {...props}>Rp. {value}</h5>
                              )}
                            />
                          </div>
                        </div>
                        <div className="icon-box2">
                          <DollarCircleOutlined style={{ fontSize: "30px" }} />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 mt-2">
                    <div className="card h-100" style={boxStyle}>
                      <div className="card-body d-flex">
                        <div>
                          <div
                            className="d-flex justify-content-start"
                            style={{ gap: "15px" }}
                          >
                            <h3 className="mb-0">Upcoming class</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <h5 className="text-muted mt-0">
                              {listEvent.length} class
                            </h5>
                          </div>
                        </div>
                        <div className="icon-box2">
                          <ContainerOutlined style={{ fontSize: "30px" }} />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 mt-2">
                    <div
                      className="card h-100"
                      style={{
                        cursor: "pointer",
                        boxShadow: "0px 20px 27px #0000000d",
                        borderRadius: "12px",
                      }}
                      onClick={() => {
                        navigate("/userCashOut");
                      }}
                    >
                      <div className="card-body center">
                        <div className="d-flex" style={{ gap: "15px" }}>
                          <UpCircleTwoTone style={{ fontSize: "40px" }} />
                          <h4 className="mb-0">Cash out</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3 mb-5">
            <div className="card card-shadow" style={boxStyle}>
              <div className="card-body">
                <h5>User schedule</h5>
                <hr />
                <Calendar events={listEvent} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
