import React from "react";
import { Tabs } from "antd";
import AddClassContent from "./AddClassContent";

const InstructorClass = () => {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-12">
          <div className="card card-shadow">
            <div className="card-body">
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="My Class" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Add Class" key="2">
                  <AddClassContent />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorClass;
