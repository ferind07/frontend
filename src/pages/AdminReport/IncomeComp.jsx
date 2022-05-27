import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Table, DatePicker, Button } from "antd";
import "chart.js/auto";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const IncomeComp = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [catagoryInfo, setCatagoryInfo] = useState([]);

  const [time, setTime] = useState([]);

  const { RangePicker } = DatePicker;

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  var data = {
    labels: ["Language", "Cooking", "Sports", "Design", "Programming"],
    datasets: [
      {
        label: "# of Votes",
        data: [4, 5, 2, 1, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(248, 6, 204, 0.2)",
          "rgba(254, 226, 197, 0.2)",
          "rgba(127, 181, 255, 0.2)",
          "rgba(78, 148, 79, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(248, 6, 204, 1)",
          "rgba(254, 226, 197, 1)",
          "rgba(127, 181, 255, 1)",
          "rgba(78, 148, 79, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Transaction Chart",
      },
    },
  };

  const dataLine = {
    labels,
    datasets: [
      {
        label: "Transaction",
        data: [
          2000, 5000, 4000, 7000, 4500, 2000, 5000, 4000, 7000, 4500, 8000,
          6000,
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  function getIncomeData() {
    axios
      .get(BackendUrl + "/admin/incomeData")
      .then((success) => {
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getCatagoryInfo() {
    axios
      .get(BackendUrl + "/admin/catagoryInfo")
      .then((success) => {
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getIncomeData();
    getCatagoryInfo();
  }, []);

  return (
    <>
      <div className="w-100">
        <h3 className="mb-2">Income</h3>
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
        <div className="mt-3">
          <Line options={options} data={dataLine} />
        </div>
        <hr />
        <div className="mt-3">
          <h3>Income catagory</h3>
        </div>
        <div className="mt-3">
          <Pie data={data} />
        </div>
      </div>
    </>
  );
};

export default IncomeComp;
