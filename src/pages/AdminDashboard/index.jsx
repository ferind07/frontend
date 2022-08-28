import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import moment from "moment";
import {
  UserOutlined,
  InfoCircleOutlined,
  ContainerOutlined,
  UserDeleteOutlined,
  LineChartOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Tag, Table, Button } from "antd";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import Footer from "../../components/Footer";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [listUser, setListUser] = useState([]);
  const [listInstructor, setListInstructor] = useState([]);
  const [listClass, setListClass] = useState([]);
  const [sales, setSales] = useState([]);
  const [report, setReport] = useState([]);

  const [eChart, setEChart] = useState();

  const { Title, Paragraph } = Typography;

  var navigate = useNavigate();

  var eChartData = {
    series: [
      {
        name: "Sales",
        data: [],
        color: "#fff",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: [],
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return "Rp. " + val + " thousands";
          },
        },
      },
    },
  };

  function getNeedResponseReport() {
    axios
      .get(BackendUrl + "/admin/getNeedResponseReport")
      .then((success) => {
        setReport(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getSales() {
    axios
      .get(BackendUrl + "/admin/getSales")
      .then((success) => {
        setEChart(success.data);
        console.log(success.data);
        setSales(success.data);

        const value = [];
        const label = [];
        const color = [];

        success.data.forEach((element) => {
          value.push(element.sales);
          label.push(element.monthName);
          color.push("#fff");
        });
        var eChartData = {
          series: [
            {
              name: "Sales",
              data: value,
              color: "#fff",
            },
          ],

          options: {
            chart: {
              type: "bar",
              width: "100%",
              height: "auto",

              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%",
                borderRadius: 5,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: true,
              width: 1,
              colors: ["transparent"],
            },
            grid: {
              show: true,
              borderColor: "#ccc",
              strokeDashArray: 2,
            },
            xaxis: {
              categories: label,
              labels: {
                show: true,
                align: "right",
                minWidth: 0,
                maxWidth: 160,
                style: {
                  colors: color,
                },
              },
            },
            yaxis: {
              labels: {
                show: true,
                align: "right",
                minWidth: 0,
                maxWidth: 160,
                style: {
                  colors: color,
                },
              },
            },

            tooltip: {
              y: {
                formatter: function (val) {
                  return "Rp. " + val + " thousands";
                },
              },
            },
          },
        };
        console.log(eChartData);
        setEChart(eChartData);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  const columnsReport = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "class",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "date",
      dataIndex: "date",
      render: (text, record) => {
        const date = moment(text).add(-7, "hours");

        const formatedDate = date.format("DD MMM yyyy kk:mm");

        return formatedDate;
      },
    },
    {
      title: "action",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            onClick={(e) => {
              navigate("/admin/detailProblem/" + record.id);
            }}
          >
            Detail
          </Button>
        );
      },
    },
  ];

  const getBannedUser = () => {
    var newArray = listUser.filter(function (user) {
      return user.status == 0;
    });
    return newArray;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => {
        if (text == 1) {
          return <Tag color="cyan">User</Tag>;
        } else {
          return <Tag color="blue">Instructor</Tag>;
        }
      },
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Transaction Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

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

  var data = {
    labels: ["Instructor", "User"],
    datasets: [
      {
        label: "# of Votes",
        data: [listInstructor.length, listUser.length - listInstructor.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  function getInstructor(users) {
    const listInstructor = [];
    users.forEach((element) => {
      if (element.role == 2) {
        listInstructor.push(element);
      }
    });
    return listInstructor;
  }

  function getAllUser() {
    axios
      .get(BackendUrl + "/admin/allUser")
      .then((success) => {
        const users = success.data;
        //console.log(users);
        setListUser(users);
        setListInstructor(getInstructor(users));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllClass() {
    axios
      .get(BackendUrl + "/admin/allClass")
      .then((success) => {
        setListClass(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getInstructorData() {}

  const renderChart = () => {
    if (eChart == undefined) {
      return (
        <ReactApexChart
          className="bar-chart"
          options={eChartData.options}
          series={eChartData.series}
          type="bar"
          height={220}
        />
      );
    } else {
      return (
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      );
    }
  };

  const getTopSales = () => {
    if (sales.length == 0) {
      return {
        month: "No sales",
        totalSales: 0,
      };
    } else {
      var monthName = "";
      var totalSales = -1;
      sales.forEach((element) => {
        if (element.sales > totalSales) {
          totalSales = element.sales;
          monthName = element.monthName;
        }
      });
      return {
        month: monthName,
        totalSales: totalSales,
      };
    }
  };

  useEffect(() => {
    getAllUser();
    getAllClass();
    getInstructorData();
    getSales();
    getNeedResponseReport();
  }, []);
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card card-shadow">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-12 mt-2">
                    <div className="card h-100" style={boxStyle}>
                      <div className="card-body d-flex">
                        <div>
                          <div
                            className="d-flex justify-content-start"
                            style={{ gap: "15px" }}
                          >
                            <h3 className="mb-0">Total user</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <h5 className="text-muted">
                              {listUser.length} Users
                            </h5>
                          </div>
                        </div>
                        <div className="icon-box2">
                          <UserOutlined style={{ fontSize: "40px" }} />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 mt-2">
                    <div className="card h-100" style={boxStyle}>
                      <div className="card-body d-flex">
                        <div>
                          <div
                            className="d-flex justify-content-start"
                            style={{ gap: "15px" }}
                          >
                            <h3 className="mb-0">Total instructor</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <h5 className="text-muted">
                              {listInstructor.length} Instructor
                            </h5>
                          </div>
                        </div>
                        <div className="icon-box2">
                          <InfoCircleOutlined style={{ fontSize: "40px" }} />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 mt-2">
                    <div className="card h-100" style={boxStyle}>
                      <div className="card-body d-flex">
                        <div>
                          <div
                            className="d-flex justify-content-start"
                            style={{ gap: "15px" }}
                          >
                            <h3 className="mb-0">Total class</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <h5 className="text-muted">
                              {listClass.length} Class
                            </h5>
                          </div>
                        </div>
                        <div className="icon-box2">
                          <ContainerOutlined style={{ fontSize: "40px" }} />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="row">
              <div className="col-6">
                <div className="card h-100" style={boxStyle}>
                  <div className="card-header d-flex justify-content-between">
                    <div className="d-flex" style={{ gap: "15px" }}>
                      <h3 className="mb-0">Total Sales</h3>
                      <h6 className="mb-0 text-muted">(last 6 month)</h6>
                    </div>

                    <LineChartOutlined
                      style={{ fontSize: "25px", color: "#1890ff" }}
                    />
                  </div>
                  <div className="card-body">
                    {renderChart()}
                    <div className="chart-vistior">
                      <Title level={5}>Top Sales</Title>
                      <Paragraph className="lastweek">
                        {getTopSales().month}{" "}
                        <NumberFormat
                          value={getTopSales().totalSales}
                          className="foo"
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" Rp. "}
                          renderText={(value, props) => (
                            <span className="bnb2">+ {value}</span>
                          )}
                        />
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card h-100" style={boxStyle}>
                  <div className="card-header d-flex justify-content-between">
                    <h3 className="mb-0">User Reports</h3>
                    <WarningOutlined
                      style={{ fontSize: "25px", color: "#1890ff" }}
                    />
                  </div>
                  <div className="card-body">
                    <Table
                      dataSource={report}
                      columns={columnsReport}
                      pagination={{ pageSize: 10 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="row">
              <div className="col-4">
                <div className="card" style={boxStyle}>
                  <div className="card-header">
                    <h4 className="text-center mb-0">User and Instructor</h4>
                  </div>
                  <div className="card-body">
                    <Pie data={data} />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="card h-100" style={boxStyle}>
                  <div
                    className="card-header d-flex justify-content-between"
                    style={{ gap: "10px" }}
                  >
                    <h3 className="mb-0">Banned User</h3>
                    <UserDeleteOutlined
                      style={{ fontSize: "25px", color: "#1890ff" }}
                    />
                  </div>
                  <div className="card-body">
                    <Table
                      dataSource={getBannedUser()}
                      columns={columns}
                      size="middle"
                      pagination={{ pageSize: 5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
