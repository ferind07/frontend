import React, { useEffect, useState } from "react";
import Navbarr from "../../components/Navbar";
import axios from "axios";
import NumberFormat from "react-number-format";
import BackendUrl from "../../components/BackendUrl";
import moment from "moment";
import Calendar from "react-awesome-calendar";
import { useNavigate } from "react-router-dom";
import {
  DollarCircleTwoTone,
  ContainerTwoTone,
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
          const tFrom = moment(element.dateStart).add(7, "hours").format();
          const tEnd = moment(element.dateEnd).add(7, "hours").format();
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
            <div className="card card-shadow">
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex" style={{ gap: "15px" }}>
                          <DollarCircleTwoTone style={{ fontSize: "40px" }} />
                          <h4 className="mb-0">Balance</h4>
                        </div>
                        <div className="d-flex mt-2" style={{ gap: "10px" }}>
                          <NumberFormat
                            value={detailUser.saldo}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value, props) => (
                              <h5 {...props}>Rp. {value}</h5>
                            )}
                          />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex" style={{ gap: "15px" }}>
                          <ContainerTwoTone style={{ fontSize: "40px" }} />
                          <h4 className="mb-0">Upcoming class</h4>
                        </div>

                        <h5 className="text-muted mt-2">
                          {listEvent.length} class
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="card h-100"
                      style={{ cursor: "pointer" }}
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
            <div className="card card-shadow">
              <div className="card-body">
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
