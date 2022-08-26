import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Table, DatePicker, Button, TimePicker, Empty } from "antd";
import "chart.js/auto";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const IncomeComp = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [catagoryData, setCatagoryData] = useState([0, 0, 0, 0, 0]);
  const [instructorCatagory, setInstructorCatagory] = useState([0, 0, 0, 0, 0]);
  const [labelData, setLabelData] = useState([]);
  const [graphLineData, setGraphLineData] = useState([]);

  const [temp, setTemp] = useState("");

  const [time, setTime] = useState([]);

  const { RangePicker } = DatePicker;

  var labels = ["January", "FEb"];

  var dataLine = {
    labels: labelData,
    datasets: [
      {
        label: "Transaction",
        data: graphLineData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const renderChart = () => {
    if (temp == "") {
      return <Empty />;
    } else {
      // console.log(temp);
      // console.log(options);
      return <Line options={options} data={temp} />;
    }
  };

  var data = {
    labels: ["Language", "Cooking", "Sports", "Design", "Programming"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          catagoryData[0],
          catagoryData[1],
          catagoryData[2],
          catagoryData[3],
          catagoryData[4],
        ],
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

  var dataInsturctorCatagory = {
    labels: ["Language", "Cooking", "Sports", "Design", "Programming"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          instructorCatagory[0],
          instructorCatagory[1],
          instructorCatagory[2],
          instructorCatagory[3],
          instructorCatagory[4],
        ],
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

  function getInstuctorCatagory() {
    axios
      .get(BackendUrl + "/admin/instructorCatagory")
      .then((success) => {
        console.log(success.data);
        let arrCatagory = [0, 0, 0, 0, 0];
        let data = success.data;
        data.forEach((element) => {
          arrCatagory[element.katagori]++;
        });
        //console.log(arrCatagory);
        setInstructorCatagory(arrCatagory);
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
        let arrCatagory = [0, 0, 0, 0, 0];
        let data = success.data;
        data.forEach((element) => {
          arrCatagory[element.katagori]++;
        });
        setCatagoryData(arrCatagory);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function viewBtn() {
    if (time.length != 0) {
      const dateStart = time[0].format("YYYY-MM-DD");
      const dateEnd = time[1].format("YYYY-MM-DD");

      axios
        .get(
          BackendUrl +
            "/admin/getIncomeData?dateStart=" +
            dateStart +
            "&dateEnd=" +
            dateEnd
        )
        .then((success) => {
          //console.log(success.data);
          const result = success.data;

          const tempLabelData = [];
          const tempGraphLineData = [];

          result.map((resultData) => {
            tempLabelData.push(resultData.monthName);
            tempGraphLineData.push(resultData.total);
          });

          // console.log(a);
          // console.log(tempLabelData);
          // console.log(tempGraphLineData);

          const tmp = {
            tempLabelData,
            datasets: [
              {
                label: "Transaction",
                data: tempGraphLineData,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          };
          console.log(tmp);
          setTemp(tmp);
          setLabelData(tempLabelData);
          setGraphLineData(tempGraphLineData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getIncomeData();
    getCatagoryInfo();
    getInstuctorCatagory();
  }, []);
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  return (
    <>
      <div className="w-100">
        <h3 className="mb-2">Income</h3>
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
                value={time}
                onChange={(value) => {
                  setTime(value);
                }}
              />

              <Button
                type="primary"
                onClick={() => {
                  viewBtn();
                }}
              >
                View
              </Button>
              <Button>Reset</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4" style={boxStyle}>
        <div className="card-body">
          <div className="mt-3">
            <Line options={options} data={dataLine} />
          </div>
        </div>
      </div>

      <div className="card mt-3" style={boxStyle}>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="mt-3">
                <h3 className="text-center">Income catagory</h3>
              </div>
              <div className="mt-3">
                <Pie data={data} />
              </div>
            </div>
            <div className="col-6">
              <div className="mt-3">
                <h3 className="text-center">Instuctor catagory</h3>
              </div>
              <div className="mt-3">
                <Pie data={dataInsturctorCatagory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeComp;
