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

const DetailInstructor = () => {
  const { TabPane } = Tabs;
  let { id } = useParams();
  const [dInstructor, setDinstructor] = useState({});
  const [classList, setClassList] = useState([]);

  function loadDInstructor() {
    axios
      .get(BackendUrl + "/user/getInstructorDetail?id=" + id)
      .then((success) => {
        setDinstructor(success.data);
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

  useEffect(() => {
    loadDInstructor();
    laodClass();
  }, []);

  function callback(key) {
    console.log(key);
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });

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
      <div className="container pt-3">
        <h1 className="mb-2">{dInstructor.name}</h1>
        <div className="d-flex justify-content-between mb-0">
          <h5 className="text-muted mt-0">{dInstructor.instructorDetail}</h5>
          <Rate value={5} />
        </div>
        <hr className="mt-1" />
        <div className="row">
          <div className="col-md-3 mt-2">{renderImage()}</div>
          <div className="col-md-9 mt-2">
            <div className="card">
              <div className="card-body">
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="About Me" key="1">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                      <div style={{ height: "100vh" }}>
                        <Viewer
                          fileUrl={BackendUrl + dInstructor.berkas}
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      </div>
                    </Worker>
                  </TabPane>
                  <TabPane tab="Class" key="2">
                    <ClassListContent classList={classList} />
                  </TabPane>
                  <TabPane tab="Comments" key="3">
                    Content of Tab Pane 2
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
