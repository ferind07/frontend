import React, { useEffect, useState } from "react";
import Navbarr from "../../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import NumberFormat from "react-number-format";
import moment, { now } from "moment";
import { notification, Descriptions, Button, Drawer, Image } from "antd";
import { useNavigate } from "react-router-dom";
import CalendarComp from "./CalendarComp";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../components/Footer";

const HtmlToReactParser = require("html-to-react").Parser;

const ExploreClass = () => {
  let { id } = useParams();
  const [classDetail, setClassDetail] = useState({});
  const [activeDays, setActiveDays] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState([]);
  const [day1, setDay1] = useState();
  const [day2, setDay2] = useState();
  const [day3, setDay3] = useState();

  const htmlToReactParser = new HtmlToReactParser();

  let navigate = useNavigate();

  function laodClass() {
    console.log(id);
    axios
      .get(BackendUrl + "/user/getClassDetail?id=" + id)
      .then((success) => {
        setClassDetail(success.data);
        console.log(success.data);
        var activeDaysData = success.data.activeDays.split(",");
        //console.log(activeDaysData);
        activeDaysData = activeDaysData.map(Number);

        setActiveDays(activeDaysData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const renderActiveDays = () => {
    const comp = [];

    activeDays.map((element) => {
      var text = "";
      if (element == 0) {
        text = "Sunday";
      } else if (element == 1) {
        text = "Monday";
      } else if (element == 2) {
        text = "Tuesday";
      } else if (element == 3) {
        text = "Wednesday";
      } else if (element == 4) {
        text = "Thursday";
      } else if (element == 5) {
        text = "Friday";
      } else if (element == 6) {
        text = "Saturday";
      }
      comp.push(<p className="mt-1 mb-1">{text}</p>);
    });

    return comp;
  };

  const renderJumlahClass = () => {
    const element = [];
    if (classDetail.classCount) {
      for (let index = 0; index < classDetail.classCount; index++) {
        if (index + 1 == 1) {
          element.push(
            <>
              <h5 className="mt-2 mb-0">Select time {index + 1}</h5>
              <DatePicker
                id={"time" + (index + 1)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                dateFormat="MMMM d, yyyy h:mm aa"
                selected={day1}
                onChange={(date) => {
                  setDay1(date);
                }}
              />
            </>
          );
        } else if (index + 1 == 2) {
          element.push(
            <>
              <h5 className="mt-2 mb-0">Select time {index + 1}</h5>
              <DatePicker
                id={"time" + (index + 1)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                dateFormat="MMMM d, yyyy h:mm aa"
                selected={day2}
                onChange={(date) => {
                  setDay2(date);
                }}
              />
            </>
          );
        } else if (index + 1 == 3) {
          element.push(
            <>
              <h5 className="mt-2 mb-0">Select time {index + 1}</h5>
              <DatePicker
                id={"time" + (index + 1)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                dateFormat="MMMM d, yyyy h:mm aa"
                selected={day3}
                onChange={(date) => {
                  setDay3(date);
                }}
              />
            </>
          );
        }
      }
    }
    return element;
  };

  useEffect(() => {
    //console.log("explore class");
    laodClass();
  }, []);

  function xenditPay(id, amount) {
    axios
      .post(BackendUrl + "/user/xenditPay", {
        token: localStorage.getItem("token"),
        amount: amount,
        id: id,
      })
      .then((success) => {
        window.open(success.data.invoice_url, "_blank");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkTime(timeStart, timeEnd) {
    // check invalid date
    // check time timeRange
    // const insTimeStart = moment(classDetail.timeStart);
    // const insTimeEnd = moment(classDetail.timeEnd);

    // console.log(classDetail.timeStart);
    // console.log(insTimeStart);

    const tStart = String(classDetail.timeStart);
    const tEnd = String(classDetail.timeEnd);

    const ttimeStart = tStart.split(":");
    const ttimeEnd = tEnd.split(":");

    //console.log(ttimeStart);

    var insTimeStart = timeStart.set({
      hour: ttimeStart[0],
      minute: ttimeStart[1],
      second: ttimeStart[2],
    });
    var insTimeEnd = timeEnd.set({
      hour: ttimeEnd[0],
      minute: ttimeEnd[1],
      second: ttimeEnd[2],
    });

    // console.log(insTimeStart.hour());
    // console.log(insTimeEnd);

    console.log(timeStart.isBetween(insTimeStart, insTimeEnd));
    console.log(timeStart.hour());
    console.log(insTimeStart.hour());
    console.log(insTimeEnd.hour());
    if (
      timeStart.isBetween(insTimeStart, insTimeEnd) ||
      timeEnd.isBetween(insTimeStart, insTimeEnd)
    ) {
      console.log("menumpuk");
    }
  }

  function submitClass(e) {
    e.preventDefault();
    if (localStorage.getItem("token") == null) {
      notification.error({
        message: "Error",
        description: "You must login first",
      });
    } else {
      const token = localStorage.getItem("token");
      const idClass = id;
      const idInstructor = classDetail.idInstructor;
      let dateStart = [];
      let dateEnd = [];
      //dateEnd = moment(dateEnd).format("YYYY-MM-DD HH:mm:ss");
      for (let index = 0; index < classDetail.classCount; index++) {
        dateStart.push(
          moment(document.getElementById("time" + (index + 1)).value).format(
            "YYYY-MM-DD HH:mm:ss"
          )
        );
        const tdateEnd = moment(
          document.getElementById("time" + (index + 1)).value
        )
          .add(classDetail.duration, "m")
          .toDate();
        dateEnd.push(moment(tdateEnd).format("YYYY-MM-DD HH:mm:ss"));
      }

      var valid = true;

      //check hari

      for (let i = 0; i < dateStart.length; i++) {
        const dStart = moment(dateStart[i]);

        const daysStart = dStart.days();

        // console.log(daysStart);
        // console.log(activeDays);
        //console.log(activeDays.includes(daysStart));
        if (activeDays.includes(daysStart) == false) {
          valid = false;
          notification.error({
            message: "Error",
            description: "Instructor inactive day at time " + (i + 1),
          });
        }
      }

      for (let i = 0; i < dateStart.length; i++) {
        const dStart = moment(dateStart[i]);
        const dEnd = moment(dateEnd[i]);
        const dNow = moment();
        const nextMonth = moment().add(1, "month");

        if (dStart > nextMonth) {
          valid = false;
          notification.error({
            message: "Error",
            description:
              "Only can select interval in 1 month schedule  " + (i + 1),
          });
        }

        if (dStart < dNow) {
          console.log("invalid date");
          valid = false;
          notification.error({
            message: "Error",
            description: "can't select past days at schedule  " + (i + 1),
          });
        }

        const tStart = String(classDetail.timeStart);
        const tEnd = String(classDetail.timeEnd);

        const arrTimeStart = tStart.split(":");
        const arrTimeEnd = tEnd.split(":");

        const momentTimeStart = moment({
          h: arrTimeStart[0],
          m: arrTimeStart[1],
        });

        const momentTimeEnd = moment({
          h: arrTimeEnd[0],
          m: arrTimeEnd[1],
        });

        const momentTimeCourseStart = moment({
          h: dStart.hours(),
          m: dStart.minutes(),
        });

        // console.log(momentTimeStart);
        // console.log(momentTimeEnd);
        // console.log(momentTimeCourseStart);

        if (!momentTimeCourseStart.isBetween(momentTimeStart, momentTimeEnd)) {
          console.log("invalid");
          valid = false;
          notification.error({
            message: "Error",
            description: "Instructor inactive time at schedule " + (i + 1),
          });
        }
        // console.log(dStart.hour());
        // const tStart = String(classDetail.timeStart);
        // const tEnd = String(classDetail.timeEnd);

        // const ttimeStart = tStart.split(":");
        // const ttimeEnd = tEnd.split(":");

        // //console.log(ttimeStart);

        // var tempDStart = dStart;
        // var tempDEnd = dEnd;

        // var insTimeStart = tempDStart.set({
        //   hour: ttimeStart[0],
        //   minute: ttimeStart[1],
        //   second: ttimeStart[2],
        // });

        // var insTimeEnd = tempDEnd.set({
        //   hour: ttimeEnd[0],
        //   minute: ttimeEnd[1],
        //   second: ttimeEnd[2],
        // });

        // if (!moment(dateStart[i]).isBetween(insTimeStart, insTimeEnd)) {
        //   console.log("menumpuk");
        //   valid = false;
        //   notification.error({
        //     message: "Error",
        //     description: "Invalid instructor time " + (i + 1),
        //   });
        // }
      }
      if (valid) {
        alert("valid");
        axios
          .post(BackendUrl + "/user/submissionClass", {
            token: token,
            idClass: idClass,
            idInstructor: idInstructor,
            dateStart: dateStart,
            dateEnd: dateEnd,
          })
          .then((success) => {
            console.log(success);
            if (success.data.status) {
              //if no intersec schedule
              //payCourse(success.data.data.insertId);
              xenditPay(success.data.data.insertId, classDetail.price);
              navigate("/schedule");
            } else {
              console.log(success.data);
              const classData = success.data.data[0];
              const classTitle = classData.title;
              const dateStart = moment(classData.dateStart)
                .add(-7, "hours")
                .format("D MMM YYYY HH:mm");
              notification.error({
                message: `You have ${classTitle} class`,
                description: "at " + dateStart,
              });
            }
            //if payment success
            //console.log(success.data.data.insertId);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // axios
      //   .post(BackendUrl + "/user/submissionClass", {
      //     token: token,
      //     idClass: idClass,
      //     idInstructor: idInstructor,
      //     dateStart: dateStart,
      //     dateEnd: dateEnd,
      //   })
      //   .then((success) => {
      //     console.log(success);
      //     if (success.data.status) {
      //       //if no intersec schedule
      //       //payCourse(success.data.data.insertId);
      //       xenditPay(success.data.data.insertId, classDetail.price);
      //       navigate("/schedule");
      //     } else {
      //       notification.error({
      //         description: "Error",
      //         message: success.data.msg,
      //       });
      //     }
      //     //if payment success
      //     //console.log(success.data.data.insertId);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }
  function renderCatagories() {
    var katText = "";
    if (classDetail.katagori == 1) {
      katText = "Language";
    } else if (classDetail.katagori == 2) {
      katText = "Cooking";
    } else if (classDetail.katagori == 3) {
      katText = "Sports";
    } else if (classDetail.katagori == 4) {
      katText = "Design";
    } else if (classDetail.katagori == 5) {
      katText = "Programming";
    }
    return katText;
  }
  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };
  return (
    <>
      <Navbarr />
      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-12">
            <div className="card card-shadow mb-5">
              <div className="card-body">
                <h1 className="mb-0">{classDetail.title} Course</h1>
                <hr />
                <div className="row">
                  <div className="col-md-5">
                    <Image
                      src={BackendUrl + classDetail.image}
                      width="100%"
                      style={{ aspectRatio: "4/3" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <h4>Class description</h4>
                    <Descriptions bordered>
                      <Descriptions.Item label="Instructor" span={3}>
                        {classDetail.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Category" span={2}>
                        {renderCatagories()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Duration">
                        {classDetail.duration} minutes
                      </Descriptions.Item>
                      <Descriptions.Item label="Price" span={2}>
                        <NumberFormat
                          value={classDetail.price}
                          displayType="text"
                          thousandSeparator
                          prefix="Rp. "
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="Total class">
                        {classDetail.classCount} class
                      </Descriptions.Item>
                      <Descriptions.Item label="Available time" span={3}>
                        <div className="d-flex justify-content-between">
                          <div className="center">
                            {classDetail.timeStart} to {classDetail.timeEnd}
                          </div>
                          <Button type="primary" onClick={showDrawer}>
                            Schedule
                          </Button>
                        </div>
                      </Descriptions.Item>
                      <Descriptions.Item label="Available days">
                        {renderActiveDays()}
                      </Descriptions.Item>
                    </Descriptions>
                    <hr />

                    {renderJumlahClass()}
                    <br />
                    <button
                      className="btn btn-success mt-2"
                      onClick={(e) => {
                        submitClass(e);
                      }}
                    >
                      Book
                    </button>
                  </div>
                </div>
                <hr />
                <h5 className="mt-2">Detail Course</h5>
                <div>{htmlToReactParser.parse(classDetail.detail)}</div>
              </div>
            </div>
          </div>
          <div className="col-12"></div>
        </div>
      </div>

      <Drawer
        title="Schedule"
        placement="right"
        size="large"
        visible={visible}
        onClose={closeDrawer}
      >
        <CalendarComp idInstructor={classDetail.idInstructor} />
      </Drawer>
    </>
  );
};

export default ExploreClass;
