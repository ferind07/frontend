import React, { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const TopUserComp = () => {
  const [time, setTime] = useState([]);

  const [topUser, setTopUser] = useState([]);
  const [topInstructor, setTopInstructor] = useState([]);

  function getTopUser() {}

  function getTopInstructor() {}

  function onClickFilter() {
    const dateStart = time[0].format("YYYY-MM-DD");
    const dateEnd = time[1].format("YYYY-MM-DD");

    axios
      .get(
        BackendUrl +
          "/admin/topUser?dateStart=" +
          dateStart +
          "&dateEnd=" +
          dateEnd
      )
      .then((success) => {
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        BackendUrl +
          "/admin/topInstructor?dateStart=" +
          dateStart +
          "&dateEnd=" +
          dateEnd
      )
      .then((success) => {
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const { RangePicker } = DatePicker;

  return (
    <>
      <div className="w-100">
        <h3 className="mb-2">Top user</h3>
        <hr className="mt-0" />
        <div className="d-flex" style={{ gap: "20px" }}>
          <div className="center">
            <p className="mb-0">Filter</p>
          </div>

          <RangePicker
            value={time}
            onChange={(value) => {
              setTime(value);
            }}
          />

          <Button
            type="primary"
            onClick={() => {
              onClickFilter();
            }}
          >
            Filter
          </Button>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h3>Top User</h3>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h3>Top Instructor</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUserComp;
