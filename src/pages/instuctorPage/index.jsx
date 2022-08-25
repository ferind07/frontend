import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import {
  InfoCircleOutlined,
  ContainerOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import Calendar from "react-awesome-calendar";
import moment from "moment";
import NumberFormat from "react-number-format";
import ScheduleComp from "./ScheduleComp";
import { Rate, Empty } from "antd";
import { Bar } from "react-chartjs-2";
import CommentComp from "./CommentComp";
import "chart.js/auto";

const InstructorPage = () => {
  const [listClass, setListClass] = useState([]);
  const [hSubmission, setHSubmission] = useState([]);
  const [listEvent, setListEvent] = useState([]);
  const [detailUser, setDetailUser] = useState({});
  const [listReview, setListReview] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Reviews Chart",
      },
    },
  };

  function loadClass() {
    axios
      .get(
        BackendUrl + "/user/getClassList?token=" + localStorage.getItem("token")
      )
      .then((success) => {
        console.log(success.data.rows);
        setListClass(success.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getEvent() {
    axios
      .get(
        BackendUrl +
          "/user/instructorEvent?token=" +
          localStorage.getItem("token")
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

  function getHSubmission() {
    console.log("get submission");
    axios
      .get(
        BackendUrl +
          "/user/getHSubmission?token=" +
          localStorage.getItem("token")
      )
      .then((success) => {
        console.log(success.data);
        setHSubmission(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  function getReview() {
    axios
      .get(
        BackendUrl + "/user/getReview?token=" + localStorage.getItem("token")
      )
      .then((success) => {
        console.log(success.data);
        setListReview(success.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // const rejectedClass = () => {
  //   const rejectedClass = hSubmission.filter(function (value) {
  //     return value.status == 2;
  //   });
  //   return rejectedClass;
  // };

  const waitingResponse = () => {
    const waitingResponse = hSubmission.filter(function (value) {
      return value.status == 0;
    });
    return waitingResponse;
  };

  useEffect(() => {
    loadClass();
    getHSubmission();
    getEvent();
    getDetail();
    getReview();
  }, []);

  const averageReview = () => {
    var tempReview = 0;

    listReview.map((review) => {
      tempReview += review.rating;
    });
    // console.log(tempReview / listReview.length);
    tempReview = tempReview / listReview.length;
    //console.log(tempReview);
    return tempReview;
  };

  const labels = ["1", "2", "3", "4", "5"];

  function starCount(star) {
    var count = 0;
    count = listReview.filter(function (review) {
      return review.rating == star;
    }).length;
    return count;
  }

  const dataReview = () => {
    const tempData = {
      labels,
      datasets: [
        {
          label: "Star",
          data: [
            starCount(1),
            starCount(2),
            starCount(3),
            starCount(4),
            starCount(5),
          ],
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    return tempData;
  };

  const reviewComp = () => {
    if (listReview.length == 0) {
      return <Empty />;
    } else {
      var comp = [];
      listReview.map((review) => {
        comp.push(
          <CommentComp
            name={review.name}
            rating={review.rating}
            comment={review.comment}
          />
        );
      });
      return comp;
    }
  };
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card card-shadow">
              <div className="card-body">
                <h3>Instructor Dashboard</h3>
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
                            <h4>Total course</h4>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <h5 className="text-muted">
                              {listClass.length} course
                            </h5>
                          </div>
                        </div>
                        <div className="icon-box2">
                          <ContainerOutlined style={{ fontSize: "40px" }} />
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
                            <h3 className="mb-0">Total course</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <h5 className="text-muted">
                              {waitingResponse().length} course
                            </h5>
                          </div>
                        </div>
                        <div className="icon-box2">
                          <InfoCircleOutlined style={{ fontSize: "40px" }} />
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
                            <h3 className="mb-0">Your balance</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
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
                        </div>
                        <div className="icon-box2">
                          <DollarCircleOutlined style={{ fontSize: "40px" }} />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="card card-shadow">
              <div className="card-body">
                <h3>Your review</h3>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <h5>Overall rating</h5>
                    <div className="d-flex">
                      <span>
                        <Rate disabled value={averageReview()} />
                      </span>
                    </div>
                    <hr />
                    <Bar options={options} data={dataReview()} />
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex center">
                            <h5 className="mb-0">Comments</h5>
                          </div>

                          <select>
                            <option value="">paling bagus</option>
                            <option value="">paling jelek</option>
                          </select>
                        </div>
                        <hr />
                        <div style={{ overflowY: "auto", height: "400px" }}>
                          {reviewComp()}
                        </div>
                        <hr />
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
                <h3>Your activity</h3>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <Calendar events={listEvent} />
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5>Your Schedule</h5>
                        <hr />
                        <div style={{ overflowY: "auto" }}>
                          {listEvent.map((event, index) => {
                            return (
                              <ScheduleComp
                                key={index}
                                from={event.from}
                                title={event.title}
                              />
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
      </div>
    </>
  );
};

export default InstructorPage;
