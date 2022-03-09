import React from "react";
import { Tabs } from "antd";
import BackendUrl from "../../components/BackendUrl";

const MyClassContent = (props) => {
  const classList = props.classList;
  return (
    <>
      <div className="row">
        {classList.map((classItem) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card">
                <img
                  src={BackendUrl + classItem.image}
                  width="100%"
                  style={{ aspectRatio: "4/3" }}
                />
                <div className="card-body">
                  <h5>{classItem.title}</h5>
                  <p>{classItem.duration} minutes</p>
                  <p>{classItem.classCount} Class</p>
                  <button className="btn btn-primary">Detail</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyClassContent;
