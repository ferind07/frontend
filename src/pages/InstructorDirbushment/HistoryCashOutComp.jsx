import React, { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";
import { UpCircleTwoTone, DownCircleTwoTone } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import NumberFormat from "react-number-format";
import BackendUrl from "../../components/BackendUrl";

const HistoryCashOutComp = () => {
  const { RangePicker } = DatePicker;

  const [dirbushmentHistory, setDirbushmentHistory] = useState([]);
  const [tempDirbushmentHistory, setTempDirbushmentHistory] = useState([]);

  function getDirbushment() {
    axios
      .get(
        BackendUrl +
          "/user/dirbushmentHistory?token=" +
          localStorage.getItem("token")
      )
      .then((success) => {
        console.log(success.data);
        setDirbushmentHistory(success.data);
        setTempDirbushmentHistory(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDirbushment();
  }, []);

  const compHistory = (type, amount, date) => {
    var comp;

    if (type == 1) {
      comp = <DownCircleTwoTone style={{ fontSize: "40px" }} />;
      // in
    } else {
      // out
      comp = (
        <UpCircleTwoTone style={{ fontSize: "40px" }} twoToneColor="#eb2f96" />
      );
    }

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

    const dateText = moment(date);

    return (
      <>
        <div className="card mt-2">
          <div className="card-body">
            <div className="d-flex" style={{ gap: "15px" }}>
              <div className="center">{comp}</div>

              <div className="d-flex justify-content-between w-100">
                <div>
                  <h5 className="mb-0">Dirbushment</h5>
                  <h6 className="mb-0 text-muted">
                    <NumberFormat
                      value={amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  </h6>
                </div>
                <div className="center">
                  <div>
                    <p className="mb-0 text-muted" style={{ fontSize: "15px" }}>
                      {dateText.date() +
                        " " +
                        month[dateText.month()] +
                        " " +
                        dateText.year()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderHistory = () => {
    const compList = [];
    dirbushmentHistory.map((dirbushmentDetail) => {
      compList.push(
        compHistory(2, dirbushmentDetail.amount, dirbushmentDetail.time)
      );
    });
    return compList;
  };

  const [valRangePicker, setValRangePicker] = useState([]);

  function onClickFilter() {
    //console.log(valRangePicker);
    var filtered = tempDirbushmentHistory.filter((dirbushmentHistory) => {
      const date = new Date(dirbushmentHistory.time);
      const dateStart = valRangePicker[0].set({ hour: 0 }).toDate();
      const dateEnd = valRangePicker[1].set({ hour: 23 }).toDate();

      return date >= dateStart && date <= dateEnd;
    });
    //console.log(filtered);
    setDirbushmentHistory(filtered);
  }

  return (
    <>
      <div>
        <h2>History cash out</h2>

        <div>
          <p className="mb-1">Select date</p>
          <div className="d-flex justify-content-start" style={{ gap: "15px" }}>
            <RangePicker
              value={valRangePicker}
              onChange={(value) => {
                setValRangePicker(value);
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
        </div>

        <div className="card card-shadow mt-3">
          <div
            className="card-body"
            style={{ height: "50vh", overflowY: "auto" }}
          >
            {renderHistory()}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryCashOutComp;
