import React, { useState, useEffect } from "react";
import Navbarr from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { Rate, Tabs } from "antd";
import Footer from "../../components/Footer";
import axios from "axios";
import "./index.css";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import BackendUrl from "../../components/BackendUrl";
import ClassListContent from "./ClassListContent";
import ReviewContent from "./ReviewContent";
import InstructorDetailComp from "./InstructorDetailComp";

const DetailInstructor = () => {
  const { TabPane } = Tabs;
  let { id } = useParams();
  const [dInstructor, setDinstructor] = useState({});
  const [listReview, setListReview] = useState([]);
  const [classList, setClassList] = useState([]);

  function getReview() {
    axios
      .get(BackendUrl + "/user/getReviewByID?id=" + id)
      .then((success) => {
        setListReview(success.data);
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loadDInstructor() {
    axios
      .get(BackendUrl + "/user/getInstructorDetail?id=" + id)
      .then((success) => {
        setDinstructor(success.data);
        console.log(success.data);
        console.log(BackendUrl + success.data.berkas);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function laodClass() {
    axios
      .get(BackendUrl + "/user/getClassList?idInstructor=" + id)
      .then((success) => {
        setClassList(success.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  useEffect(() => {
    loadDInstructor();
    laodClass();
    getReview();
  }, []);

  function callback(key) {
    console.log(key);
  }

  const renderImage = () => {
    if (dInstructor.image == "") {
      return <img src="/asset/image/noPic.jpg" width="100%" />;
    } else {
      return <img src={BackendUrl + dInstructor.image} width="100%" />;
    }
  };

  return (
    <>
      <Navbarr />
      <div className="container pt-3 mb-5">
        <div className="d-flex justify-content-between mb-0">
          <h1 className="mb-2">{dInstructor.name}</h1>
          <div className="center">
            <Rate value={averageReview()} disabled />
          </div>
        </div>
        <hr className="mt-1" />
        <div className="row">
          <div className="col-md-3 mt-2">{renderImage()}</div>
          <div className="col-md-9 mt-2">
            <div className="card card-shadow">
              <div className="card-body">
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="About Me" key="1">
                    <div style={{ height: "75vh" }}>
                      <div
                        style={{
                          height: "100%",
                        }}
                      >
                        <InstructorDetailComp
                          katagori={dInstructor.katagori}
                          email={dInstructor.email}
                          name={dInstructor.name}
                          phoneNumber={dInstructor.phoneNumber}
                          berkas={dInstructor.berkas}
                          timeStart={dInstructor.timeStart}
                          timeEnd={dInstructor.timeEnd}
                        />
                        <div className="ant-descriptions-title mt-3">
                          Instructor detail
                        </div>
                        <p className="text-muted">
                          {dInstructor.instructorDetail}
                        </p>
                        {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                          <Viewer fileUrl={BackendUrl + dInstructor.berkas} />
                        </Worker> */}
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Class" key="2">
                    <ClassListContent classList={classList} />
                  </TabPane>
                  <TabPane tab="Review" key="3">
                    <ReviewContent review={listReview} />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailInstructor;
