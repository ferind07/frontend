import React, { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";
import { DownCircleTwoTone, UpCircleTwoTone } from "@ant-design/icons";
import moment from "moment";
import NumberFormat from "react-number-format";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const CashOutComp = () => {
  const [cashOutHistoryList, setCashOutHistoryList] = useState([]);
  const [tempCashOutHistoryList, setTempCashOutHistoryList] = useState([]);

  const { RangePicker } = DatePicker;

  function getCashOutHistory() {
    axios
      .get(BackendUrl + "/admin/cashOutHistory")
      .then((success) => {
        console.log(success.data);
        setCashOutHistoryList(success.data);
        setTempCashOutHistoryList(success.data);
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
    cashOutHistoryList.map((cashOutHistory) => {
      comp.push(
        compHistory(
          2,
          cashOutHistory.amount,
          cashOutHistory.time,
          cashOutHistory.name,
          cashOutHistory.dirbushmentId,
          cashOutHistory.bankCode
        )
      );
    });
    return comp;
  };

  const [valRangePicker, setValRangePicker] = useState([]);

  function onClickFilter() {
    console.log(valRangePicker);
    var filtered = tempCashOutHistoryList.filter((dirbushmentHistory) => {
      const date = new Date(dirbushmentHistory.time);
      const dateStart = valRangePicker[0].set({ hour: 0 }).toDate();
      const dateEnd = valRangePicker[1].set({ hour: 23 }).toDate();

      // console.log(date);
      // console.log(dateStart);
      // console.log(dateEnd);
      // console.log(date >= dateStart && date <= dateEnd);

      return date >= dateStart && date <= dateEnd;
    });
    console.log(filtered);
    setCashOutHistoryList(filtered);
  }

  const compHistory = (type, amount, date, name, dirbushmentId, bankCode) => {
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
                  <h6 className="mb-0">Dirbushment</h6>
                  <p className="mb-0 text-muted">{dirbushmentId}</p>
                  <p className="mb-0 text-muted">{bankCode}</p>
                  <p className="mb-0 text-muted">
                    <NumberFormat
                      value={amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  </p>

                  <p className="mb-0">{name}</p>
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
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  return (
    <>
      <div className="w-100">
        <h3 className="mb-2">Cash out</h3>
        <div className="card mt-3" style={boxStyle}>
          <div className="card-body">
            <div
              className="d-flex justify-content-start"
              style={{ gap: "20px" }}
            >
              <div className="center">
                <p className="mb-0">Filter</p>
              </div>

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
              <Button
                onClick={() => {
                  setCashOutHistoryList(tempCashOutHistoryList);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div style={{ height: "65vh" }}>
          <div className="card mt-3 h-100" style={boxStyle}>
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
