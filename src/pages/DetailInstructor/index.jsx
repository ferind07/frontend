import React, { useState } from "react";
import Navbarr from "../../components/Navbar";
import { Rate, Tabs } from "antd";
import Footer from "../../components/Footer";
import "./index.css";
import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const DetailInstructor = (props) => {
  const name = props.name;
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });
  return (
    <>
      <Navbarr />
      <div className="container pt-3">
        <h1 className="mb-2">Ferry Indra Gunawan</h1>
        <div className="d-flex justify-content-between mb-0">
          <h5 className="text-muted mt-0">Bahasa Indonesia istructor</h5>
          <Rate value={5} />
        </div>
        <hr className="mt-1" />
        <div className="row">
          <div className="col-md-3 mt-2">
            <img src="./asset/home/mentor.jpeg" className="w-100" />
          </div>
          <div className="col-md-9 mt-2">
            <div className="card">
              <div className="card-body">
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="About Me" key="1">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                      <div style={{ height: "100vh" }}>
                        <Viewer
                          fileUrl="./217116596_C.pdf"
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      </div>
                    </Worker>
                  </TabPane>
                  <TabPane tab="Class" key="2">
                    Content of Tab Pane 2
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
