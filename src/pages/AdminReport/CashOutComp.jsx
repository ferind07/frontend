import React, { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";
import { DownCircleTwoTone, UpCircleTwoTone } from "@ant-design/icons";
import moment from "moment";
import NumberFormat from "react-number-format";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const CashOutComp = () => {
  const [time, setTime] = useState([]);
  const [cashOutHistoryList, setCashOutHistoryList] = useState([]);
  const [tempCashOutHistoryList, setTempCashOutHistoryList] = useState([]);

  const { RangePicker } = DatePicker;

  function getCashOutHistory() {
    axios
      .get(BackendUrl + "/admin/cashOutHistory")
      .then((success) => {
        console.log(success.data);
        setCashOutHistoryList(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCashOutHistory();
  }, []);

  const renderComponent = () => {
    const comp = [];
    return comp;
  };

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

  return (
    <>
      <div className="w-100">
        <h3 className="mb-2">Cash out</h3>
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

          <Button type="primary">Filter</Button>
        </div>
        <div style={{ height: "65vh" }}>
          <div className="card mt-3 h-100">
            <div className="card-body" style={{ overflowY: "auto" }}>
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashOutComp;
