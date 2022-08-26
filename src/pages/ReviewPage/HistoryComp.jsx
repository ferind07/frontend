import React, { useState, useEffect } from "react";
import { LaptopOutlined, TeamOutlined } from "@ant-design/icons";
import { Tag, Button, Drawer, Rate, Input, notification } from "antd";
import BackendUrl from "../../components/BackendUrl";
import moment from "moment";
import axios from "axios";
import NumberFormat from "react-number-format";

const HistoryComp = (props) => {
  const [visible, setVisible] = useState(false);
  const { TextArea } = Input;

  const month = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const time = moment(props.time);
  const orderId = props.orderId;
  const instructorName = props.instructorName;
  const idInstructor = props.idInstructor;
  const picture = props.picture;
  const courseName = props.courseName;
  const price = props.price;
  const timeString =
    time.date() + " " + month[time.month()] + " " + time.year();

  const [review, setReview] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function giveRating() {
    axios
      .post(BackendUrl + "/user/giveReview", {
        token: localStorage.getItem("token"),
        idHSubmission: orderId,
        idInstructor: idInstructor,
        rating: rating,
        comment: comment,
      })
      .then((success) => {
        if (success.data.status == true) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          const tempReview = [];
          tempReview.push({
            rating: rating,
            comment: comment,
          });
          setReview(tempReview);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getReview() {
    //console.log("getreview");
    axios
      .get(BackendUrl + "/user/getComment?idHSubmission=" + orderId)
      .then((success) => {
        //console.log(success);
        console.log(success.data);
        setReview(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const btnSend = () => {
    //console.log(review);
    if (review.length == 0) {
      return (
        <Button
          type="primary"
          onClick={(e) => {
            giveRating();
          }}
        >
          Send
        </Button>
      );
    } else {
      return (
        <Button type="primary" disabled>
          Send
        </Button>
      );
    }
  };

  const renderReviewComp = () => {
    console.log(review.length);
    if (review.length == 0) {
      return (
        <>
          <Rate
            value={rating}
            onChange={(value) => {
              setRating(value);
            }}
          />
          <TextArea
            className="mt-2"
            placeholder="Place your review here"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <Rate disabled value={review[0].rating} />
          <TextArea
            className="mt-2"
            placeholder="Place your review here"
            disabled
            value={review[0].comment}
          />
        </>
      );
    }
  };

  useEffect(() => {
    getReview();
  }, [orderId]);

  const showLargeDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="w-100 mt-2">
        <div className="card card-shadow">
          <div className="card-body">
            <div
              className="d-flex justify-content-start"
              style={{ gap: "10px" }}
            >
              <div className="d-flex justify-content-start center">
                <LaptopOutlined
                  style={{ color: "#1890ff", fontSize: "16px" }}
                />
              </div>
              <div className="d-flex center">
                <h6 className="mb-0">Course</h6>
              </div>
              <div className="d-flex center">
                <p className="mb-0">{timeString}</p>
              </div>
              <div className="d-flex center">
                <Tag color="blue">Done</Tag>
              </div>
              <div className="d-flex center">
                <p className="mb-0 text-muted">T {orderId}</p>
              </div>
            </div>
            <div
              className="d-flex justify-content-start  mt-2"
              style={{ gap: "5px" }}
            >
              <div className="d-flex center">
                <TeamOutlined style={{ fontSize: "16px" }} />
              </div>
              <div className="d-flex center">
                <h6 className="mb-0">{instructorName}</h6>
              </div>
            </div>
            <div
              className="d-flex justify-content-start mt-2"
              style={{ gap: "15px" }}
            >
              <div>
                <img
                  src={BackendUrl + picture}
                  width="150px"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>

              <div
                className="h-100 justify-content-start"
                style={{ height: "100%", alignItems: "start" }}
              >
                <h5>{courseName}</h5>
                <p className="text-muted">
                  {
                    <NumberFormat
                      value={price}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  }
                </p>
              </div>
            </div>
            <div
              className="d-flex mt-2 justify-content-end"
              style={{ gap: "10px" }}
            >
              <Button type="primary" onClick={(e) => showLargeDrawer()}>
                Give review
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title="Review"
        placement="right"
        size="large"
        onClose={onClose}
        visible={visible}
      >
        <div className="d-flex justify-content-start" style={{ gap: "10px" }}>
          <div>
            <img
              src={BackendUrl + picture}
              width="150px"
              style={{ aspectRatio: "4/3" }}
            />
          </div>

          <div>
            <h6>Course name</h6>
            <p className="text-muted mb-0">How about your course</p>
            {renderReviewComp()}
            <div className="mt-2">{btnSend()}</div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HistoryComp;
