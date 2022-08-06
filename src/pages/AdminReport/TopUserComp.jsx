import React, { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import NumberFormat from "react-number-format";

const TopUserComp = () => {
  const [time, setTime] = useState([]);

  const [topUser, setTopUser] = useState([]);
  const [topInstructor, setTopInstructor] = useState([]);

  function renderImage(image) {
    if (image == "") {
      return (
        <img
          src="/asset/image/noPic.jpg"
          alt="Avatar"
          style={{
            borderRadius: "50%",
            width: "50%",
            border: "2px solid black",
          }}
        />
      );
    } else {
      return (
        <img
          src={BackendUrl + image}
          alt="Avatar"
          style={{
            aspectRatio: "3/4",
            width: "50%",
            border: "2px solid black",
          }}
        />
      );
    }
  }

  const renderTopUser = () => {
    if (topUser.length != 0) {
      return (
        <>
          <div className="w-100 text-center">
            {renderImage(topUser[0].image)}
            <h5 className="text-muted mt-2">{topUser[0].name}</h5>
            <h6>{topUser[0].total} class</h6>
            <h6>
              Income{" "}
              <NumberFormat
                value={topUser[0].totalPrice}
                displayType="text"
                thousandSeparator
                prefix="Rp. "
              />
            </h6>
          </div>
        </>
      );
    } else {
    }
  };

  const renderTopInstructor = () => {
    if (topInstructor.length != 0) {
      return (
        <>
          <div className="w-100 text-center">
            {renderImage(topInstructor[0].image)}
            <h5 className="text-muted mt-2">{topInstructor[0].name}</h5>
            <h6>{topInstructor[0].total} class</h6>
            <h6>
              Income{" "}
              <NumberFormat
                value={topInstructor[0].totalPrice}
                displayType="text"
                thousandSeparator
                prefix="Rp. "
              />
            </h6>
          </div>
        </>
      );
    } else {
    }
  };

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
        setTopUser(success.data);
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
        console.log("top ins");
        console.log(success.data);
        setTopInstructor(success.data);
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
                <h3 className="text-center">Top User</h3>
                {renderTopUser()}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Top Instructor</h3>
                {renderTopInstructor()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUserComp;
